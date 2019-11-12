interface StartCB {
  (node: PreviewNode): void;
}
interface PreviewSelectOptions {
  select: string;
}
function getPV(el: HTMLElement, prop: string) {
  return document
    .defaultView!.getComputedStyle(el, null)
    .getPropertyValue(prop);
}

class Mask {
  static zIndex = 1300;
  isHide = true;

  div!: HTMLElement;

  constructor() {
    this.setup();
  }

  setup() {
    this.div = document.createElement("div");
    this.div.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 0px;
        height: 100vh;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);
        z-index: ${Mask.zIndex};
        transition: opacity 1s ease 0s;
    `;
    this.hide();
    document.body.append(this.div);
    this.div.addEventListener("click", () => this.toggle());
  }

  closeEvent!: Function;
  hide() {
    this.isHide = true;
    this.div.style["opacity"] = "0";
    setTimeout(() => {
      this.div.style["width"] = "0px";
      document.body.style["overflow"] = "auto";
    }, 1000);
    if (this.closeEvent) this.closeEvent();
  }

  openEvent!: Function;
  open() {
    document.body.style["overflow"] = "hidden";
    this.isHide = false;
    this.div.style["opacity"] = "1";
    this.div.style["width"] = "100vw";
    if (this.openEvent) this.openEvent();
  }

  toggle() {
    if (this.isHide) {
      this.open();
    } else {
      this.hide();
    }
  }

  closeEventListener(fn: Function) {
    if (fn) {
      this.closeEvent = fn;
    }
  }

  openEventListener(fn: Function) {
    if (fn) {
      this.openEvent = fn;
    }
  }
}

export class PreviewSelect {
  static mask: Mask;
  static toStyle: CSSStyleDeclaration;

  public curent!: PreviewNode;

  public nodes: HTMLElement[];

  constructor({ select }: PreviewSelectOptions) {
    this.nodes = Array.from<HTMLElement>(
      document.querySelectorAll<HTMLElement>(select)
    );

    this.setup();
  }

  private setup(): void {
    PreviewSelect.mask = new Mask();
    const self = this;
    PreviewSelect.mask.closeEventListener(() => {
      if (self.curent) self.curent.resize();
    });

    for (const node of this.nodes) {
      new PreviewNode(node).start(node => {
        this.curent = node;
      });
    }
  }

  public to(style: CSSStyleDeclaration): PreviewSelect {
    let div = document.createElement("div");
    for (const key in style) {
      const element = style[key];
      div.style[key] = element.toString();
    }
    PreviewSelect.toStyle = div.style;
    return this;
  }
}

class PreviewNode {
  static zIndex = Mask.zIndex + 1;
  private isOpen: boolean = false;
  private oldProp: CSSStyleDeclaration;

  constructor(public node: HTMLElement) {
    node.addEventListener("click", () => this.handle());
    this.oldProp = document.createElement("div").style;
  }

  private handle() {
    if (this.isOpen) {
      this.resize();
      PreviewSelect.mask.hide();
    } else {
      this.animeted();
      PreviewSelect.mask.open();
    }
  }

  private startCB!: StartCB;
  start(fn: StartCB) {
    this.startCB = fn;
  }

  resize() {
    this.isOpen = false;
    const { position, zIndex, ..._oldProp } = this.oldProp;

    this.node.style.cssText = _oldProp.cssText;

    setTimeout(() => {
      this.node.style.position = position;
      this.node.style.zIndex = zIndex;
    }, 1000);
  }

  animeted() {
    if (this.startCB) this.startCB(this);
    const target = this.node;
    const w = parseFloat(getPV(target, "width"));
    const h = parseFloat(getPV(target, "height"));

    this.oldProp.cssText = target.style.cssText;

    const width = window.innerWidth;
    const height = window.innerHeight;

    target.style.position = "relative";
    target.style.zIndex = PreviewNode.zIndex.toString();
    let x = width / 2 - w / 2 - target.offsetLeft + window.scrollX;
    let y = height / 2 - h / 2 - target.offsetTop + window.scrollY;

    // 避免[transform]属性的冲突
    const { transform, ..._toStyle } = PreviewSelect.toStyle;

    target.style.cssText += _toStyle.cssText;

    target.style.transform = `translate(${x}px , ${y}px )` + transform;

    this.isOpen = true;
  }
}
