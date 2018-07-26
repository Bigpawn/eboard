/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 16:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 16:58
 * @disc:plugins export
 */
import { Line } from './shape/2D/line/Line';
import { HTML } from './tool/html/HTML';
import { Cursor } from './tool/cursor/Cursor';
import { Selection } from './tool/selection/Selection';
import { Text } from './shape/2D/text/Text';
import { Pencil } from './shape/2D/pencil/Pencil';
import { Circle } from './shape/2D/circle/Circle';
import { Ellipse } from './shape/2D/ellipse/Ellipse';
import { Rectangle } from './shape/2D/quadrangle/Rectangle';
import { Square } from './shape/2D/quadrangle/Square';
import { Triangle } from './shape/2D/triangle/Triangle';
import { EquilateralTriangle } from './shape/2D/triangle/EquilateralTriangle';
import { OrthogonalTriangle } from './shape/2D/triangle/OrthogonalTriangle';
import { Polygon } from './shape/2D/polygon/Polygon';
import { Star } from './shape/2D/polygon/Star';
import { Pentagon } from './shape/2D/polygon/Pentagon';
import { Hexagon } from './shape/2D/polygon/Hexagon';
import { Clear } from './tool/clear/Clear';
import { Arrow } from './shape/2D/arrow/Arrow';
export { Line, Text, Cursor, HTML, Selection, Pencil, Circle, Ellipse, Rectangle, Square, Triangle, EquilateralTriangle, OrthogonalTriangle, Polygon, Star, Pentagon, Hexagon, Clear, Arrow };
export var Plugins;
(function (Plugins) {
    Plugins["Cursor"] = "Cursor";
    Plugins["Line"] = "Line";
    Plugins["Text"] = "Text";
    Plugins["Selection"] = "Selection";
    Plugins["HTML"] = "HTML";
    Plugins["Pencil"] = "Pencil";
    Plugins["Circle"] = "Circle";
    Plugins["Ellipse"] = "Ellipse";
    Plugins["Rectangle"] = "Rectangle";
    Plugins["Square"] = "Square";
    Plugins["Triangle"] = "Triangle";
    Plugins["EquilateralTriangle"] = "EquilateralTriangle";
    Plugins["OrthogonalTriangle"] = "OrthogonalTriangle";
    Plugins["Polygon"] = "Polygon";
    Plugins["Star"] = "Star";
    Plugins["Pentagon"] = "Pentagon";
    Plugins["Hexagon"] = "Hexagon";
    Plugins["Clear"] = "Clear";
    Plugins["Arrow"] = "Arrow";
})(Plugins || (Plugins = {}));
//# sourceMappingURL=index.js.map