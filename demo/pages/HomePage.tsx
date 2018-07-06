import * as React from "react";
import { Card } from "antd";
import {Canvas} from '../../src/canvas/Canvas';
import {Cursor} from '../../src/paint/Cursor';
import {CursorTypeName} from '../../src/paint/CursorType';

class HomePage extends React.Component<{}, {}> {
    private Canvas:Canvas;
    constructor(props:any){
        super(props);
        this.setCursor=this.setCursor.bind(this);
        this.setCursorClose=this.setCursorClose.bind(this);
    }
    private setCursor=()=>{
        const Cursor = this.Canvas.pluginInstanceMap["Paint"] as Cursor;
        Cursor.setType(CursorTypeName.Pan0).setSize("2rem","2rem").setEnable(true);
    };
    private setCursorClose=()=>{
        const Cursor = this.Canvas.pluginInstanceMap["Paint"] as Cursor;
        Cursor.setEnable(false);
    };
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <button onClick={this.setCursor}>Cursor</button>
                <button onClick={this.setCursorClose}>Cursor Close</button>
                <div style={{position:"relative",height:document.body.offsetHeight-220}}>
                    <Canvas ratio={"16:9"} ref={(ref:Canvas)=>this.Canvas=ref}/>
                </div>
            </Card>
        );
    }
}

export default HomePage;
