import { Mask } from "./mask";
import { PreviewNode } from "./preview-node";
import { createCSSStyleDeclaration } from "./utils";

interface PreviewSelectOptions {
  select: string;
  curve?: string;
  duration?: number;
  mask?: Mask;
}

export class PreviewSelect {
  static mask: Mask;

  /**
   * ! 无法获取cssText属性
   */
  static toStyle: CSSStyleDeclaration;

  /**
   * * 动画的持续时间, 毫秒为单位
   * * default [1000]
   */
  public duration: number = 1000;

  /**
   * * 当前执行动画的元素
   */
  public curent?: PreviewNode | null = null;

  /**
   * * 所有需要监听的元素
   */
  public nodes: HTMLElement[];

  /**
   * * 动画曲线
   * * default [ease]
   */
  public curve: string = "ease";

  constructor(opt: PreviewSelectOptions) {
    this.duration = opt.duration ?? 1000;
    this.curve = opt.curve ?? "ease";
    this.nodes = Array.from<HTMLElement>(
      document.querySelectorAll<HTMLElement>(opt.select)
    );
    PreviewSelect.mask = opt.mask ?? new Mask();
    PreviewSelect.mask.duration = opt.duration ?? 0;
    this.setup();
  }

  private setup(): void {
    const self = this;
    PreviewSelect.mask.closeEventListener(() => self.curent?.reset());

    for (const node of this.nodes) {
      new PreviewNode(
        node,
        this.duration,
        `all ${this.duration}ms ${this.curve} 0s`
      ).previewEventListener((node) => (this.curent = node));
    }
  }

  // public to(style: { [key: string]: string }): PreviewSelect {
  public to(style: CSSStyleDeclaration): PreviewSelect {
    PreviewSelect.toStyle = style;
    return this;
  }
}
