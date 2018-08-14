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
    }
    componentDidMount(){
        let toolbar = new AToolbar(document.getElementById("toolbarContainer") as HTMLDivElement,(item:any)=>{
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
                case "del":
                    this.eBoard.setActivePlugin(Plugins.Delete);
                    break;
                case "select":
                    this.eBoard.setActivePlugin(Plugins.Selection);
                    break;
                case "ferule":
                    this.eBoard.setActivePlugin(Plugins.Ferule);
                    break;
                case "stroke":
                    this.eBoard.setStrokeColor(item.color);
                    break;
                case "fill":
                    this.eBoard.setFillColor(item.color);
                    break;
                default:
                    break;
            }
        });
    }
    public setEBoard(eBoard:EBoard){
        this.eBoard=eBoard;
    }
    private startLine=()=>{
        this.eBoard.setActivePlugin(Plugins.Line);
    };
    private startText=()=> {
        this.eBoard.setActivePlugin(Plugins.Text);
    };
    private startPencilLine=()=>{
        this.eBoard.setActivePlugin(Plugins.Pencil);
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
        const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
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
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}/>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"40%",display:"inline-block",marginLeft:40}}/>
            </Card>
        );
    }
}

export default SimpleCanvas;
