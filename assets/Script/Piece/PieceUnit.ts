/**
 * 单位（包括地图物体和战斗单位）
 */

import { _decorator, Component, Node, Sprite, SpriteFrame, Vec2 } from 'cc';
import { UnitType } from '../Common';
import { ResourceServer } from '../ResourceServer';
import { TMap } from '../TMap';
import { EventManager } from '../EventManager';
const { ccclass, property } = _decorator;

@ccclass('PieceUnit')
export class PieceUnit extends Component {
    private position: Vec2 = null
    private type: UnitType     //单位类型（地图物体或战斗单位）
    private neutral: boolean   //是否中立（是否有阵营）
    private spriteFrameIndex: number;
    private sprite: Sprite;

    init(type: UnitType, initPosition: Vec2, neutral: boolean, spriteFrameIndex: number) {
        this.type = type
        this.position = initPosition
        //PieceUnit的anchor point 为 (0, 0)
        this.node.setPosition(initPosition.x * TMap.instance.getTileSize().x,
            initPosition.y * TMap.instance.getTileSize().y, 0)
        this.neutral = neutral
        this.spriteFrameIndex = spriteFrameIndex
    }

    protected onLoad(): void {

    }

    start() {
        this.sprite = this.node.getComponent(Sprite)
        EventManager.instance.node.on('spriteFrameLoadingDone', (event) => {
            console.log('spriteFrameLoadingDone')
            this.sprite.spriteFrame = ResourceServer.instance.getSpriteFrame(this.spriteFrameIndex)
        }, this)
    }

    update(deltaTime: number) {

    }
}


