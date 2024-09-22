import { _decorator, BatchingUtility, Component, Node } from 'cc';
import { MoveCamera } from './MoveCamera';
import { TMap } from './TMap';
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

    }

    update(deltaTime: number) {

    }
}


