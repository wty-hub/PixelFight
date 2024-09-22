/**
 * tiledmap 管理器
 * 管理 tiledmap 数据
 */

import { _decorator, Camera, Component, EventTouch, log, Node, SpriteFrame, Texture2D, TiledMap, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TMap')
export class TMap extends Component {

    @property(Camera)
    public camera: Camera = null

    private tiledMap: TiledMap = null
    private uiTransform: UITransform = null

    //单例模式
    private static _instance: TMap = null
    public static get instance() {
        return this._instance
    }

    protected onLoad(): void {
        TMap._instance = this;
        this.tiledMap = this.node.getComponent(TiledMap)
    }

    onTouchEnd(event: EventTouch) {
        let touchLocation = event.getLocation()
        this.handleTileClick(touchLocation)
    }

    handleTileClick(touchLocation: Vec2) {
    }

    getTiledMap() {
        return this.tiledMap
    }

    getTerrainGID(pos: Vec2) {
        return this.tiledMap.getLayer("Terrain").getTileGIDAt(pos.x, pos.y)
    }

    getUnitGID(pos: Vec2) {
        return this.tiledMap.getLayer("Units").getTileGIDAt(pos.x, pos.y)
    }

    getObjectGID(pos: Vec2) {
        return this.tiledMap.getLayer("Objects").getTileGIDAt(pos.x, pos.y)
    }

    start() {
    }

    update(deltaTime: number) {
    }
}


