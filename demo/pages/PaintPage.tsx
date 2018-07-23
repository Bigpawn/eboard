import * as React from "react";
import { Card } from "antd";
import HomePage, {ToolBar} from './HomePage';
import {EBoard, FrameType} from '../../src/EBoard';
import {ImagesFrame} from '../../src/frames/ImagesFrame';

class PaintPage extends HomePage{
    componentDidMount(){
        // this.Toolbar.setCanvas(this.canvas);
        const dataSet=[];
        for (let i=0;i<114;i++){
            dataSet.push(i+".png");
        }
        EBoard.createFrame({
            container:this.container,
            type:FrameType.Images,
            id:9,
            childMessageId:7,
            messageId:6,
            ratio:"16:9",
            pageNum:1,
            urlPrefix:"https://res2dev.9itest.com/resource2/1000/document/20180716/56e61d90a7d7435c80a2499621055ceb_png/",
            images:dataSet
        }).switchToFrame(9);
        const frame = EBoard.findFrameById(9) as ImagesFrame;
        this.Toolbar.setCanvas(frame);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="PagerCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} style={{position:"relative",height:document.body.offsetHeight-220}}/>
            </Card>
        )
    }
}

export default PaintPage;
