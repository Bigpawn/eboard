## Canvas 类
* canvas 采用绝对定位，基于父元素填充，铺满父元素
* canvas 显示大小受父元素影响，比例由父元素大小控制
* canvas 画布大小根据比例进行计算，属于动态固定值，同一个比例的情况下值固定不变
* HTMLCanvas 继承自BaseCanvas，实现HTML绘制框架
* PDFCanvas 继承自HTMLCanvas，实现PDF框架
* ImageCanvas 继承自HTMLCanvas，实现图片播放框架
* HTMLCanvas HTML内容高度最小为BaseCanvas高度，高度可以撑大，根据宽度进行缩放
* HTMLCanvas 内容区域按照BaseCanvas 限制，其内部画布和Html区域单独控制，滚动条需要同步
* HTMLCanvas 涉及到元素缩放，太过复杂，暂时简单开发
* 翻页逻辑：
    1. 每一页是一个HTMLCanvas对象
    2. 浏览器仅显示一个HTMLCanvas实例，其他实例自动回收到js runtime内存中，使用时再回复