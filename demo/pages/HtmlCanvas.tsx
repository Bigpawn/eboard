import * as React from "react";
import { Card } from "antd";
import SimpleCanvas from './SimpleCanvas';
import {MessageTag, ScrollbarType} from '../../src/index';
import {EBoardInstance} from './EBoardInstance';
import {FrameType} from '../../src/enums/SDKEnum';



class HtmlCanvas extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance();
        eBoard.on("message",(e:any)=>{
            const message=JSON.parse(e.data);
            console.log(message);
            // adapter
            const {header,body} = message;
            const {tag,frameId,id:objectId,ids,groupId} = header;
            const {
                name,type,icon,canRemove,width,data,
                content,
                scrollbar,
                ...attributes
            } = body;
            switch (tag) {
                case MessageTag.CreateFrame:
                    const wbType = type===FrameType.Empty?"empty":type===FrameType.Pdf?"pdf":type===FrameType.Canvas?"canvas":type===FrameType.HTML?"html":type===FrameType.Image?"image":type===FrameType.Images?"images":"";
                    console.log({
                        wbNumber:frameId,
                        wbName:name,
                        wbIcon:icon,
                        wbType:wbType,
                        originalWidth:width,
                        htmlContent:content,
                        scrollbar:scrollbar===1,
                        canRemove
                    });
                    break;
                case MessageTag.Shape:
                    console.log({
                        wbNumber:frameId,
                        objectId:objectId,
                        attributes:attributes,
                        shapeType:type,
                    });
                    break;
                case MessageTag.Delete:
                    console.log({
                        wbNumber:frameId,
                        objectIds:ids
                    });
                    break;
                case MessageTag.Clear:
                    console.log({
                        wbNumber:frameId,
                    });
                    break;
                case MessageTag.Cursor:
                    console.log({
                        wbNumber:frameId,
                        attributes:Object.assign({},attributes,{type}),
                    });
                    break;
                case MessageTag.UndoRedo:
                    const {id,...extra} = data;
                    console.log({
                        wbNumber:frameId,
                        objectId:id,
                        action:type,
                        attributes:extra,
                    });
                    break;
            }
    
        });
        eBoard.addHtmlFrame({
            type:FrameType.HTML,
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
            '                        <br/>',
        });
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="HTML Canvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"100%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        )
    }
}

export default HtmlCanvas;
