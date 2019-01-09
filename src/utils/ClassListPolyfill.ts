/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/16 9:23
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/16 9:23
 * @disc:ClassList 兼容
 */
if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            const self = this;
            function update(fn:any) {
                return function(value:string) {
                    const classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);
                    
                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }
            
            return {
                add: update(function(classes:string[], index:number, value:string) {
                    if (!~index) {
                        classes.push(value)
                    }
                }),
                remove: update(function(classes:string[], index:number) {
                    if (~index) classes.splice(index, 1);
                }),
                toggle: update(function(classes:string[], index:number, value:string) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),
                contains: function(value:string) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },
                item: function(i:number) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}