var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-12 17:35:17
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 22:07:49
 */
import * as _ from 'lodash';
import AbstractBrush from '../../AbstractBrush';
import { TextType } from '../../IBrush';
import { BrushType } from '../../BrushType';
import { BrowserCursorName, DefaultCursor } from '../../../cursor/BrowserCursor';
var defaultOpts = {
    textType: TextType.I_TEXT,
    fontSize: 40,
};
var TextBrush = /** @class */ (function (_super) {
    __extends(TextBrush, _super);
    function TextBrush(options) {
        var _this = _super.call(this, _.defaultsDeep(options, defaultOpts)) || this;
        _this._init(_this.options);
        return _this;
    }
    TextBrush.prototype._init = function (options) {
        this.setCursor(new DefaultCursor(BrowserCursorName.TEXT, this.options.canvas));
        this.canvas.enableDrawingModel();
    };
    TextBrush.prototype.getType = function () {
        return BrushType.TEXT_BRUSH;
    };
    /**
     * Inovoked on mouse down
     * @param {fabric.Point} pointer
     */
    TextBrush.prototype.onMouseDown = function (pointer) {
        this._prepareForDrawing(pointer);
    };
    /**
     * Inovoked on mouse move
     * @param {fabric.Point} pointer
     */
    TextBrush.prototype.onMouseMove = function (pointer) {
        this._captureDrawingPath(pointer);
        // redraw curve clear top canvas
        this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
        this._render();
    };
    /**
     * Invoked on mouse up
     */
    TextBrush.prototype.onMouseUp = function (pointer) {
        this.canvas.disableDrawingTrack();
        this._finalizeAndAddPath();
    };
    /**
     * @override
     */
    TextBrush.prototype._render = function () {
        return;
    };
    /**
     * @private
     * @param {fabric.Point} point Point to be added to points array
     */
    TextBrush.prototype._addPoint = function (point) {
        this._points[0] = point;
    };
    /**
     * @override
     */
    TextBrush.prototype._createObject = function () {
        if (!this._points || this._points.length === 0) {
            return null;
        }
        var textFunc = fabric[this.options.textType];
        var renderOpts = {};
        _.defaultsDeep(renderOpts, { 'left': this._points[0].x, 'top': this._points[0].y }, this.options);
        return new textFunc("This is Text.", renderOpts);
    };
    return TextBrush;
}(AbstractBrush));
export default TextBrush;
//# sourceMappingURL=TextBrush.js.map