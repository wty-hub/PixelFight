/**
 * 支持相机的拖动（即拖动视角）
 */

import { _decorator, Camera, clamp, Component, EventTouch, Node, Rect, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveCamera')
export class MoveCamera extends Component {
    @property({ type: Rect })
    public moveRange: Rect = new Rect(-100, -100, 200, 200)

    @property(Number)
    public moveThreshold: Number = 10   //移动的阈值

    @property(Number)
    public moveSpeed: Number = 1        //移动的速度

    @property(Camera)
    public camera: Camera = null

    private inDrag: boolean = false
    private lastTouchPosition: Vec2 = null

    onLoad() {
        //注册拖动相机相关的回调函数
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
    }

    onTouchStart(event: EventTouch) {
        this.inDrag = true
        this.lastTouchPosition = event.getLocation()
    }

    onTouchMove(event: EventTouch) {
        if (!this.inDrag) return
        let currentPosition = event.getLocation()
        let delta = currentPosition.subtract(this.lastTouchPosition)
        this.lastTouchPosition = event.getLocation()
        this.moveCamera(delta)
    }

    onTouchEnd(event: EventTouch) {
        this.inDrag = false
    }

    onTouchCancel(event: EventTouch) {
        this.inDrag = false
    }

    moveCamera(delta: Vec2) {
        let cameraPosition = this.camera.node.position
        let newPosition = new Vec3(cameraPosition.x - delta.x, cameraPosition.y - delta.y, 0)
        newPosition.x = clamp(newPosition.x, this.moveRange.xMin, this.moveRange.xMax)
        newPosition.y = clamp(newPosition.y, this.moveRange.yMin, this.moveRange.yMax)
        this.camera.node.setPosition(newPosition)
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


