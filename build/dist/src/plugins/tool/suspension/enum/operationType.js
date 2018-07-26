/*
 * @Author: Bigpawn
 * @Date: 2018/7/14 11:44
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/14 11:44
 */
export var OperationType;
(function (OperationType) {
    OperationType["\u989C\u8272"] = "color";
    OperationType["\u7EBF\u578B\u7C97\u7EC6"] = "thickness";
    OperationType["\u5B57\u4F53\u5927\u5C0F"] = "fontSize";
    OperationType["\u5B57\u4F53\u7C7B\u578B"] = "fontFamily";
    OperationType["\u8FB9\u6846\u989C\u8272"] = "borderColor";
    OperationType["\u586B\u5145\u8272"] = "fillColor";
    OperationType["\u6837\u5F0F\u7EBF\u578B"] = "strokeDashArray";
    OperationType["\u5B57\u4F53\u52A0\u7C97"] = "fontWeight";
    OperationType["\u5B57\u4F53\u503E\u659C"] = "fontStyle";
})(OperationType || (OperationType = {}));
export var fontFamily = [{
        label: '微软雅黑',
        value: 'Microsoft YaHei'
    }, {
        label: '宋体',
        value: 'SimSun'
    }, {
        label: '黑体',
        value: 'SimHei'
    }, {
        label: '微软正黑体',
        value: 'Microsoft JhengHei'
    }, {
        label: '新宋体',
        value: 'NSimSun'
    }, {
        label: '新细明体',
        value: 'PMingLiU'
    }, {
        label: '细明体',
        value: 'MingLiU'
    }, {
        label: '标楷体',
        value: 'DFKai-SB'
    }, {
        label: '仿宋',
        value: 'FangSong'
    }, {
        label: '楷体',
        value: 'KaiTi'
    }, {
        label: '仿宋_GB2312',
        value: 'FangSong_GB2312'
    }, {
        label: '楷体_GB2312',
        value: 'KaiTi_GB2312'
    }];
var fontSize = [];
for (var i = 11; i < 50; i++) {
    if (i % 2 === 0) {
        fontSize.push({
            label: i,
            value: i
        });
    }
}
export { fontSize };
export var lineWidth = [{
        label: 1,
        value: 1
    }, {
        label: 2,
        value: 2
    }, {
        label: 4,
        value: 4
    }, {
        label: 8,
        value: 8
    }];
export var lineStyle = [{
        label: "solid",
        value: [0, 0]
    }, {
        label: "dotted",
        value: [5, 10]
    }, {
        label: "dashed",
        value: [20, 10]
    }];
//# sourceMappingURL=operationType.js.map