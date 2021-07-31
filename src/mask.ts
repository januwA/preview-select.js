interface MaskOptions {
  duration?: number;
  background?: string;
}

export class Mask {
  /**
   * * 遮罩层的z-index
   */
  static zIndex = 1300;

  /**
   * * Maks的dom节点
   */
  private div: HTMLElement = document.createElement("div");

  /**
   * * 是否为打开状态
   */
  public isOpen: boolean = false;

  /**
   * * 动画时间
   */
  public duration?: number;

  /**
   * * mask的背景颜色
   */
  public background?: string;

  constructor(options?: MaskOptions) {
    if (options) {
      const { duration, background } = options;
      this.duration = duration;
      this.background = background;
    }
    if (!this.background) this.background = "rgba(0, 0, 0, .5)";
    this.setup();
  }

  private setup() {
    this.div.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        overflow: hidden;
        background: ${this.background};
        z-index: ${Mask.zIndex};
        transition: opacity 1s ease 0s;
  `;
    this.hide();
    document.body.append(this.div);
    this.div.addEventListener("click", () => this.toggle());
  }

  private closeEvent!: Function;

  /**
   * * 显示mask
   */
  hide() {
    this.isOpen = false;
    this.div.style.opacity = "0";
    setTimeout(() => {
      this.div.style.width = "0px";
    }, this.duration);
    if (this.closeEvent) this.closeEvent();
  }

  private openEvent!: Function;
  /**
   * * 隐藏mask
   */
  open() {
    this.isOpen = true;
    this.div.style.width = "100%";
    this.div.style.opacity = "1";
    if (this.openEvent) this.openEvent();
  }

  toggle() {
    if (!this.isOpen) {
      this.open();
    } else {
      this.hide();
    }
  }

  /**
   * * 监听mask的关闭事件
   * @param fn
   */
  closeEventListener(fn: Function) {
    if (fn) {
      this.closeEvent = fn;
    }
  }

  /**
   * * 监听mask的打开事件
   * @param fn
   */
  openEventListener(fn: Function) {
    if (fn) {
      this.openEvent = fn;
    }
  }
}
