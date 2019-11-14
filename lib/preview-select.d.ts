import { Mask } from "./mask";
import { PreviewNode } from "./preview-node";
interface PreviewSelectOptions {
    select: string;
    curve?: string;
    duration?: number;
    mask?: Mask;
}
export declare class PreviewSelect {
    static mask: Mask;
    /**
     * ! 无法获取cssText属性
     */
    static toStyle: CSSStyleDeclaration;
    /**
     * * 动画的持续时间, 毫秒为单位
     * * default [1000]
     */
    duration: number;
    /**
     * * 当前执行动画的元素
     */
    curent: PreviewNode;
    /**
     * * 所有需要监听的元素
     */
    nodes: HTMLElement[];
    /**
     * * 动画曲线
     * * default [ease]
     */
    curve: string;
    constructor({ select, duration, curve, mask }: PreviewSelectOptions);
    private setup;
    to(style: CSSStyleDeclaration): PreviewSelect;
}
export {};
