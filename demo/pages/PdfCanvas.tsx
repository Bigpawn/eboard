import * as React from 'react';
import Card from 'antd/es/card';
import SimpleCanvas from './SimpleCanvas';
import {EBoardInstance} from './EBoardInstance';
import {Authority, FrameType} from '../../src/enums/SDKEnum';

class MaterialUIPage extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        eBoard.addPdfFrame({
            type:FrameType.Pdf,
            url:"https://res2dev.9itest.com/resource2/1000/document/20190404/d6e7818316644e7c82191d298a0c5345.pdf",
            pageNum:1,
        });
    }
    public render() {
        return (
            <Card bordered title="PdfCanvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"100%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                </div>
            </Card>
        );
    }
}

export default MaterialUIPage;
