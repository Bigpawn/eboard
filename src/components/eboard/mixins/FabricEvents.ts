/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-06 11:11:21
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 21:41:03
 */

/**
 * The module defines high level events in fabric.
 */

/**
 * The operation type indicates path
 * {@link http://fabricjs.com/events }
 */
export enum FabricObservingEventType {

  // Observing these events
  OBJECT_MODIFIED = 'object:modified',

  OBJECT_MOVING = 'object:moving',

  OBJECT_SCALING = 'object:scaling',

  OBJECT_ROTATING = 'object:rotating',

  OBJECT_SKEWING = 'object:skewing',

  OBJECT_MOVED = 'object:moved',

  OBJECT_SCALED = 'object:scaled',

  OBJECT_ROTATED = 'object:rotated',

  OBJECT_SKEWED = 'object:skewed',

  BEFORE_TRANSFORM = 'before:transform',

  BEFORE_SELECTION_CLEARED = 'before:selection:cleared',

  SELECTION_CLEARED = 'selection:cleared',

  SELECTION_CREATED = 'selection:created',

  SELECTION_UPDATED = 'selection:updated',

  MOUSE_UP = 'mouse:up',

  MOUSE_DOWN = 'mouse:down',

  MOUSE_MOVE = 'mouse:move',

  MOUSE_UP_BEFORE = 'mouse:up:before',

  MOUSE_DOWN_BEFORE = 'mouse:down:before',

  MOUSE_MOVE_BEFORE = 'mouse:move:before',

  MOUSE_DBLCLICK = 'mouse:dblclick',

  MOUSE_WHEEL = 'mouse:wheel',

  MOUSE_OVER = 'mouse:over',

  MOUSE_OUT = 'mouse:out',

  DROP = 'drop',

  DRAGOVER = 'dragover',

  DRAGENTER = 'dragenter',

  DRAGLEAVE = 'dragleave',

  AFTER_RENDER = 'after:render',

  ZOOM_AFTER = 'zoom:after',

  // Other available events
  PATH_CREATED = 'path:created',

  OBJECT_ADD = 'object:added',

  OBJECT_REMOVED = 'object:removed',
}

export enum FabricObjectEventType {
  MOVING = 'moving',

  SCALING = 'sacling',

  ROTATING = 'rotating',

  SKEWING = 'skewing',

  MOVED = 'moved',

  SCALED = 'scaled',

  ROTATED = 'rotated',

  SKEWED = 'skewed',

  MOUSEUP = 'mouseup',

  MOUSEDOWN = 'mousedown',

  MOUSEMOVE = 'mousemove',

  MOUSEUP_BEFORE = 'mouseup:before',

  MOUSEDOWN_BEFORE = 'mousedown:before',

  MOUSEMOVE_BEFORE = 'mousemove:before',

  MOUSEDBLCLICK = 'mousedblclick',

  MOUSEWHEEL = 'mousewheel',

  MOUSEOVER = 'mouseover',
  
  MOUSEOUT = 'mouseout',
  
  DROP = 'drop',

  DRAGOVER = 'dragover',

  DRAGENTER = 'dragenter',

  DRAGLEAVE = 'dragleave',

}
/**
 * Zoom event structure.
 */
export interface ZoomEvent {
  oldVpt: number[];
  value: number;
  point: fabric.Point;
  lastVpt: number[]
}