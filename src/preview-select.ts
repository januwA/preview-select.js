import { Mask } from "./mask";
import { PreviewNode } from "./preview-node";

interface PreviewSelectOptions {
  select: string;
  curve?: string;
  duration?: number;
  mask?: Mask;
}

export class PreviewSelect {
  static mask: Mask;

  static toStyle: CSSStyleDeclaration;

  /**
   * * 动画的持续时间, 毫秒为单位
   * * default [1000]
   */
  public duration: number = 1000;

  /**
   * * 当前执行动画的元素
   */
  public curent!: PreviewNode;

  /**
   * * 所有需要监听的元素
   */
  public nodes: HTMLElement[];

  /**
   * * 动画曲线
   * * default [ease]
   */
  public curve: string = "ease";

  constructor({
    select,
    duration,
    curve,
    mask = new Mask({})
  }: PreviewSelectOptions) {
    if (duration) this.duration = duration;
    if (curve) this.curve = curve;
    this.nodes = Array.from<HTMLElement>(
      document.querySelectorAll<HTMLElement>(select)
    );
    mask.duration = duration;
    PreviewSelect.mask = mask;
    this.setup();
  }

  private setup(): void {
    const self = this;
    PreviewSelect.mask.closeEventListener(() => {
      if (self.curent) self.curent.reset();
    });

    for (const node of this.nodes) {
      new PreviewNode(
        node,
        this.duration,
        `all ${this.duration}ms ${this.curve} 0s`
      ).previewEventListener(node => {
        this.curent = node;
      });
    }
  }

  public to(style: CSSStyleDeclaration): PreviewSelect {
    PreviewSelect.toStyle = style;
    return this;
  }
}
