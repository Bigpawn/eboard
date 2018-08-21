/**
 * @disc:DESC
 * @type:TYPE
 * @dependence:DEPENDENCE
 * @author:yanxinaliang
 * @time：2018/8/15 14:04
 */
import * as React from "react";
import SimpleCanvas from './SimpleCanvas';
import {FrameType} from '../../src/EBoard';
import {EBoardInstance} from './EBoardInstance';
import { Card } from "antd";
import {ScrollbarType} from '../../src/frames/HtmlFrame';


class MixCanvas extends SimpleCanvas{
    private eBoard:any;
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
        eBoard.attachMessageMiddleWare((message)=>{
            receiveEBoard.onMessage(message);
        });
        eBoard.clearCache().addPdfFrame({
            type:FrameType.Pdf,
            url:require("./4.pdf"),
            pageNum:1,
            name:"pdf"
        });
        this.eBoard=eBoard;
    }
    private createHtmlCanvas=()=>{
        this.eBoard.addHtmlFrame({
            name:"html",
            type:FrameType.HTML,
            ratio:"16:9",
            scrollbar:ScrollbarType.vertical,
            content:'html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>',
        });
    };
    private createImageCanvas=()=>{
        this.eBoard.addImageFrame({
            type:FrameType.Image,
            content:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E",
            scrollbar:ScrollbarType.vertical,
            name:"image",
        });
    };
    private createEmptyCanvas=()=>{
        this.eBoard.addEmptyFrame({
            type:FrameType.Empty,
            name:"empty",
        });
    };
    private createPdfCanvas=()=>{
        this.eBoard.addPdfFrame({
            type:FrameType.Pdf,
            url:require("./4.pdf"),
            pageNum:1,
            name:"pdf"
        });
    };
    private createImagesCanvas=()=>{
        const dataSet=[];
        for (let i=0;i<114;i++){
            dataSet.push(i+".png");
        }
        this.eBoard.addImagesFrame({
            type:FrameType.Images,
            pageNum:1,
            urlPrefix:"https://res2dev.9itest.com/resource2/1000/document/20180716/56e61d90a7d7435c80a2499621055ceb_png/",
            images:dataSet,
            name:"images"
        });
    };
    public render() {
        return (
            <Card bordered title="MixCanvas" style={{ margin: "16px 16px"}}>
                <div>
                    <button onClick={this.createHtmlCanvas}>htmlFrame</button>
                    <button onClick={this.createImageCanvas}>imageFrame</button>
                    <button onClick={this.createEmptyCanvas}>emptyFrame</button>
                    <button onClick={this.createPdfCanvas}>pdfFrame</button>
                    <button onClick={this.createImagesCanvas}>imagesFrame</button>
                </div>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"200%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        );
    }
}

export default MixCanvas;