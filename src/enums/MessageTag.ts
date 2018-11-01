/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/23 17:11
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/23 17:11
 * @disc:MessageTag 消息标记
 */
export enum MessageTag{
    CreateFrame=0,
    CreateFrameGroup=1,
    SwitchToFrame=2,
    Clear=3,
    AllowHtmlAction=4,
    DisAllowHtmlAction=5,
    Scroll=6,
    Delete=7,
    Cursor=8,
    SelectionMove=9,
    SelectionScale=10,
    SelectionRotate=11,
    RemoveTab=12,
    Shape=13,
    TurnPage=14,// 翻页
    Paste=15,
    Cut=16,
}