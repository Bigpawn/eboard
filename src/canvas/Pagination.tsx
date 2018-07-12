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
                currentIndex:0
            },()=>{
                this.onPageChange();
            });
        }
    }
    private onChange(e:ChangeEvent<HTMLInputElement>){
        // 不能小于0
        const value = parseInt(e.target.value,10);
        if(value<0||value>this.props.totalPages){
            return;
        }
        this.setState({
            currentIndex:Number(e.target.value)
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
    render(){
        return (
            [
                <div key="left" className="eboard-pagination-left" onClick={this.prev}>prev</div>,
                <div key="right" className="eboard-pagination-right" onClick={this.next}>next</div>,
                <div key="bottom" className="eboard-pagination-bottom">
                    <input type="number" className="eboard-pagination-current" onBlur={this.onBlur} onChange={this.onChange} value={this.state.currentIndex}/>/<span className="eboard-pagination-total">{this.props.totalPages||0}</span>
                </div>,
            ]
        )
    }
}

export {Pagination};