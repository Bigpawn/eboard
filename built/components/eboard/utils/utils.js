/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 20:02:32
 * @Last Modified by:   Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-28 20:02:32
 */
import * as _ from 'lodash';
export function applyMixins(derivedCtor, baseCtors) {
    var prototypes = _.map(baseCtors, 'prototype');
    _.defaultsDeep.apply(_, [derivedCtor.prototype].concat(prototypes));
}
//# sourceMappingURL=utils.js.map