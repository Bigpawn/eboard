/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:07:19
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 21:41:29
 */
import * as React from "react";
import "./EBoardWidget.scss";
import EBoardEngine from "./EBoardEngine";
import { Document, Page } from 'react-pdf';
/**
 * Define eBoard props
 */
interface EBoardProps {
    onInitEBoardEngine: Function;
}

/**
 * Define eBoard states.
 */
interface EBoardStates {
    numPages: number,
    pageNumber: number,
}

/**
 * 
 */
export default class EBoardWidget extends React.Component < EBoardProps, EBoardStates > {
    state = {
        numPages: 1,
        pageNumber: 1,
    }

    private __CANVAS_WRAPPER_NAME: string = "fabricCanvasWrapper";

    private __CANVAS_ELEMENT_NAME: string = "fabricCanvasEl";

    private eBoardEngine: EBoardEngine;

    private pdfNumPages: number;

    public constructor(props: any) {
        super(props);
    }

    public onPdfLoad(evt: any) {
        // this.setState({numPages: evt.numPages});
        this.pdfNumPages = evt.numPages;
    }

    public onPdfPageLoad(evt: any) {
        this.setState({
            numPages: this.pdfNumPages,
            pageNumber: evt.pageNumber,
        });
    }

    public componentDidMount() {
        let options: any = {
            isZoom: true,
            isPanning: true
        };
        this.eBoardEngine =  new EBoardEngine(this.getCanvasWrapper(), this.getCanvasElement(), options);
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
                {/* <div className="pdf-layer">
                    <Document file='http://localhost:8080/阔地终端音视频引擎接口_v1.0.13_20180211.pdf' onLoadSuccess={ (evt: any) => {this.onPdfLoad(evt); }} >
                        <Page pageNumber={this.state.pageNumber} onLoadSuccess={ (evt: any) => {this.onPdfPageLoad(evt); }} />
                    </Document>
                    <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
                </div> */}
                <canvas ref={this.__CANVAS_ELEMENT_NAME} />
            </div>
        );
    }
}
