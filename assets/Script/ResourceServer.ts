/**
 * 资源加载
 */

import { _decorator, Component, path, resources, SpriteFrame } from 'cc';
import { EventManager } from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('ResourceServer')
export class ResourceServer extends Component {

    private spriteFrameMap: Map<number, SpriteFrame> = new Map();
    private packageName = 'kenney_tiny-battle';

    //单例模式
    private static _instance: ResourceServer = null
    public static get instance() {
        return this._instance
    }

    protected onLoad(): void {
        ResourceServer._instance = this
    }

    async loadSpriteFrames() {
        try {
            const regex = /tile_(\d+)/
            let spriteFrames = await ResourceServer.loadResDir(path.join(this.packageName, "Tiles"), SpriteFrame);
            (spriteFrames as SpriteFrame[]).forEach(element => {
                const match = element.name.match(regex)
                //这里是因为tiled中的gid从1开始（0表示空格），而资源中的id从0开始
                const index = parseInt(match[1]) + 1
                this.spriteFrameMap.set(index, element)
            });
            EventManager.instance.node.emit('spriteFrameLoadingDone')
            // console.log('spriteFrameLoadingDone')
        } catch (err) {
            console.log(err)
        }
    }

    static loadResDir(url, type) {
        return new Promise((resolve, reject) => {
            resources.loadDir(url, type, (err, resources) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resources);
                }
            });
        })
    }

    static loadRes(url, type) {
        return new Promise((resolve, reject) => {
            resources.load(url, type, (err, resource) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resource);
                }
            });
        });
    }

    getSpriteFrame(index: number) {
        return this.spriteFrameMap.get(index)
    }

    init() {
        this.loadSpriteFrames()
    }

    update(deltaTime: number) {

    }
}

// class MyEvent extends Event {
//     constructor(name: string, bubbles?: boolean, detail?: any) {
//         super(name, bubbles);
//         this.detail = detail;
//     }
//     public detail: any = null;  // 自定义的属性
// }
