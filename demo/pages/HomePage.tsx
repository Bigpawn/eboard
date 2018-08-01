import * as React from "react";
import { Card } from "antd";
import {
    Arrow,
    Circle, Clear, Cursor, Ellipse, EquilateralTriangle, Hexagon,
    OrthogonalTriangle,
    Pentagon,
    Polygon,
    Rectangle,
    Square, Star,
    Triangle,
} from '../../src/plugins';
import {CursorTypeName} from '../../src/plugins/tool/cursor/CursorType';
import {Line} from '../../src/plugins';
import {Selection} from '../../src/plugins';
import {HTML} from '../../src/plugins';
import {Text} from "../../src/plugins";
import {Plugins} from '../../src/plugins';
import {Pencil} from "../../src/plugins";
import {FrameType} from '../../src/EBoard';
import {IFrame} from '../../src/frames/IFrame';
import {EBoardInstance} from './EBoardInstance';
import {MessageMiddleWare} from '../../src/middlewares/MessageMiddleWare';


export class ToolBar extends React.Component{
    private Canvas:IFrame;
    constructor(props:any){
        super(props);
        this.setCursor=this.setCursor.bind(this);
        this.setCursorClose=this.setCursorClose.bind(this);
    }
    public setCanvas(canvas:IFrame){
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
        Line.setEnable(true);
    };
    private startLine1=()=>{
        const Line = this.Canvas.getPlugin(Plugins.Arrow) as Arrow;
        Line.setEnable(true);
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
        PencilLine.setEnable(true);
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
    private Polygon=()=>{
        const Polygon = this.Canvas.getPlugin(Plugins.Polygon) as Polygon;
        Polygon.setEnable(true);
    };
    private Star=()=>{
        const Star = this.Canvas.getPlugin(Plugins.Star) as Star;
        Star.setEnable(true);
    };
    private Pentagon=()=>{
        const Pentagon = this.Canvas.getPlugin(Plugins.Pentagon) as Pentagon;
        Pentagon.setEnable(true);
    };
    private Hexagon=()=>{
        const Hexagon = this.Canvas.getPlugin(Plugins.Hexagon) as Hexagon;
        Hexagon.setEnable(true);
    };
    private Clear=()=>{
        const Clear = this.Canvas.getPlugin(Plugins.Clear) as Clear;
        Clear.clear();
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
                <button onClick={this.Polygon}>Polygon</button>
                <button onClick={this.Star}>Star</button>
                <button onClick={this.Pentagon}>Pentagon</button>
                <button onClick={this.Hexagon}>Hexagon</button>
                <button onClick={this.Clear}>Clear</button>
            </div>
        )
    }
}

const eBoard =EBoardInstance.getInstance();
const receiveEBoard = EBoardInstance.getReceiveInstance();
eBoard.attachMessageMiddleWare((message)=>{
    console.log(message);
    receiveEBoard.onMessage(message);
});

class HomePage extends React.Component<{}, {}> {
    protected Toolbar:ToolBar;
    protected canvas:any;
    protected container:any;
    componentDidMount(){
        const frame = eBoard.clearCache().createBaseFrame({
            type:FrameType.Empty,
            ratio:"16:9",
        });
        eBoard.switchToFrame(frame);
        this.Toolbar.setCanvas(frame);
        // receive
        
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220}}>
                    {/*<BaseCanvas ratio={"16:9"} ref={(ref:BaseCanvas)=>this.canvas=ref}/>*/}
                </div>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220}}>
                    {/*<BaseCanvas ratio={"16:9"} ref={(ref:BaseCanvas)=>this.canvas=ref}/>*/}
                </div>
            </Card>
        );
    }
}

export default HomePage;
