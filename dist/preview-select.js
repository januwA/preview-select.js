(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.previewSelect = {}));
}(this, (function (exports) { 'use strict';

  class Mask {
      constructor(options) {
          /**
           * * Maks的dom节点
           */
          this.div = document.createElement("div");
          /**
           * * 是否为打开状态
           */
          this.isOpen = false;
          if (options) {
              const { duration, background } = options;
              this.duration = duration;
              this.background = background;
          }
          if (!this.background)
              this.background = "rgba(0, 0, 0, .5)";
          this.setup();
      }
      setup() {
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
      /**
       * * 显示mask
       */
      hide() {
          this.isOpen = false;
          this.div.style.opacity = "0";
          setTimeout(() => {
              this.div.style.width = "0px";
          }, this.duration);
          if (this.closeEvent)
              this.closeEvent();
      }
      /**
       * * 隐藏mask
       */
      open() {
          this.isOpen = true;
          this.div.style.width = "100%";
          this.div.style.opacity = "1";
          if (this.openEvent)
              this.openEvent();
      }
      toggle() {
          if (!this.isOpen) {
              this.open();
          }
          else {
              this.hide();
          }
      }
      /**
       * * 监听mask的关闭事件
       * @param fn
       */
      closeEventListener(fn) {
          if (fn) {
              this.closeEvent = fn;
          }
      }
      /**
       * * 监听mask的打开事件
       * @param fn
       */
      openEventListener(fn) {
          if (fn) {
              this.openEvent = fn;
          }
      }
  }
  /**
   * * 遮罩层的z-index
   */
  Mask.zIndex = 1300;
  //# sourceMappingURL=mask.js.map

  function getPV(el, prop) {
      return document
          .defaultView.getComputedStyle(el, null)
          .getPropertyValue(prop);
  }
  function createCSSStyleDeclaration() {
      return document.createElement("div").style;
  }
  //# sourceMappingURL=utils.js.map

  class PreviewNode {
      constructor(node, duration) {
          this.node = node;
          this.duration = duration;
          this.isOpen = false;
          node.addEventListener("click", () => this.handle());
          this.oldProp = createCSSStyleDeclaration();
      }
      handle() {
          if (this.isOpen) {
              this.reset();
              PreviewSelect.mask.hide();
          }
          else {
              this.preview();
              PreviewSelect.mask.open();
          }
      }
      /**
       * 开始执行动画时的监听事件
       * @param fn
       */
      previewEventListener(fn) {
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
          }, this.duration);
      }
      preview() {
          if (this.previewEvent)
              this.previewEvent(this);
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
                  if (key === "transform")
                      target.style[key] += value;
                  else
                      target.style[key] = value;
              }
          }
          this.isOpen = true;
      }
  }
  PreviewNode.zIndex = Mask.zIndex + 1;
  //# sourceMappingURL=preview-node.js.map

  class PreviewSelect {
      constructor({ select, duration, curve, mask = new Mask({}) }) {
          /**
           * * 动画的持续时间, 毫秒为单位
           * * default [1000]
           */
          this.duration = 1000;
          /**
           * * 动画曲线
           * * default [ease]
           */
          this.curve = "ease";
          if (duration)
              this.duration = duration;
          if (curve)
              this.curve = curve;
          this.nodes = Array.from(document.querySelectorAll(select));
          mask.duration = duration;
          PreviewSelect.mask = mask;
          this.setup();
      }
      setup() {
          const self = this;
          PreviewSelect.mask.closeEventListener(() => {
              if (self.curent)
                  self.curent.reset();
          });
          for (const node of this.nodes) {
              node.style.transitionProperty = "all";
              node.style.transitionDuration = `${this.duration}ms`;
              node.style.transitionTimingFunction = this.curve;
              node.style.transitionDelay = "0s";
              new PreviewNode(node, this.duration).previewEventListener(node => {
                  this.curent = node;
              });
          }
      }
      to(style) {
          PreviewSelect.toStyle = style;
          return this;
      }
  }
  //# sourceMappingURL=preview-select.js.map

  exports.Mask = Mask;
  exports.PreviewSelect = PreviewSelect;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=preview-select.js.map
