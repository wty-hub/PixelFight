/**
 * 棋子层（包括单位和地图物体）控制
 */

import { _decorator, Component, instantiate, Node, Prefab, resources, SpriteFrame, Vec2 } from 'cc';
import { PieceUnit } from './Piece/PieceUnit';
import { TMap } from './TMap';
import { UnitType } from './Common';
import { ResourceServer } from './ResourceServer';
const { ccclass, property } = _decorator;

@ccclass('Piece')
export class Piece extends Component {
    @property(Prefab)
    public piecePrefab: Prefab;

    private pos2PieceObject: Map<string, PieceUnit> = new Map()
    private pos2PieceUnit: Map<string, PieceUnit> = new Map()

    private objectNode: Node;   //object层的节点
    private unitNode: Node;     //unit层的节点

    //单例模式
    private static _instance: Piece = null
    public static get instance() {
        return this._instance
    }

    protected onLoad(): void {
        Piece._instance = this;
        this.loadMap()
    }

    /**
     * 加载地图中的棋子
     */
    loadMap() {
        //之前棋子，删除之
        this.pos2PieceObject = new Map()
        this.pos2PieceUnit = new Map()
        this.objectNode = this.node.getChildByName("Objects")
        if (this.objectNode) {
            this.node.removeChild(this.objectNode)
        }
        this.unitNode = this.node.getChildByName("Units")
        if (this.unitNode) {
            this.node.removeChild(this.unitNode)
        }

        this.objectNode = new Node("Objects")
        this.node.addChild(this.objectNode)
        this.unitNode = new Node("Units")
        this.node.addChild(this.unitNode)

        this.loadPieces()
    }

    /**
     * 读取棋子
     */
    loadPieces() {
        const mapSize = TMap.instance.getMapSize()
        for (let x = 0; x < mapSize.width; x++) {
            for (let y = 0; y < mapSize.height; y++) {
                const objectGID = TMap.instance.getObjectGID(new Vec2(x, y))
                if (objectGID !== 0) {
                    console.log(`add object at ${x}, ${y}`)
                    this.addObjectPiece(UnitType.OBJECT, new Vec2(x, y), true, objectGID)
                }
                const getUnitGID = TMap.instance.getUnitGID(new Vec2(x, y))
            }
        }
    }

    addObjectPiece(type: UnitType, initPosition: Vec2, neutral: boolean, spriteFrameIndex: number) {
        let node = instantiate(this.piecePrefab)
        this.objectNode.addChild(node)
        this.pos2PieceObject.set(initPosition.toString(), node.getComponent(PieceUnit))
        node.getComponent(PieceUnit).init(type, initPosition, neutral, spriteFrameIndex)
    }

    start() {
    }

    update(deltaTime: number) {

    }
}


