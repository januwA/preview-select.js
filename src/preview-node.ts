import { Mask } from "./mask";
import {
  createCSSStyleDeclaration,
  setBodyOverflowHidden,
  getPV
} from "./utils";
import { PreviewSelect } from "./preview-select";

interface PreviewEvent {
  (node: PreviewNode): void;
}
export class PreviewNode {
  static zIndex = Mask.zIndex + 1;
  private isOpen: boolean = false;
  private oldProp: CSSStyleDeclaration;

  constructor(public node: HTMLElement, public duration: number) {
    node.addEventListener("click", () => this.handle());
    this.oldProp = createCSSStyleDeclaration();
  }

  private handle() {
    if (this.isOpen) {
      this.reset();
      PreviewSelect.mask.hide();
    } else {
      this.preview();
      PreviewSelect.mask.open();
    }
  }

  private previewEvent!: PreviewEvent;
  /**
   * 开始执行动画时的监听事件
   * @param fn
   */
  previewEventListener(fn: PreviewEvent) {
    this.previewEvent = fn;
  }

  reset() {
    this.isOpen = false;
    const [oldPosition, oldZIndex] = [
      this.oldProp.removeProperty("position"),
      this.oldProp.removeProperty("zIndex")
    ];
    const [currentPosition, currentZIndex] = [
      this.node.style.position,
      this.node.style.zIndex
    ];
    this.node.style.cssText = this.oldProp.cssText;
    this.node.style.position = currentPosition;
    this.node.style.zIndex = currentZIndex;

    setTimeout(() => {
      this.node.style.position = oldPosition;
      this.node.style.zIndex = oldZIndex;
      setBodyOverflowHidden(false);
    }, this.duration);
  }
  preview() {
    if (this.previewEvent) this.previewEvent(this);
    const target = this.node;
    this.oldProp.cssText = target.style.cssText;

    target.style.position = "relative";
    target.style.zIndex = PreviewNode.zIndex.toString();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const w = parseFloat(getPV(target, "width"));
    const h = parseFloat(getPV(target, "height"));
    let x = width / 2 - w / 2 - target.offsetLeft + window.scrollX;
    let y = height / 2 - h / 2 - target.offsetTop + window.scrollY;
    target.style.transform = `translate(${x}px , ${y}px )`;

    if (PreviewSelect.toStyle) {
      for (const key in PreviewSelect.toStyle) {
        const value = PreviewSelect.toStyle[key].toString();
        // 避免[transform]属性的冲突
        if (key === "transform") target.style[key] += value;
        else target.style[key] = value;
      }
    }

    setBodyOverflowHidden(true);
    this.isOpen = true;
  }
}
