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

    //单例模式
    private static _instance: TouchPoints = null
    public static get instance() {
        return this._instance
    }

    protected onLoad(): void {
        TouchPoints._instance = this
    }

    start() {
        //创建所有的触摸点
        const tileSize = TMap.instance.getTileSize()
        const mapSize = TMap.instance.getMapSize()
        for (let x = 0; x < mapSize.width; x++) {
            for (let y = 0; y < mapSize.height; y++) {
                let touchPointGO = instantiate(this.touchPointPrefab)
                touchPointGO.parent = this.node
                let touchPoint = touchPointGO.getComponent(TouchPoint)
                let position = new Vec2(
                    (x + 0.5) * tileSize.width,
                    (y + 0.5) * tileSize.height
                )
                touchPoint.init(position, tileSize, () => {
                    this.onTouchPointLClicked(new Vec2(x, y))
                })
                this.touchPoints.push(touchPoint)
            }
        }
    }

    update(deltaTime: number) {

    }

    onTouchPointLClicked(pos: Vec2) {
        console.log(`onTouchPointLClicked: (${pos.x}, ${pos.y})`)
        console.log(`Terrain GID: ${TMap.instance.getTerrainGID(pos)}`)
        console.log(`Unit GID: ${TMap.instance.getUnitGID(pos)}`)
        console.log(`Object GID: ${TMap.instance.getObjectGID(pos)}`)
    }
}


