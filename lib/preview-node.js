"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mask_1 = require("./mask");
const utils_1 = require("./utils");
const preview_select_1 = require("./preview-select");
class PreviewNode {
    constructor(node, duration, transition) {
        this.node = node;
        this.duration = duration;
        this.transition = transition;
        this.isOpen = false;
        node.addEventListener("click", () => this.handle());
        this.oldProp = utils_1.createCSSStyleDeclaration();
    }
    handle() {
        if (this.isOpen) {
            this.reset();
            preview_select_1.PreviewSelect.mask.hide();
        }
        else {
            this.preview();
            preview_select_1.PreviewSelect.mask.open();
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
        this.node.style.position = currentPosition;
        this.node.style.zIndex = currentZIndex;
        this.node.style.transition = Currenttransition;
        setTimeout(() => {
            this.node.style.position = oldPosition;
            this.node.style.zIndex = oldZIndex;
            this.node.style.transition = oldTransition;
            utils_1.setBodyOverflowHidden(false);
        }, this.duration);
    }
    preview() {
        if (this.previewEvent)
            this.previewEvent(this);
        const target = this.node;
        this.oldProp.cssText = target.style.cssText;
        target.style.transition = this.transition;
        target.style.position = "relative";
        target.style.zIndex = PreviewNode.zIndex.toString();
        const width = window.innerWidth;
        const height = window.innerHeight;
        const w = parseFloat(utils_1.getPV(target, "width"));
        const h = parseFloat(utils_1.getPV(target, "height"));
        let x = width / 2 - w / 2 - target.offsetLeft + window.scrollX;
        let y = height / 2 - h / 2 - target.offsetTop + window.scrollY;
        target.style.transform = `translate(${x}px , ${y}px )`;
        if (preview_select_1.PreviewSelect.toStyle) {
            for (const key in preview_select_1.PreviewSelect.toStyle) {
                const value = preview_select_1.PreviewSelect.toStyle[key].toString();
                // 避免[transform]属性的冲突
                if (key === "transform")
                    target.style[key] += value;
                else
                    target.style[key] = value;
            }
        }
        utils_1.setBodyOverflowHidden(true);
        this.isOpen = true;
    }
}
exports.PreviewNode = PreviewNode;
PreviewNode.zIndex = mask_1.Mask.zIndex + 1;
//# sourceMappingURL=preview-node.js.map