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

    getMapSize() {
        return this.tiledMap.getMapSize()
    }

    //tiled map中的坐标轴方向与游戏中的不同
    getCordInTiled(pos: Vec2) {
        const mapSize = this.getMapSize()
        return new Vec2(pos.x, mapSize.height - pos.y - 1)
    }

    getTerrainGID(pos: Vec2) {
        const cord = this.getCordInTiled(pos)
        return this.tiledMap.getLayer("Terrain").getTileGIDAt(cord.x, cord.y)
    }

    getUnitGID(pos: Vec2) {
        const cord = this.getCordInTiled(pos)
        return this.tiledMap.getLayer("Units").getTileGIDAt(cord.x, cord.y)
    }

    getObjectGID(pos: Vec2) {
        const cord = this.getCordInTiled(pos)
        return this.tiledMap.getLayer("Objects").getTileGIDAt(cord.x, cord.y)
    }

    start() {
        //隐藏地图物体层和单位层，实际的地图物体和单位交由Piece添加
        this.node.getChildByName("Objects").active = false
        this.node.getChildByName("Units").active = false
    }

    update(deltaTime: number) {
    }
}


