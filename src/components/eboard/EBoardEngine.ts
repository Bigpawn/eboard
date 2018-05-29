/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 23:34:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-29 19:28:33
 */
import {fabric} from 'fabric';
import EBoardCanvas from './EBoardCanvas';

export default class EBoardEngine {
    private eBoardCanvas: EBoardCanvas;

    constructor(wrapper: any, canvasEl: any) {
        this.__initCanvas(wrapper, canvasEl);
    }

    private __initCanvas(wrapper: any, canvasEl: any) {
        this.eBoardCanvas = new EBoardCanvas(canvasEl);
        this.eBoardCanvas.setWidth(wrapper.clientWidth);
        this.eBoardCanvas.setHeight(wrapper.clientHeight);
        fabric.Object.prototype.transparentCorners = false;

        this.eBoardCanvas.clearFreeDrawingBrush();

        // this.eBoardCanvas.on('mouse:over', (e: fabric.IEvent) => {
        //     if (e.target) {
        //         e.target.set('fill', 'red');
        //         this.eBoardCanvas.renderAll();
        //     }
        // });

        // this.eBoardCanvas.on('mouse:out', (e: fabric.IEvent) => {
        //     if (e.target) {
        //         e.target.set('fill', 'green');
        //         this.eBoardCanvas.renderAll();
        //     }
        // });

        // // add random objects
        // for (let i = 15; i--;) {
        //     const dim = fabric.util.getRandomInt(30, 60);
        //     const klass = ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0, 2)];
        //     const options: any = {
        //         top: fabric.util.getRandomInt(0, 600),
        //         left: fabric.util.getRandomInt(0, 600),
        //         fill: 'green',
        //     };
        //     if (klass === 'Circle') {
        //         options.radius = dim;
        //     } else {
        //         options.width = dim;
        //         options.height = dim;
        //     }

        //     let f: any = fabric;
        //     this.eBoardCanvas.add(new f[klass](options));
        // }
    }

    public getEBoardCanvas(): EBoardCanvas {
        return this.eBoardCanvas;
    }
}
