import * as React from "react";
import { Card } from "antd";
import {HTMLCanvas} from '../../src/canvas/HTMLCanvas';
import {Cursor} from '../../src/cursor/Cursor';
import {CursorTypeName} from '../../src/cursor/CursorType';
import {Plugins} from '../../src/AbsPlugin';

class HTMLPage extends React.Component<{}, {}> {
    private Canvas:HTMLCanvas;
    constructor(props:any){
        super(props);
        this.setCursor=this.setCursor.bind(this);
        this.setCursorClose=this.setCursorClose.bind(this);
    }
    private setCursor=()=>{
        const Cursor = this.Canvas.getPlugin(Plugins.Cursor) as Cursor;
        Cursor.setType(CursorTypeName.PaintBruch).setSize("2rem","2rem").setEnable(true);
    };
    private setPencilCursor=()=>{
        const Cursor = this.Canvas.getPlugin(Plugins.Cursor) as Cursor;
        Cursor.setType(CursorTypeName.Pencil).setSize("2rem","2rem").setEnable(true);
    };
    private setCursorClose=()=>{
        const Cursor = this.Canvas.getPlugin(Plugins.Cursor) as Cursor;
        Cursor.setEnable(false);
    };
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <button onClick={this.setCursor}>PaintBrush</button>
                <button onClick={this.setPencilCursor}>Pencil</button>
                <button onClick={this.setCursorClose}>Cursor Close</button>
                <div style={{position:"relative",height:document.body.offsetHeight-220}}>
                    <HTMLCanvas ratio={"16:9"} ref={(ref:HTMLCanvas)=>this.Canvas=ref}>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                    </HTMLCanvas>
                </div>
            </Card>
        );
    }
}

export default HTMLPage;
