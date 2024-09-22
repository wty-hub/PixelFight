/**
 * 触摸点，用以捕获地图点的触摸事件
 */

import { _decorator, Component, EventTouch, Node, Size, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TouchPoint')
export class TouchPoint extends Component {

    private callBack: () => void = null

    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
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
}


