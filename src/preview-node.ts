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

  constructor(
    public node: HTMLElement,
    public duration: number,
    private transition: string
  ) {
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
    const [oldPosition, oldZIndex, oldTransition] = [
      this.oldProp.removeProperty("position"),
      this.oldProp.removeProperty("zIndex"),
      this.oldProp.removeProperty("transition")
    ];
    const [currentPosition, currentZIndex, Currenttransition] = [
      this.node.style.position,
      this.node.style.zIndex,
      this.node.style.transition
    ];
    this.node.style.cssText = this.oldProp.cssText;
    this.node.style.transition = Currenttransition;
    this.node.style.position = currentPosition;
    this.node.style.zIndex = currentZIndex;

    setTimeout(() => {
      if (oldPosition.trim() === "static") {
        this.node.style.position = oldPosition;
      }
      this.node.style.zIndex = oldZIndex;
      this.node.style.transition = oldTransition;
      setBodyOverflowHidden(false);
      this.isOpen = false;
    }, this.duration);
  }
  preview() {
    if (this.previewEvent) this.previewEvent(this);
    const target = this.node;
    this.oldProp.cssText = target.style.cssText;
    target.style.transition = this.transition;

    if (getPV(target, "position") === "static") {
      target.style.position = "relative";
    }
    target.style.zIndex = PreviewNode.zIndex.toString();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const w = parseFloat(getPV(target, "width"));
    const h = parseFloat(getPV(target, "height"));
    let x = width / 2 - w / 2 - target.offsetLeft + window.scrollX;
    let y = height / 2 - h / 2 - target.offsetTop + window.scrollY;

    if (PreviewSelect.toStyle) {
      for (const key in PreviewSelect.toStyle) {

        // 过滤掉key为number的字段和不可读的字段
        const _isNaN = isNaN(parseInt(key));
        if (_isNaN && Object.getOwnPropertyDescriptor(target.style, key)) {
          const value = PreviewSelect.toStyle[key];
          if (value) {
            // transform是多参数的属性，避免冲突内部动画
            if (key === "transform") {
              target.style[
                key
              ] = `translate(${x}px , ${y}px) ${PreviewSelect.toStyle[key]}`;
            } else {
              target.style[key] = PreviewSelect.toStyle[key];
            }
          }
        }
      }
    } else {
      target.style.transform = `translate(${x}px , ${y}px)`;
    }
    setBodyOverflowHidden(true);
    this.isOpen = true;
  }
}
