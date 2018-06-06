/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-06 11:11:21
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-06 11:28:58
 */

/**
 * The operation type indicates path
 * {@link http://fabricjs.com/events }
 */
export enum FabricEventType {

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

  // Other available events
  PATH_CREATED = 'path:created',

  OBJECT_ADD = 'object:added',

  OBJECT_REMOVED = 'object:removed'

}