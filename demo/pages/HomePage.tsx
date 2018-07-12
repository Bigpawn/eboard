import * as React from "react";
import { Card } from "antd";
import {BaseCanvas} from '../../src/canvas/BaseCanvas';
import {Cursor} from '../../src/cursor/Cursor';
import {CursorTypeName} from '../../src/cursor/CursorType';
import {Plugins} from '../../src/AbsPlugin';
import {Line} from '../../src/line/Line';
import {Selection} from '../../src/selection/Selection';
import {ArrowMode, ArrowType, LineType} from '../../src/line/LineType';
import {Text} from "../../src/text/Text";

class HomePage extends React.Component<{}, {}> {
    private Canvas:BaseCanvas;
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
    private startLine=()=>{
        const Line = this.Canvas.getPlugin(Plugins.Line) as Line;
        Line.setColor("red").setArrowType(ArrowType.DEFAULT).setLineType(LineType.DASHED).setEnable(true);
    };
    private startLine1=()=>{
        const Line = this.Canvas.getPlugin(Plugins.Line) as Line;
        Line.setColor("red").setArrowType(ArrowType.HOLLOW).setArrowMode(ArrowMode.ALL).setLineType(LineType.DASHED).setEnable(true);
    };
    private startText=()=> {
        const Text = this.Canvas.getPlugin(Plugins.Text) as Text;
        Text.setFontSize().setColor('blue').setEnable(true);
    };
    private selection=()=>{
        const Selection = this.Canvas.getPlugin(Plugins.Selection) as Selection;
        Selection.setEnable(true);
    };
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <button onClick={this.setCursor}>PaintBrush</button>
                <button onClick={this.setPencilCursor}>Pencil</button>
                <button onClick={this.setCursorClose}>Cursor Close</button>
                <button onClick={this.startLine}>Line</button>
                <button onClick={this.startLine1}>Line1</button>
                <button onClick={this.startText}>Text</button>
                <button onClick={this.selection}>Selection</button>
                <div style={{position:"relative",height:document.body.offsetHeight-220}}>
                    <BaseCanvas ratio={"16:9"} ref={(ref:BaseCanvas)=>this.Canvas=ref}/>
                </div>
            </Card>
        );
    }
}

export default HomePage;
