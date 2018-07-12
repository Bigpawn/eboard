/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：分页管理组件
 */

import * as React from "react";
import "../style/pagination.less";
import {ChangeEvent} from 'react';
import {KeyboardEvent} from 'react';
import "../font/iconfont.css";


export declare interface IPaginationProps{
    defaultCurrentIndex:number;
    totalPages:number;
    onPagerChange:(index:number)=>void;
}

declare interface IPaginationState{
    currentIndex:number;
}


class Pagination extends React.PureComponent<IPaginationProps,IPaginationState>{
    private currentIndex:number=1;
    constructor(props:IPaginationProps){
        super(props);
        this.onPageChange=this.onPageChange.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.onKeyUp=this.onKeyUp.bind(this);
        this.setCurrentIndex=this.setCurrentIndex.bind(this);
        this.prev=this.prev.bind(this);
        this.next=this.next.bind(this);
        this.currentIndex=props.defaultCurrentIndex||1;
        this.state={
            currentIndex:props.defaultCurrentIndex||1
        }
    }
    private onPageChange(){
        const current = Number(this.currentIndex);
        const next = Number(this.state.currentIndex);
        if(current!==next){
            this.props.onPagerChange(next);
            this.currentIndex=next;
        }
    }
    private onBlur(){
        if(this.state.currentIndex){
            this.onPageChange();
        }else{
            // 0
            this.setState({
                currentIndex:1
            },()=>{
                this.onPageChange();
            });
        }
    }
    private onChange(e:ChangeEvent<HTMLInputElement>){
        // 不能大于最大值，可以为空，不能为0
        const value = Number(e.target.value);
        if(value<0||value>this.props.totalPages||value===0&&e.target.value!==""){
            return;
        }
        this.setState({
            currentIndex:value?value: NaN
        });
    }
    public setCurrentIndex(index:number){
        this.setState({
            currentIndex:index
        })
    }
    private prev(){
        if(this.state.currentIndex>1){
            this.setState({
                currentIndex:this.state.currentIndex-1
            },()=>{
                this.onPageChange();
            })
        }
    }
    private next(){
        if(this.state.currentIndex<this.props.totalPages){
            this.setState({
                currentIndex:this.state.currentIndex+1
            },()=>{
                this.onPageChange();
            })
        }
    }
    private onKeyUp(event:KeyboardEvent<HTMLInputElement>){
        if(event.keyCode === 13){
            this.onBlur();
        }
    }
    render(){
        return (
            [
                <div key="left" className="eboard-pagination-left" onClick={this.prev}>
                    <i className="eboard-icon eboard-icon-prev"/>
                </div>,
                <div key="right" className="eboard-pagination-right" onClick={this.next}>
                    <i className="eboard-icon eboard-icon-next"/>
                </div>,
                <div key="bottom" className="eboard-pagination-bottom">
                    <input onKeyUp={this.onKeyUp} type="number" className="eboard-pagination-current" onBlur={this.onBlur} onChange={this.onChange} value={this.state.currentIndex}/>/<span className="eboard-pagination-total">{this.props.totalPages||0}</span>
                </div>,
            ]
        )
    }
}

export {Pagination};