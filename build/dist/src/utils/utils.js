/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 20:02:32
 * @Last Modified by:   Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-28 20:02:32
 */
import * as _ from 'lodash';
import { fabric } from 'fabric';
export function applyMixins(derivedCtor, baseCtors) {
    var prototypes = _.map(baseCtors, 'prototype');
    _.defaultsDeep.apply(_, [derivedCtor.prototype].concat(prototypes));
}
export function min(values, property) {
    return fabric.util.array.min(values, property);
}
export function max(values, property) {
    return fabric.util.array.max(values, property);
}
//# sourceMappingURL=utils.js.map