/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：分页管理组件
 * changelist:
 *      * 支持总页数动态修改
 *      * 支持当前页数动态修改
 *      * 当当前显示页数发生改变时触发onPagerChange事件
 *      * 支持翻页disabled判断
 */

import * as React from "react";
import "../style/pagination.less";
import {ChangeEvent} from 'react';
import {KeyboardEvent} from 'react';
import "../font/iconfont.css";


export declare interface IPaginationProps{
    pageNum:number;
    totalPages:number;
    onPagerChange:(index:number)=>void;
}

declare interface IPaginationState{
    input:number;// 缓存临时输入值
}


class Pagination extends React.PureComponent<IPaginationProps,IPaginationState>{
    private pageNum:number=1;// 变量缓存启用的页面，进行差量比较，如果props发生改变则判断state是否有值，如果有值则使用state中的值
    constructor(props:IPaginationProps){
        super(props);
        this.onPageChange=this.onPageChange.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.onKeyUp=this.onKeyUp.bind(this);
        this.prev=this.prev.bind(this);
        this.next=this.next.bind(this);
        this.pageNum=props.pageNum||1;
        this.state={
            input:NaN,
        }
    }
    private onPageChange(){
        const current = Number(this.pageNum);
        this.props.onPagerChange(current);
        this.setState({
            input:NaN
        });
    }
    private onBlur(){
        if(!isNaN(this.state.input) && this.pageNum!==this.state.input){
            if(-1 === this.state.input){
                // 不变
                this.setState({
                    input:NaN
                })
            }else{
                this.pageNum = this.state.input;
                this.onPageChange();
            }
        }
    }
    private onChange(e:ChangeEvent<HTMLInputElement>){
        // 不能大于最大值，可以为空，不能为0
        const value = Number(e.target.value);// maybe NaN
        if(value<0||value>this.props.totalPages||value===0&&e.target.value!==""){
            return; // 输入框禁用输入
        }
        this.setState({
            input:value?value: -1// -1表示空，内容删除，临街状态
        });
    }
    private prev(){
        if(this.pageNum>1){
            this.pageNum-=1;
            this.onPageChange();
            this.setState({});// 更新UI显示
        }
    }
    private next(){
        if(this.pageNum<this.props.totalPages){
            this.pageNum+=1;
            this.onPageChange();
            this.setState({});// 更新UI显示
        }
    }
    private onKeyUp(event:KeyboardEvent<HTMLInputElement>){
        if(event.keyCode === 13){
            this.onBlur();
            (event.target as HTMLInputElement).blur();// 自动失去焦点
        }
    }
    public componentWillReceiveProps(nextProps:IPaginationProps){
        // 如果属性发生变化
        if(this.props.pageNum!==nextProps.pageNum&&nextProps.pageNum!==this.pageNum){
            this.pageNum=nextProps.pageNum;// 同步更新
            this.onPageChange();
        }
    }
    render(){
        const currentIndex = isNaN(this.state.input)?this.pageNum:this.state.input;
        const totalCount = this.props.totalPages||0;
        // 计算当前翻页是否可用
        const canPrev = this.pageNum>1; // 只能判断当前的
        const canNext = this.pageNum<totalCount;
        if(totalCount===0){
            return null;
        }else{
            return (
                [
                    <div key="left" className={`eboard-pagination-left ${canPrev?"":"disabled"}`} onClick={this.prev}>
                        <i className="eboard-icon eboard-icon-prev"/>
                    </div>,
                    <div key="right" className={`eboard-pagination-right ${canNext?"":"disabled"}`} onClick={this.next}>
                        <i className="eboard-icon eboard-icon-next"/>
                    </div>,
                    <div key="bottom" className="eboard-pagination-bottom">
                        <input onKeyUp={this.onKeyUp} type="number" className="eboard-pagination-current" onBlur={this.onBlur} onChange={this.onChange} value={currentIndex===-1?"":currentIndex}/>/<span className="eboard-pagination-total">{totalCount}</span>
                    </div>,
                ]
            )
        }
    }
}

export {Pagination};