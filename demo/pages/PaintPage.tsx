/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 20:01:31
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-13 14:17:27
 */
import * as _ from 'lodash';
import * as React from "react";
// import * as Redux from "redux";
import { connect } from "react-redux";
import * as classNames from 'classnames';
import { InputNumber } from "antd";
import { SketchPicker as ColorPicker} from 'react-color';

import { fabric } from "fabric";
import { BrushType } from "../../src/brushes/BrushType";
import { IBrushOptions } from "../../src/brushes/IBrush";
import BrushManager from "../../src/brushes/BrushManager";
import AbstractBrush from "../../src/brushes/AbstractBrush";
import CircleCursor from "../../src/cursor/CircleCursor";
import EBoardWidget from "../../src/EBoardWidget";
import EBoardEngine from '../../src/EBoardEngine';
import {
    PointerIcon,
    LineIcon,
    PenIcon,
    CircleIcon,
    RectangleIcon,
    PolygonIcon,
    TriangleIcon,
    TextIcon,
    EraserIcon,
    ColorPaletteIcon,
    UndoIcon,
    RedoIcon,
    RestoreIcon
} from "../icons/SvgIcons";

import "./PaintPage.less";
import { FabricObservingEventType, ZoomEvent } from '../../src/mixins/FabricEvents';

interface IPaintPageStates {
    currentBrush: BrushType;
    strokeColorPickerStyle: any;
    fillColorPickerStyle: any;
    brushSettings: any;
    zoomValue: number;
    undoSize: number;
    redoSize: number;
}

interface IPaintPageProps extends React.Props<PaintPage> {
    // ...
    selectedBrush: BrushType;
    actions: any;
}

const defaultCursorOptions: any = {
    fill: "rgba(255, 0, 0, 1)",
    stroke: "rgba(0, 255, 0, 1)",
    strokeWidth: 3,
    radius: 5
};

const defaultBrushOptions: IBrushOptions = {
    fill: "rgba(255, 0, 0, .1)",
    stroke: "rgba(0, 255, 0, .1)",
    strokeWidth: 3,
};

class PaintPage extends React.Component <IPaintPageProps, IPaintPageStates > {

    eBoardEngine: EBoardEngine;
    
    brushManager: BrushManager;

    constructor(props: any) {
        super(props);
        this.state = {
            currentBrush: BrushType.POINTER_BRUSH,
            strokeColorPickerStyle: {
                "display": 'none',
                "zIndex": 99999,
                "position": 'absolute',
                "left": 0,
                "top": 0,
            },
            fillColorPickerStyle: {
                "display": 'none',
                "zIndex": 99999,
                "position": 'absolute',
                "left": 0,
                "top": 0,
            },
            brushSettings: {
                stroke: 'rgba(255, 0, 0, 1)',
                fill: 'rgba(0, 255, 0, 1)',
            },
            zoomValue: 1,
            undoSize: 0,
            redoSize: 0
        };
    }

    public componentWillMount() {
        this.brushManager = new BrushManager();
    }

    private __setEBoardEngine(eBoardEngine: EBoardEngine) {
        this.eBoardEngine = eBoardEngine;
        this.eBoardEngine.addEventListener(FabricObservingEventType.ZOOM_AFTER, (event: ZoomEvent) => {this.__onZoom(event); });
    }

    private __selectBrush(evt: any, brushType: BrushType): void {
        let eBoardCanvas = this.eBoardEngine.getEBoardCanvas();
        if (this.brushManager.isPointerBrush(brushType)) {
            eBoardCanvas.clearFreeDrawingBrush();
        } else {
            let brushOptions: any = {};
            
            switch (brushType) {
                case BrushType.TEXT_BRUSH:
                    _.defaultsDeep(brushOptions, {canvas: eBoardCanvas}, this.state.brushSettings);
                    break;
                default:
                    _.defaultsDeep(brushOptions, {canvas: eBoardCanvas}, this.state.brushSettings, defaultBrushOptions);
                    let circleCursor = new CircleCursor(defaultCursorOptions, eBoardCanvas);
                    brushOptions.cursor = circleCursor;
            }

            let brush: AbstractBrush = this.brushManager.selectBrush(brushType, brushOptions, true);
            eBoardCanvas.setFreeDrawingBrush(brush);
        }
        
        this.setState({
            currentBrush: brushType
        });
    }

    private __openStrokeColorPickerDialog(evt: MouseEvent) {
        let options: any = {};
        _.defaultsDeep(options, this.state.strokeColorPickerStyle);
        options.display = options.display === 'none' ? 'block' : 'none';
        options.left = evt.clientX;
        options.top = evt.clientY + 10;
        this.setState({
            strokeColorPickerStyle: options
        });
    }

    private __openFillColorPickerDialog(evt: MouseEvent) {
        let options: any = {};
        _.defaultsDeep(options, this.state.fillColorPickerStyle);
        options.display = options.display === 'none' ? 'block' : 'none';
        options.left = evt.clientX + 10;
        options.top = evt.clientY + 10;
        this.setState({
            fillColorPickerStyle: options
        });
    }

    private __handleStrokeColorChanged(color: any) {
        let options: any = {};
        _.defaultsDeep(options, this.state.brushSettings);
        options.stroke = new fabric.Color(color.rgb).toRgba();
        if (this.brushManager.getCurrentBrush()) {
            this.brushManager.getCurrentBrush().updateOptions({stroke: options.stroke});
        }        
        this.setState({
            brushSettings: options
        });
    }

    private __handleFillColorChanged(color: any) {
        let options: any = {};
        _.defaultsDeep(options, this.state.brushSettings);
        options.fill = new fabric.Color(color.rgb).toRgba();
        if (this.brushManager.getCurrentBrush()) {
            this.brushManager.getCurrentBrush().updateOptions({fill: options.fill});
        }
        this.setState({
            brushSettings: options
        });
    }

    private __handleStrokeColorMouseOut(evt: MouseEvent) {
        // let options: any = {};
        // _.defaultsDeep(options, this.state.strokeColorPickerStyle);
        // options.display = 'none';
        // this.setState({strokeColorPickerStyle: options});
    }

    private __handleFillColorMouseOut(evt: MouseEvent) {
        // let options: any = {};
        // _.defaultsDeep(options, this.state.fillColorPickerStyle);
        // options.display = 'none';
        // this.setState({fillColorPickerStyle: options});
    }

    private __restoreOriginalVpt(evt: MouseEvent) {
        this.eBoardEngine.getEBoardCanvas().restoreOriginalViewportTransform();
        this.setState({
            zoomValue: this.eBoardEngine.getEBoardCanvas().getOriginalViewportTransform()[0]
        });
    }

    private __handlerZoomChanged(value: number) {
        this.eBoardEngine.getEBoardCanvas().setZoom(value);
    }

    private __onZoom(event: ZoomEvent) {
        this.setState({
            zoomValue: Math.floor(event.value * 100) / 100
        });
    }

    private __undo(event: any) {
        let size = this.eBoardEngine.undo();
        this.setState(size);
    }

    private __redo(event: any) {
        let size = this.eBoardEngine.redo();
        this.setState(size);
    }

    public render(): JSX.Element {
        return (
            <div style={{height: "900px"}}>
                <div style={{backgroundColor: "white"}}>
                    <PointerIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.POINTER_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.POINTER_BRUSH);
                        }}
                    />
                    <PenIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.PENCEIL_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.PENCEIL_BRUSH);
                        }}
                    />
                    <LineIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.LINE_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.LINE_BRUSH);
                        }}
                    />
                    <TextIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.TEXT_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.TEXT_BRUSH);
                        }}
                    />
                    <RectangleIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.RECTANGLE_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.RECTANGLE_BRUSH);
                        }}
                    />
                    <TriangleIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.TRIANGLE_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.TRIANGLE_BRUSH);
                        }}
                    />
                    <CircleIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.CIRCLE_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.CIRCLE_BRUSH);
                        }}
                    />
                    <PolygonIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.POLYGON_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.POLYGON_BRUSH);
                        }}
                    />
                    <EraserIcon
                        color="primary"
                        className={classNames("icon", {selected : this.state.currentBrush === BrushType.ERASER_BRUSH})}
                        onClick={(evt: any) => {
                            this.__selectBrush(evt, BrushType.ERASER_BRUSH);
                        }}
                    />
                    <ColorPaletteIcon
                        className={classNames("icon")}
                        style={{'backgroundColor': this.state.brushSettings.stroke}}
                        onClick={ (evt: MouseEvent) => {
                            this.__openStrokeColorPickerDialog(evt);
                        }}
                    />
                    <div
                        className="color_palette"
                        style={this.state.strokeColorPickerStyle}
                        onMouseOut={ (event: any) => {
                            this.__handleStrokeColorMouseOut(event);
                        }}
                    >
                        <ColorPicker
                            color={ this.state.brushSettings.stroke }
                            onChangeComplete={ (color: any) => {
                                this.__handleStrokeColorChanged(color);
                            }}
                        />
                    </div>
                    <ColorPaletteIcon
                        className={classNames("icon")}
                        style={{'backgroundColor': this.state.brushSettings.fill}}
                        onClick={ (evt: MouseEvent) => {
                            this.__openFillColorPickerDialog(evt);
                        }}
                    />
                    <div
                        className="color_palette"
                        style={this.state.fillColorPickerStyle}
                        onMouseOut={ (event: any) => {
                            this.__handleFillColorMouseOut(event);
                        }}
                    >
                        <ColorPicker
                            color={ this.state.brushSettings.fill }
                            onChangeComplete={ (color: any) => {
                                this.__handleFillColorChanged(color);
                            }}
                        />
                    </div>

                    <div>Zoom:</div>
                    <InputNumber
                        defaultValue={1}
                        min={0.01}
                        max={20}
                        value = {this.state.zoomValue}
                        step={0.01}
                        formatter={(value: number) => `${value * 100}%`}
                        parser={(value: string) => parseInt(value.replace('%', ''), 10) / 100}
                        onChange={(value: number) => { this.__handlerZoomChanged(value); }}
                    />
                    <UndoIcon
                        color={this.state.undoSize > 0 ? "secondary" : "disabled"}
                        className={classNames("icon")}
                        onClick={(evt: any) => {
                            this.__undo(evt);
                        }}
                    />
                    <RedoIcon
                        color={this.state.redoSize > 0 ? "secondary" : "disabled"}
                        className={classNames("icon")}
                        onClick={(evt: any) => {
                            this.__redo(evt);
                        }}
                    />
                    <RestoreIcon
                        color="primary"
                        className={classNames("icon")}
                        onClick={ (evt: MouseEvent) => {
                            this.__restoreOriginalVpt(evt);
                        }}
                    />
                </div>
                <div style={{height: "100%"}}>
                    <EBoardWidget
                        onInitEBoardEngine={ (eBoardEngine: EBoardEngine) => {
                            this.__setEBoardEngine(eBoardEngine);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default connect()(PaintPage);
