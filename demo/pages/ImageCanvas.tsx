import * as React from "react";
import SimpleCanvas, {ToolBar} from './SimpleCanvas';
import { Card } from "antd";
import {BaseFrame} from '../../src/frames/BaseFrame';
import {FrameType} from '../../src/EBoard';
import {ScrollbarType} from '../../src/frames/HtmlFrame';
import {EBoardInstance} from './EBoardInstance';



class ImageCanvas extends SimpleCanvas {
    componentDidMount(){
    
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance();
        eBoard.attachMessageMiddleWare((message)=>{
            receiveEBoard.onMessage(message);
        });
        eBoard.clearCache().createImageFrame({
            type:FrameType.Image,
            ratio:"16:9",
            content:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E",
            scrollbar:ScrollbarType.vertical,
            messageId:0
        }) as BaseFrame;
        this.Toolbar.setEBoard(eBoard);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="ImageCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}/>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"40%",display:"inline-block",marginLeft:40}}/>
            </Card>
        )
    }
}

export default ImageCanvas;
