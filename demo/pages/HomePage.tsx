import * as React from "react";
import { Card } from "antd";
import {BaseCanvas} from '../../src/canvas/BaseCanvas';
import {Cursor} from '../../src/cursor/Cursor';
import {CursorTypeName} from '../../src/cursor/CursorType';
import {Plugins} from '../../src/AbsPlugin';
import {Line} from '../../src/line/Line';
import {Selection} from '../../src/selection/Selection';
import {ArrowMode, ArrowType, LineType} from '../../src/line/LineType';
import {HTML} from '../../src/html/HTML';


export class ToolBar extends React.Component{
    private Canvas:BaseCanvas;
    constructor(props:any){
        super(props);
        this.setCursor=this.setCursor.bind(this);
        this.setCursorClose=this.setCursorClose.bind(this);
    }
    public setCanvas(canvas:BaseCanvas){
        this.Canvas=canvas;
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
    private selection=()=>{
        const Selection = this.Canvas.getPlugin(Plugins.Selection) as Selection;
        Selection.setEnable(true);
    };
    private openHtml=()=>{
        const HTML = this.Canvas.getPlugin(Plugins.HTML) as HTML;
        HTML.setEnable(true);
    };
    render(){
        return (
            <div>
                <button onClick={this.setCursor}>PaintBrush</button>
                <button onClick={this.setPencilCursor}>Pencil</button>
                <button onClick={this.setCursorClose}>Cursor Close</button>
                <button onClick={this.startLine}>Line</button>
                <button onClick={this.startLine1}>Line1</button>
                <button onClick={this.selection}>Selection</button>
                <button onClick={this.openHtml}>HTML操作</button>
            </div>
        )
    }
}


class HomePage extends React.Component<{}, {}> {
    protected Toolbar:ToolBar;
    protected canvas:any;
    componentDidMount(){
        this.Toolbar.setCanvas(this.canvas);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div style={{position:"relative",height:document.body.offsetHeight-220}}>
                    <BaseCanvas ratio={"16:9"} ref={(ref:BaseCanvas)=>this.canvas=ref}/>
                </div>
            </Card>
        );
    }
}

export default HomePage;
