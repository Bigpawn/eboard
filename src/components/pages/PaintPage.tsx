/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 20:01:31
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-06 09:32:39
 */
import * as _ from 'lodash';
import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";
import * as classNames from 'classnames';
// import { Icon } from "antd";
import { SketchPicker as ColorPicker} from 'react-color';

import { fabric } from "fabric";
import { IStates } from "../reducers/rootReducer";
import { actionCreators } from "../actions/actions";
import { BrushType } from "../eboard/brushes/BrushType";
import { IBrushOptions } from "../eboard/brushes/IBrush";
import BrushManager from "../eboard/brushes/BrushManager";
import AbstractBrush from "../eboard/brushes/AbstractBrush";
import CircleCursor from "../eboard/cursor/CircleCursor";
import EBoardWidget from "../eboard/EBoardWidget";
import EBoardEngine from '../eboard/EBoardEngine';
import {PointerIcon, LineIcon, PenIcon, CircleIcon, RectangleIcon, PolygonIcon, TriangleIcon, TextIcon, EraserIcon, ColorPaletteIcon } from "../icons/SvgIcons";

import "./PaintPage.scss";

interface IPaintPageStates {
    currentBrush: BrushType;
    strokeColorPickerStyle: any;
    fillColorPickerStyle: any;
    brushSettings: any;
}

interface IPaintPageProps extends React.Props<PaintPage> {
    // ...
    selectedBrush: BrushType;
    actions: any;
}

const defaultCursorOptions: any = {
    fill: "rgb(255, 0, 0, 1)",
    stroke: "rgb(0, 255, 0, 1)",
    strokeWidth: 5,
    radius: 2
};

const defaultBrushOptions: IBrushOptions = {
    fill: "rgb(255, 0, 0, .1)",
    stroke: "rgb(0, 255, 0, .1)",
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
            }
        };
    }

    public componentWillMount() {
        this.brushManager = new BrushManager();
    }

    private setEBoardEngine(eBoardEngine: EBoardEngine) {
        this.eBoardEngine = eBoardEngine;
    }

    private selectBrush(evt: any, brushType: BrushType): void {
        let eBoardCanvas = this.eBoardEngine.getEBoardCanvas();
        if (this.brushManager.isPointerBrush(brushType)) {
            eBoardCanvas.clearFreeDrawingBrush();
        } else {
            let brushOptions: any = {};
            _.defaultsDeep(brushOptions, {canvas: eBoardCanvas}, this.state.brushSettings, defaultBrushOptions);
            let circleCursor = new CircleCursor(defaultCursorOptions, eBoardCanvas);
            brushOptions.cursor = circleCursor;
            let brush: AbstractBrush = this.brushManager.selectBrush(brushType, brushOptions, true);
            eBoardCanvas.setFreeDrawingBrush(brush);
        }
        
        this.setState({currentBrush: brushType});
    }

    private openStrokeColorPickerDialog(evt: MouseEvent) {
        let options: any = {};
        _.defaultsDeep(options, this.state.strokeColorPickerStyle);
        options.display = options.display === 'none' ? 'block' : 'none';
        options.left = evt.clientX;
        options.top = evt.clientY + 10;
        this.setState({strokeColorPickerStyle: options});
    }

    private openFillColorPickerDialog(evt: MouseEvent) {
        let options: any = {};
        _.defaultsDeep(options, this.state.fillColorPickerStyle);
        options.display = options.display === 'none' ? 'block' : 'none';
        options.left = evt.clientX + 10;
        options.top = evt.clientY + 10;
        this.setState({fillColorPickerStyle: options});
    }

    private handleStrokeColorChanged(color: any) {
        let options: any = {};
        _.defaultsDeep(options, this.state.brushSettings);
        options.stroke = new fabric.Color(color.rgb).toRgba();
        if (this.brushManager.getCurrentBrush()) {
            this.brushManager.getCurrentBrush().updateOptions({stroke: options.stroke});
        }        
        this.setState({brushSettings: options});
    }

    private handleFillColorChanged(color: any) {
        let options: any = {};
        _.defaultsDeep(options, this.state.brushSettings);
        options.fill = new fabric.Color(color.rgb).toRgba();
        if (this.brushManager.getCurrentBrush()) {
            this.brushManager.getCurrentBrush().updateOptions({fill: options.fill});
        }
        this.setState({brushSettings: options});
    }

    private handleStrokeColorMouseOut(evt: MouseEvent) {
        // let options: any = {};
        // _.defaultsDeep(options, this.state.strokeColorPickerStyle);
        // options.display = 'none';
        // this.setState({strokeColorPickerStyle: options});
    }

    private handleFillColorMouseOut(evt: MouseEvent) {
        // let options: any = {};
        // _.defaultsDeep(options, this.state.fillColorPickerStyle);
        // options.display = 'none';
        // this.setState({fillColorPickerStyle: options});
    }

    // private convertRgba(color: any) {
    //     let c: string = "rgba(";
    //     c = c + color.rgb.r + ",";
    //     c = c + color.rgb.g + ",";
    //     c = c + color.rgb.b + ",";
    //     c = c + color.rgb.a + ")";
    //     return c;
    // }
    public render(): JSX.Element {
        return (
            <div style={{height: "600px"}}>
                <div style={{backgroundColor: "white"}}>
                    <PointerIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.POINTER_BRUSH})} type="cloud"  onClick={(evt: any) => {this.selectBrush(evt, BrushType.POINTER_BRUSH); }} />
                    <PenIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.PENCEIL_BRUSH})} type="tag-o" onClick={(evt: any) => {this.selectBrush(evt, BrushType.PENCEIL_BRUSH); }} />
                    <LineIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.LINE_BRUSH})} type="edit" onClick={(evt: any) => {this.selectBrush(evt, BrushType.LINE_BRUSH); }} />
                    <TextIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.TEXT_BRUSH})} type="file" onClick={(evt: any) => {this.selectBrush(evt, BrushType.TEXT_BRUSH); }} />
                    <RectangleIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.RECTANGLE_BRUSH})} type="picture" onClick={(evt: any) => {this.selectBrush(evt, BrushType.RECTANGLE_BRUSH); }} />
                    <TriangleIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.TRIANGLE_BRUSH})} type="reload" onClick={(evt: any) => {this.selectBrush(evt, BrushType.TRIANGLE_BRUSH); }} />
                    <CircleIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.CIRCLE_BRUSH})} type="star" onClick={(evt: any) => {this.selectBrush(evt, BrushType.CIRCLE_BRUSH); }} />
                    <PolygonIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.POLYGON_BRUSH})} type="heart" onClick={(evt: any) => {this.selectBrush(evt, BrushType.POLYGON_BRUSH); }} />
                    <EraserIcon className={classNames("icon", {selected : this.state.currentBrush === BrushType.ERASER_BRUSH})} type="heart" onClick={(evt: any) => {this.selectBrush(evt, BrushType.ERASER_BRUSH); }} />
                    <ColorPaletteIcon className={classNames("icon")} style={{'backgroundColor': this.state.brushSettings.stroke}} type="heart" onClick={ (evt: MouseEvent) => { this.openStrokeColorPickerDialog(evt); }} />
                    <div className="color_palette" style={this.state.strokeColorPickerStyle} onMouseOut={ (event: any) => {this.handleStrokeColorMouseOut(event); }} >
                        <ColorPicker color={ this.state.brushSettings.stroke } onChangeComplete={ (color: any) => { this.handleStrokeColorChanged(color); }} />
                    </div>
                    <ColorPaletteIcon className={classNames("icon")} style={{'backgroundColor': this.state.brushSettings.fill}} type="heart" onClick={ (evt: MouseEvent) => { this.openFillColorPickerDialog(evt); }} />
                    <div className="color_palette" style={this.state.fillColorPickerStyle} onMouseOut={ (event: any) => {this.handleFillColorMouseOut(event); }} >
                        <ColorPicker color={ this.state.brushSettings.fill } onChangeComplete={ (color: any) => { this.handleFillColorChanged(color); }} />
                    </div>
                </div>
                <div style={{height: "100%"}}>
                    <EBoardWidget  onInitEBoardEngine={ (eBoardEngine: EBoardEngine) => { this.setEBoardEngine(eBoardEngine); }} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (states: IStates) => {
    return {
        selectedBrush: states.paintToolbarStates.currentBrush,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        actions: Redux.bindActionCreators(actionCreators, dispatch),
        onSetBrush: (evt: any, brushType: BrushType) => {
            dispatch(actionCreators.selectBrushAction(brushType));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaintPage);
