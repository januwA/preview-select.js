"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Mask = Mask;
/**
 * * 遮罩层的z-index
 */
Mask.zIndex = 1300;
//# sourceMappingURL=mask.js.map