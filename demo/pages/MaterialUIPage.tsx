import * as React from 'react';
// import * as PropTypes from 'prop-types';
import {ToolBar} from './HomePage';
import {PagerCanvas} from '../../src/canvas/react/PagerCanvas';
import Card from 'antd/es/card';
import HomePage from './HomePage';
/*
const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();
*/


class MaterialUIPage extends HomePage{
    public render() {
        return (
            <Card bordered title="PdfCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div style={{position:"relative",height:document.body.offsetHeight-220}}>
                    <PagerCanvas ratio={"16:9"} ref={(ref:PagerCanvas)=>this.canvas=ref} filePath={require("./4.pdf")}/>
                </div>
            </Card>
        );
    }
}

export default MaterialUIPage;
