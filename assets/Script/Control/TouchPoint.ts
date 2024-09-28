/**
 * 触摸点，用以捕获地图点的触摸事件
 * 同时显示选择框，范围等动态要素
 */

import { _decorator, Component, EventTouch, Node, Size, SpriteFrame, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 触摸点的状态
 */
export enum TouchPointState {
    NONE,   //不显示
    SELECT, //显示选择框
    MOVE,   //显示移动范围
    OTHER,  //
}

@ccclass('TouchPoint')
export class TouchPoint extends Component {

    private callBack: () => void = null
    private state: TouchPointState;
    private selectBox: Node = null
    private moveIndication: Node = null

    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.selectBox = this.node.getChildByName("SelectBox")
        this.selectBox.active = false
        this.moveIndication = this.node.getChildByName("MoveIndication")
        this.moveIndication.active = false
    }

    init(position: Vec2, size: Size, callBack: () => void) {
        this.node.setPosition(position.x, position.y, 0)
        this.node.getComponent(UITransform).setContentSize(size)
        this.callBack = callBack
    }

    onTouchEnd(event: EventTouch) {
        if (this.callBack) {
            this.callBack()
        }
    }
    
    switchState(state: TouchPointState) {
        this.selectBox.active = false
        this.moveIndication.active = false
        switch (state) {
            case TouchPointState.SELECT:
                this.selectBox.active = true
                break;
            case TouchPointState.MOVE:
                this.moveIndication.active = true
            default:
                break;
        }
    }
}


