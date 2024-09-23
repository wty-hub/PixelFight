/**
 * 棋子（包括单位和地图物体）控制
 */

import { _decorator, Component, Node } from 'cc';
import { Unit } from './Piece/Unit';
const { ccclass, property } = _decorator;

@ccclass('Piece')
export class Piece extends Component {
    private pieces: Unit[] = []

    //单例模式
    private static _instance: Piece = null
    public static get instance() {
        return this._instance
    }

    protected onLoad(): void {
        Piece._instance = this;
    }

    /**
     * 加载地图中的棋子
     */
    loadMap() {
        // let objectGO = 
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


