import * as React from 'react';
// import * as PropTypes from 'prop-types';
import {ToolBar} from './HomePage';
import Card from 'antd/es/card';
import HomePage from './HomePage';
import {EBoard, FrameType} from "../../src/EBoard";
import {PdfFrame} from "../../src/frames/PdfFrame";
/*
const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();
*/


class MaterialUIPage extends HomePage{
    componentDidMount(){
        // this.Toolbar.setCanvas(this.canvas);
        EBoard.createFrame({
            container:this.container,
            type:FrameType.Pdf,
            id:6,
            childMessageId:7,
            messageId:6,
            ratio:"16:9",
            url:require("./4.pdf"),
            pageNum:1,
        }).switchToFrame(6);
        const frame = EBoard.findFrameById(6) as PdfFrame;
        this.Toolbar.setCanvas(frame);
    }
    public render() {
        return (
            <Card bordered title="PdfCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} style={{position:"relative",height:document.body.offsetHeight-220}}/>
            </Card>
        );
    }
}

export default MaterialUIPage;
