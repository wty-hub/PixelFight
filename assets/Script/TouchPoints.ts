/**
 * 管理触摸点
 */

import { _decorator, Component, instantiate, log, Node, Prefab, Size, TiledMap, Vec2 } from 'cc';
import { TMap } from './TMap';
import { TouchPoint } from './Control/TouchPoint';
const { ccclass, property } = _decorator;

@ccclass('TouchPoints')
export class TouchPoints extends Component {
    @property(Prefab)
    public touchPointPrefab: Prefab = null

    private touchPoints: TouchPoint[] = []
    private tileSize: Size = null
    private layerSize: Size = null;

    //单例模式
    private static _instance: TouchPoints = null
    public static get instance() {
        return this._instance
    }

    protected onLoad(): void {
        TouchPoints._instance = this
    }

    start() {
        this.tileSize = TMap.instance.getTiledMap().getTileSize()
        const terrainLayer = TMap.instance.getTiledMap().getLayer("Terrain")
        this.layerSize = terrainLayer.getLayerSize()
        for (let x = 0; x < this.layerSize.width; x++) {
            for (let y = 0; y < this.layerSize.height; y++) {
                //tiled的默认坐标轴方向与cocos不同
                const c = x
                const r = this.layerSize.height - y - 1
                let touchPointGO = instantiate(this.touchPointPrefab)
                touchPointGO.parent = this.node
                let touchPoint = touchPointGO.getComponent(TouchPoint)
                let position = new Vec2(
                    (x + 0.5) * this.tileSize.width,
                    (this.layerSize.height - y - 0.5) * this.tileSize.height
                )
                touchPoint.init(position, this.tileSize, () => {
                    this.onTouchPointLClicked(new Vec2(c, r))
                })
                this.touchPoints.push(touchPoint)
            }
        }
    }

    update(deltaTime: number) {

    }

    onTouchPointLClicked(cord: Vec2) {
        console.log(`onTouchPointLClicked: (${cord.x}, ${cord.y})`)
        console.log(`Terrain GID: ${TMap.instance.getTerrainGID(cord)}`)
        console.log(`Unit GID: ${TMap.instance.getUnitGID(cord)}`)
        console.log(`Object GID: ${TMap.instance.getObjectGID(cord)}`)
    }
}


