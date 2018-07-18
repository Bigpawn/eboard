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
/*    componentDidMount(){
        pdfjsLib.getDocument(require("./4.pdf")).then(pdf=>{
            console.log(pdf);
           pdf.getPage(1).then(page=>{
               console.log(page);
               // page.render()
    
               // 指定大小
    
    
               var desiredWidth = 100;
               var viewport1 = page.getViewport(1);
               var scale = desiredWidth / viewport1.width;
               const viewport = page.getViewport(scale);
               const context = this.canvas.getContext('2d');
               this.canvas.height = viewport.height;
               this.canvas.width = viewport.width;
                console.log(viewport);
               const renderContext = {
                   canvasContext: context,
                   viewport: viewport
               };
               page.render(renderContext as any);
           })
        });
    }*/
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
