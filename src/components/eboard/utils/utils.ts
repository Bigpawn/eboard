/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 20:02:32
 * @Last Modified by:   Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-28 20:02:32
 */
import * as _ from 'lodash';
import { fabric } from 'fabric';
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  let prototypes = _.map(baseCtors, 'prototype');
  _.defaultsDeep(derivedCtor.prototype, ...prototypes);
}

export function min(values: Array<any>, property: string) {
  return fabric.util.array.min(values, property);
}

export function max(values: Array<any>, property: string) {
  return fabric.util.array.max(values, property);
}
