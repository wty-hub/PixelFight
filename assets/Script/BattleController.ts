import { _decorator, assetManager, Component, loader, Rect } from 'cc';
import { MoveCamera } from './MoveCamera';
import { TMap } from './TMap';
import { ResourceServer } from './ResourceServer';
import { Pieces } from './Pieces';
import { TouchPoints } from './TouchPoints';
const { ccclass, property } = _decorator;

@ccclass('BattleController')
export class BattleController extends Component {
    @property({ type: MoveCamera })
    public moveCamera: MoveCamera = null

    @property({ type: TMap })
    public map: TMap = null

    //单例模式
    private static _instance: BattleController = null
    public static get instance() {
        return this._instance
    }

    protected onLoad(): void {
        BattleController._instance = this;
    }

    start() {
        ResourceServer.instance.init()
        TMap.instance.init()
        const mapSize = TMap.instance.getMapSize()
        const tileSize = TMap.instance.getTileSize()
        const moveRange = new Rect(0, 0, tileSize.width * mapSize.width, tileSize.height * mapSize.height)
        MoveCamera.instance.init(moveRange)
        Pieces.instance.init()
        TouchPoints.instance.init()
    }

    update(deltaTime: number) {

    }
}


