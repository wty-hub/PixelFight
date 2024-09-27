/**
 * 管理单位属性的定义
 */

import { _decorator, assert, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DefineManager')
export class DefineManager extends Component {
    //单例模式
    private static _instance: DefineManager = null
    public static get instance() {
        return this._instance
    }

    loadDefines() {
        
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


