import * as React from "react";
import { Card } from "antd";
import {Plugins} from '../../src/plugins';
import {EBoard, FrameType} from '../../src/EBoard';
import {EBoardInstance} from './EBoardInstance';
import {Toolbar as AToolbar} from "../../src/components/Toolbar";


export class ToolBar extends React.Component{
    private eBoard:EBoard;
    constructor(props:any){
        super(props);
        this.setCursor=this.setCursor.bind(this);
        this.setCursorClose=this.setCursorClose.bind(this);
    }
    componentDidMount(){
        let toolbar = new AToolbar(document.getElementById("toolbarContainer") as HTMLDivElement,(item:any)=>{
            console.log(item.key);
            switch (item.key){
                case "line":
                    this.startLine();
                    break;
                case "arrow-next":
                    this.eBoard.setActivePlugin(Plugins.ArrowNext);
                    break;
                case "arrow-prev":
                    this.eBoard.setActivePlugin(Plugins.ArrowPrev);
                    break;
                case "arrow-both":
                    this.eBoard.setActivePlugin(Plugins.Arrow);
                    break;
                case "circle":
                    this.circle();
                    break;
                case "ellipse":
                    this.ellipse();
                    break;
                case "triangle":
                    this.triangle();
                    break;
                case "equilateral-triangle":
                    this.EquilateralTriangle();
                    break;
                case "orthogonal-triangle":
                    this.OrthogonalTriangle();
                    break;
                case "rectangle":
                    this.rectangle();
                    break;
                case "square":
                    this.square();
                    break;
                case "star":
                    this.Star();
                    break;
                case "pentagon":
                    this.Pentagon();
                    break;
                case "hexagon":
                    this.Hexagon();
                    break;
                case "polygon":
                    this.Polygon();
                    break;
                case "text":
                    this.startText();
                    break;
                case "pencil":
                    this.startPencilLine();
                    break;
                case "clear":
                    this.Clear();
                    break;
                default:
                    break;
            }
        });
        console.log(toolbar);
    }
    public setEBoard(eBoard:EBoard){
        this.eBoard=eBoard;
    }
    private setCursor=()=>{
        this.eBoard.setActivePlugin(Plugins.Cursor);// 需要共存的插件 ， 采用插件配置的方式进行，enable options
    };
    private setPencilCursor=()=>{
        this.eBoard.setActivePlugin(Plugins.Cursor);// 需要共存的插件 ， 采用插件配置的方式进行，enable options
    };
    private setCursorClose=()=>{
        this.eBoard.setActivePlugin(Plugins.Cursor);// 需要共存的插件 ， 采用插件配置的方式进行，enable options
    };
    private startLine=()=>{
        this.eBoard.setActivePlugin(Plugins.Line);
    };
    private startLine1=()=>{
        this.eBoard.setActivePlugin(Plugins.Arrow);
    };
    private startText=()=> {
        this.eBoard.setActivePlugin(Plugins.Text);
    };
    private selection=()=>{
        this.eBoard.setActivePlugin(Plugins.Selection);// 需要共存的插件 ， 采用插件配置的方式进行，enable options
    };
    private startPencilLine=()=>{
        this.eBoard.setActivePlugin(Plugins.Pencil);
    };
    private openHtml=()=>{
        this.eBoard.setActivePlugin(Plugins.HTML);// 需要共存的插件 ， 采用插件配置的方式进行，enable options
    };
    private circle=()=>{
        this.eBoard.setActivePlugin(Plugins.Circle);
    };
    private ellipse=()=>{
        this.eBoard.setActivePlugin(Plugins.Ellipse);
    };
    private rectangle=()=>{
        this.eBoard.setActivePlugin(Plugins.Rectangle);
    };
    private square=()=>{
        this.eBoard.setActivePlugin(Plugins.Square);
    };
    private triangle=()=>{
        this.eBoard.setActivePlugin(Plugins.Triangle);
    };
    private EquilateralTriangle=()=>{
        this.eBoard.setActivePlugin(Plugins.EquilateralTriangle);
    };
    private OrthogonalTriangle=()=>{
        this.eBoard.setActivePlugin(Plugins.OrthogonalTriangle);
    };
    private Polygon=()=>{
        this.eBoard.setActivePlugin(Plugins.Polygon);
    };
    private Star=()=>{
        this.eBoard.setActivePlugin(Plugins.Star);
    };
    private Pentagon=()=>{
        this.eBoard.setActivePlugin(Plugins.Pentagon);
    };
    private Hexagon=()=>{
        this.eBoard.setActivePlugin(Plugins.Hexagon);
    };
    private Clear=()=>{
        this.eBoard.setActivePlugin(Plugins.Clear);
    };
    render(){
        return (
            <div>
                <div id={"toolbarContainer"}/>
             {/*   <button onClick={this.setCursor}>PaintBrush</button>
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
                <button onClick={this.Clear}>Clear</button>*/}
            </div>
        )
    }
}



class SimpleCanvas extends React.Component<{}, {}> {
    protected Toolbar:ToolBar;
    protected canvas:any;
    protected container:any;
    componentDidMount(){
        const eBoard = EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance();
        eBoard.attachMessageMiddleWare((message)=>{
            receiveEBoard.onMessage(message);
        });
        eBoard.clearCache().createBaseFrame({
            type:FrameType.Empty,
            ratio:"16:9",
        });
        this.Toolbar.setEBoard(eBoard);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
               
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}>
                    {/*<BaseCanvas ratio={"16:9"} ref={(ref:BaseCanvas)=>this.canvas=ref}/>*/}
                </div>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}>
                    {/*<BaseCanvas ratio={"16:9"} ref={(ref:BaseCanvas)=>this.canvas=ref}/>*/}
                </div>
            </Card>
        );
    }
}

export default SimpleCanvas;
