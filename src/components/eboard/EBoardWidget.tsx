/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:07:19
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-29 19:29:43
 */
import * as React from "react";
import "./EBoardWidget.scss";
import EBoardEngine from "./EBoardEngine";

/**
 * Define eBoard props
 */
interface EBoardProps {
    onInitEBoardEngine: Function;
}

/**
 * Define eBoard states.
 */
interface EBoardStates {}

/**
 * 
 */
export default class EBoardWidget extends React.Component < EBoardProps, EBoardStates > {
    private __CANVAS_WRAPPER_NAME: string = "fabricCanvasWrapper";

    private __CANVAS_ELEMENT_NAME: string = "fabricCanvasEl";

    private eBoardEngine: EBoardEngine;

    public constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        this.eBoardEngine =  new EBoardEngine(this.getCanvasWrapper(), this.getCanvasElement());
        this.props.onInitEBoardEngine(this.eBoardEngine);
    }

    private getCanvasWrapper(): React.ReactInstance {
        return this.refs.fabricCanvasWrapper;
    }

    private getCanvasElement(): React.ReactInstance {
        return this.refs.fabricCanvasEl;
    }

    public render(): JSX.Element {
        return(
            <div ref={this.__CANVAS_WRAPPER_NAME} className="drawing-area">
                <canvas ref={this.__CANVAS_ELEMENT_NAME} />
            </div>
        );
    }
}
