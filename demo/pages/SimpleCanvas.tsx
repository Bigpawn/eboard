import * as React from "react";
import { Card } from "antd";
import {FrameType} from '../../src/EBoard';
import {EBoardInstance} from './EBoardInstance';
import {fabric} from "fabric";

class SimpleCanvas extends React.Component<{}, {}> {
    protected canvas:any;
    protected container:any;
    componentDidMount(){
        setTimeout(()=>{
            const eBoard = EBoardInstance.getInstance();
            // const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
            eBoard.on("message",(e:any)=>{
                const message=e.data;
                console.log(message);
                // receiveEBoard.onMessage(message);
            });
            const frame=eBoard.addEmptyFrame({
                type:FrameType.Empty,
            });
            const canvas=frame.engine.eBoardCanvas.getUpperCanvas();
            // canvas.style.backgroundColor="blue";
            const canvasContext= canvas.getContext("2d");
            canvasContext.fillStyle="red";
            canvasContext.fillRect(0,0,300,75);
            setTimeout(()=>{
                const canvas=frame.engine.eBoardCanvas.getUpperCanvas();
                // canvas.style.backgroundColor="blue";
                const canvasContext= canvas.getContext("2d");
                canvasContext.fillStyle="blue";
                canvasContext.fillRect(0,0,150,75);
                const message ={"messageId":11,"header":{"id":"1540442682021","tag":13,"frameId":frame.frameId},"body":{"type":"pencil","stroke":"#f66c00","strokeWidth":10.8,"path":"M 196 143 Q 196 143 199.5 145.5 Q 203 148 206 151.5 Q 209 155 215.5 161 Q 222 167 226 170.5 Q 230 174 234.5 178.5 Q 239 183 242.5 185.5 Q 246 188 252 193.5 Q 258 199 261 202.5 Q 264 206 269.5 210.5 Q 275 215 281.5 220.5 Q 288 226 297 231.5 Q 306 237 308.5 239 Q 311 241 314.5 242 Q 318 243 320 244.5 Q 322 246 324.5 247.5 Q 327 249 329.5 249.5 Q 332 250 335 250 Q 338 250 342 250.5 Q 346 251 350 252 Q 354 253 359.5 254 Q 365 255 372 256.5 Q 379 258 387 259.5 Q 395 261 396.5 261 Q 398 261 406 261 Q 414 261 416.5 261 Q 419 261 421 261 Q 423 261 426 261 Q 429 261 435.5 261 Q 442 261 447.5 261 Q 453 261 461 261.5 Q 469 262 471.5 263.5 Q 474 265 478 267.5 Q 482 270 503.5 290 Q 525 310 532.5 320 Q 540 330 546 339 Q 552 348 556.5 356 Q 561 364 564.5 374 Q 568 384 570.5 391 Q 573 398 574.5 401 Q 576 404 576 405 Q 576 406 576 407 Q 576 408 576 408.5 L 576 409"}};
                eBoard.onMessage(JSON.stringify(message));
            },300)
            
            
            // const message ={"messageId":11,"header":{"id":"1540442682021","tag":13,"frameId":frame.frameId},"body":{"type":"pencil","stroke":"#f66c00","strokeWidth":10.8,"path":"M 8 18 Q 8 18 8.5 18 Q 9 18 10.5 21 Q 12 24 15 30 Q 18 36 21 41 Q 24 46 25 49.5 Q 26 53 30.5 57.5 Q 35 62 35 64 Q 35 66 36 69.5 Q 37 73 38.5 76.5 Q 40 80 40 81 Q 40 82 40 83 L 40 84"}};
            // eBoard.onMessage(JSON.stringify(message));
        },100)
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"100%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}>
                        <canvas id="test"></canvas>
                    </div>
                </div>
            </Card>
        );
    }
}

export default SimpleCanvas;
