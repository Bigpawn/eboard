export declare interface IFrameMessageInterface{
    initializeAction(initParams?:any):any;
    destroyAction(destroyParams?:any):any;
}

export declare interface IFrameGroupMessageInterface{
    initializeAction(initParams?:any):any;
    destroyAction(destroyParams?:any):any;
    switchFrameAction(switchParams?:any):any;
}

export declare interface IPluginMessageInterface{
    startAction(startParams?:any):any;
    moveAction(moveParams?:any):any;
    endAction(endParams?:any):any;
}