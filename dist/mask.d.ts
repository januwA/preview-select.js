interface MaskOptions {
    duration?: number;
    background?: string;
}
export declare class Mask {
    /**
     * * 遮罩层的z-index
     */
    static zIndex: number;
    /**
     * * Maks的dom节点
     */
    private div;
    /**
     * * 是否为打开状态
     */
    isOpen: boolean;
    /**
     * * 动画时间
     */
    duration?: number;
    /**
     * * mask的背景颜色
     */
    background?: string;
    constructor(options?: MaskOptions);
    private setup;
    private closeEvent;
    /**
     * * 显示mask
     */
    hide(): void;
    private openEvent;
    /**
     * * 隐藏mask
     */
    open(): void;
    toggle(): void;
    /**
     * * 监听mask的关闭事件
     * @param fn
     */
    closeEventListener(fn: Function): void;
    /**
     * * 监听mask的打开事件
     * @param fn
     */
    openEventListener(fn: Function): void;
}
export {};
