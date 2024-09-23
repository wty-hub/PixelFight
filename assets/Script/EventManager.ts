import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EventManager')
export class EventManager extends Component {

    //单例模式
    private static _instance: EventManager = null
    public static get instance() {
        return this._instance
    }

    protected onLoad(): void {
        EventManager._instance = this
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


