import * as React from "react";
import { Card } from "antd";
import {BaseCanvas} from '../../src/canvas/react/BaseCanvas';
import {
    Circle, Cursor, Ellipse, EquilateralTriangle, OrthogonalTriangle, Rectangle,
    Square,
    Triangle,
} from '../../src/plugins';
import {CursorTypeName} from '../../src/plugins/tool/cursor/CursorType';
import {Line} from '../../src/plugins';
import {Selection} from '../../src/plugins';
import {ArrowMode, ArrowType, LineType} from '../../src/plugins/shape/2D/line/LineType';
import {HTML} from '../../src/plugins';
import {Text} from "../../src/plugins";
import {Plugins} from '../../src/plugins';
import {Pencil} from "../../src/plugins";


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
    private startText=()=> {
        const Text = this.Canvas.getPlugin(Plugins.Text) as Text;
        Text.setFontSize().setColor('blue').setEnable(true);
    };
    private selection=()=>{
        const Selection = this.Canvas.getPlugin(Plugins.Selection) as Selection;
        Selection.setEnable(true);
    };
    private startPencilLine=()=>{
        const PencilLine = this.Canvas.getPlugin(Plugins.Pencil) as Pencil;
        PencilLine.setColor('rgba(0,0,0,1)').setWidth(20).setEnable(true);
    };
    private openHtml=()=>{
        const HTML = this.Canvas.getPlugin(Plugins.HTML) as HTML;
        HTML.setEnable(true);
    };
    private circle=()=>{
        const Circle = this.Canvas.getPlugin(Plugins.Circle) as Circle;
        Circle.setEnable(true);
    };
    private ellipse=()=>{
        const Ellipse = this.Canvas.getPlugin(Plugins.Ellipse) as Ellipse;
        Ellipse.setEnable(true);
    };
    private rectangle=()=>{
        const Rectangle = this.Canvas.getPlugin(Plugins.Rectangle) as Rectangle;
        Rectangle.setEnable(true);
    };
    private square=()=>{
        const Square = this.Canvas.getPlugin(Plugins.Square) as Square;
        Square.setEnable(true);
    };
    private triangle=()=>{
        const Triangle = this.Canvas.getPlugin(Plugins.Triangle) as Triangle;
        Triangle.setEnable(true);
    };
    private EquilateralTriangle=()=>{
        const EquilateralTriangle = this.Canvas.getPlugin(Plugins.EquilateralTriangle) as EquilateralTriangle;
        EquilateralTriangle.setEnable(true);
    };
    private OrthogonalTriangle=()=>{
        const OrthogonalTriangle = this.Canvas.getPlugin(Plugins.OrthogonalTriangle) as OrthogonalTriangle;
        OrthogonalTriangle.setEnable(true);
    };
    render(){
        return (
            <div>
                <button onClick={this.setCursor}>PaintBrush</button>
                <button onClick={this.setPencilCursor}>Pencil</button>
                <button onClick={this.setCursorClose}>Cursor Close</button>
                <button onClick={this.startLine}>Line</button>
                <button onClick={this.startLine1}>Line1</button>
                <button onClick={this.startText}>Text</button>
                <button onClick={this.selection}>Selection</button>
                <button onClick={this.startPencilLine}>Pencil line</button>
                <button onClick={this.openHtml}>HTML操作</button>
                <button onClick={this.circle}>Circle</button>
                <button onClick={this.ellipse}>Ellipse</button>
                <button onClick={this.rectangle}>Rectangle</button>
                <button onClick={this.square}>Square</button>
                <button onClick={this.triangle}>Triangle</button>
                <button onClick={this.EquilateralTriangle}>EquilateralTriangle</button>
                <button onClick={this.OrthogonalTriangle}>OrthogonalTriangle</button>
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
