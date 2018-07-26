import * as React from 'react';
// import * as PropTypes from 'prop-types';
import {ToolBar} from './HomePage';
import Card from 'antd/es/card';
import HomePage from './HomePage';
import {FrameType} from "../../src/EBoard";
import {EBoardInstance} from './EBoardInstance';
/*
const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();
*/

const eBoard =EBoardInstance.getInstance();

class MaterialUIPage extends HomePage{
    componentDidMount(){
        // this.Toolbar.setCanvas(this.canvas);
        const frame = eBoard.clearCache().createPdfFrame({
            type:FrameType.Pdf,
            ratio:"16:9",
            url:require("./4.pdf"),
            pageNum:1,
            messageId:0
        });
        eBoard.switchToFrame(frame);
        this.Toolbar.setCanvas(frame);
    }
    public render() {
        return (
            <Card bordered title="PdfCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div id={"eboardContainer"} ref={ref=>this.container=ref} style={{position:"relative",height:document.body.offsetHeight-220}}/>
            </Card>
        );
    }
}

export default MaterialUIPage;
