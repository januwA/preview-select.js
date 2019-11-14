interface PreviewEvent {
    (node: PreviewNode): void;
}
export declare class PreviewNode {
    node: HTMLElement;
    duration: number;
    static zIndex: number;
    private isOpen;
    private oldProp;
    constructor(node: HTMLElement, duration: number);
    private handle;
    private previewEvent;
    /**
     * 开始执行动画时的监听事件
     * @param fn
     */
    previewEventListener(fn: PreviewEvent): void;
    reset(): void;
    preview(): void;
}
export {};
