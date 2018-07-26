/*
 * @Author: Bigpawn
 * @Date: 2018/7/14 10:58
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/14 10:58
 */
import { DisplayType } from "../enum/displayType";
import { OperationType } from "../enum/operationType";
var TypeProcess = /** @class */ (function () {
    function TypeProcess() {
    }
    /**
     *
     * @param {EBoardCanvas} eBoardCanvas
     * @param {module:.fabric/fabric-impl.Object} fabricObject
     * @param {string} operationType
     * @param content
     */
    TypeProcess.prototype.init = function (eBoardCanvas, fabricObject, operationType, content) {
        var type = this.getType(fabricObject);
        var options = this.getOptions(type, operationType, content);
        fabricObject.set(options);
        eBoardCanvas.requestRenderAll();
    };
    /**
     *
     * @param {module:.fabric/fabric-impl.Object} fabricObject
     * @returns {string}
     */
    TypeProcess.prototype.getType = function (fabricObject) {
        return fabricObject.type || '';
    };
    /**
     *
     * @param {string} type
     * @param {string} operationType
     * @param content
     */
    TypeProcess.prototype.getOptions = function (type, operationType, content) {
        var options = {};
        switch (type) {
            case DisplayType.IText:
                switch (operationType) {
                    case OperationType.颜色:
                        options = {
                            fill: content
                        };
                        break;
                    case OperationType.字体大小:
                        options = {
                            fontSize: content
                        };
                        break;
                    case OperationType.字体类型:
                        options = {
                            fontFamily: content
                        };
                        break;
                    case OperationType.字体加粗:
                        options = {
                            fontWeight: content
                        };
                        break;
                    case OperationType.字体倾斜:
                        options = {
                            fontStyle: content
                        };
                        break;
                }
                break;
            default:
                switch (operationType) {
                    case OperationType.边框颜色:
                        options = {
                            stroke: content
                        };
                        break;
                    case OperationType.线型粗细:
                        options = {
                            strokeWidth: content
                        };
                        break;
                    case OperationType.填充色:
                        options = {
                            fill: content
                        };
                        break;
                    case OperationType.样式线型:
                        options = {
                            strokeDashArray: content
                        };
                        break;
                }
        }
        return options;
    };
    return TypeProcess;
}());
export { TypeProcess };
//# sourceMappingURL=typeProcess.js.map