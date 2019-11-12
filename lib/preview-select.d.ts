interface StartCB {
    (node: PreviewNode): void;
}
interface PreviewSelectOptions {
    select: string;
}
declare class Mask {
    static zIndex: number;
    isHide: boolean;
    div: HTMLElement;
    constructor();
    setup(): void;
    closeEvent: Function;
    hide(): void;
    openEvent: Function;
    open(): void;
    toggle(): void;
    closeEventListener(fn: Function): void;
    openEventListener(fn: Function): void;
}
export declare class PreviewSelect {
    static mask: Mask;
    static toStyle: CSSStyleDeclaration;
    curent: PreviewNode;
    nodes: HTMLElement[];
    constructor({ select }: PreviewSelectOptions);
    private setup;
    to(style: CSSStyleDeclaration): PreviewSelect;
}
declare class PreviewNode {
    node: HTMLElement;
    static zIndex: number;
    private isOpen;
    private oldProp;
    constructor(node: HTMLElement);
    private handle;
    private startCB;
    start(fn: StartCB): void;
    resize(): void;
    animeted(): void;
}
export {};
