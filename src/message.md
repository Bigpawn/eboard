## 消息

#### 结构设计
* 普通白板消息：普通白板消息即为单frame，在该frame中操作所生成的消息（HtmlFrame、BaseFrame、ImageFrame）,其消息必须包含frame初始化消息，即frame创建对应的type,messageId,container(后面设置为仅一次配置),id(frameId可以设置为===messageId),ratio,scrollbar,... 同时包含操作的必要消息体
* 组合白板消息：组合白板即多个frame组合成的复合frame,在该frame中操作所生成的消息（PdfFrame、ImagesFrame）,其消息必须包含复合frame初始化消息，即当前pageNum和操作的必要消息体

#### 必要消息体
1. 画线（或箭头线）
    * 开始：
        - id：线条实例的id,存放于fabric.Line实例的data中
        - point：{x:number,y:number} 起点位置
        - tag：start 画笔开始
    * 移动：
        - id：线条实例的id,存放于fabric.Line实例的data中
        - point：{x:number,y:number} 移动点位置
        - tag：move 画笔移动
    * 结束：
        - id：线条实例的id,存放于fabric.Line实例的data中
        - point：{x:number,y:number} 结束点位置
        - tag：move 画笔结束
    * 普通白板中消息示例：
    ```json
    {
       id:"",
    
    }
    ```