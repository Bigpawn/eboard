/**
 * The module defines high level events in fabric.
 */
/**
 * The operation type indicates path
 * {@link http://fabricjs.com/events }
 */
export var FabricObservingEventType;
(function (FabricObservingEventType) {
    // Observing these events
    FabricObservingEventType["OBJECT_MODIFIED"] = "object:modified";
    FabricObservingEventType["OBJECT_MOVING"] = "object:moving";
    FabricObservingEventType["OBJECT_SCALING"] = "object:scaling";
    FabricObservingEventType["OBJECT_ROTATING"] = "object:rotating";
    FabricObservingEventType["OBJECT_SKEWING"] = "object:skewing";
    FabricObservingEventType["OBJECT_MOVED"] = "object:moved";
    FabricObservingEventType["OBJECT_SCALED"] = "object:scaled";
    FabricObservingEventType["OBJECT_ROTATED"] = "object:rotated";
    FabricObservingEventType["OBJECT_SKEWED"] = "object:skewed";
    FabricObservingEventType["BEFORE_TRANSFORM"] = "before:transform";
    FabricObservingEventType["BEFORE_SELECTION_CLEARED"] = "before:selection:cleared";
    FabricObservingEventType["SELECTION_CLEARED"] = "selection:cleared";
    FabricObservingEventType["SELECTION_CREATED"] = "selection:created";
    FabricObservingEventType["SELECTION_UPDATED"] = "selection:updated";
    FabricObservingEventType["MOUSE_UP"] = "mouse:up";
    FabricObservingEventType["MOUSE_DOWN"] = "mouse:down";
    FabricObservingEventType["MOUSE_MOVE"] = "mouse:move";
    FabricObservingEventType["MOUSE_UP_BEFORE"] = "mouse:up:before";
    FabricObservingEventType["MOUSE_DOWN_BEFORE"] = "mouse:down:before";
    FabricObservingEventType["MOUSE_MOVE_BEFORE"] = "mouse:move:before";
    FabricObservingEventType["MOUSE_DBLCLICK"] = "mouse:dblclick";
    FabricObservingEventType["MOUSE_WHEEL"] = "mouse:wheel";
    FabricObservingEventType["MOUSE_OVER"] = "mouse:over";
    FabricObservingEventType["MOUSE_OUT"] = "mouse:out";
    FabricObservingEventType["DROP"] = "drop";
    FabricObservingEventType["DRAGOVER"] = "dragover";
    FabricObservingEventType["DRAGENTER"] = "dragenter";
    FabricObservingEventType["DRAGLEAVE"] = "dragleave";
    FabricObservingEventType["AFTER_RENDER"] = "after:render";
    FabricObservingEventType["ZOOM_AFTER"] = "zoom:after";
    // Other available events
    FabricObservingEventType["PATH_CREATED"] = "path:created";
    FabricObservingEventType["OBJECT_ADD"] = "object:added";
    FabricObservingEventType["OBJECT_REMOVED"] = "object:removed";
    FabricObservingEventType["TEXT_CHANGED"] = "text:changed";
})(FabricObservingEventType || (FabricObservingEventType = {}));
export var FabricObjectEventType;
(function (FabricObjectEventType) {
    FabricObjectEventType["MOVING"] = "moving";
    FabricObjectEventType["SCALING"] = "sacling";
    FabricObjectEventType["ROTATING"] = "rotating";
    FabricObjectEventType["SKEWING"] = "skewing";
    FabricObjectEventType["MOVED"] = "moved";
    FabricObjectEventType["SCALED"] = "scaled";
    FabricObjectEventType["ROTATED"] = "rotated";
    FabricObjectEventType["SKEWED"] = "skewed";
    FabricObjectEventType["MOUSEUP"] = "mouseup";
    FabricObjectEventType["MOUSEDOWN"] = "mousedown";
    FabricObjectEventType["MOUSEMOVE"] = "mousemove";
    FabricObjectEventType["MOUSEUP_BEFORE"] = "mouseup:before";
    FabricObjectEventType["MOUSEDOWN_BEFORE"] = "mousedown:before";
    FabricObjectEventType["MOUSEMOVE_BEFORE"] = "mousemove:before";
    FabricObjectEventType["MOUSEDBLCLICK"] = "mousedblclick";
    FabricObjectEventType["MOUSEWHEEL"] = "mousewheel";
    FabricObjectEventType["MOUSEOVER"] = "mouseover";
    FabricObjectEventType["MOUSEOUT"] = "mouseout";
    FabricObjectEventType["DROP"] = "drop";
    FabricObjectEventType["DRAGOVER"] = "dragover";
    FabricObjectEventType["DRAGENTER"] = "dragenter";
    FabricObjectEventType["DRAGLEAVE"] = "dragleave";
    // Text changed.
    FabricObjectEventType["CHANGED"] = "changed";
})(FabricObjectEventType || (FabricObjectEventType = {}));
//# sourceMappingURL=FabricEvents.js.map