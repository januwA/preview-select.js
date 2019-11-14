"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mask_1 = require("./mask");
const preview_node_1 = require("./preview-node");
class PreviewSelect {
    constructor({ select, duration, curve, mask = new mask_1.Mask({}) }) {
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
            new preview_node_1.PreviewNode(node, this.duration).previewEventListener(node => {
                this.curent = node;
            });
        }
    }
    to(style) {
        PreviewSelect.toStyle = style;
        return this;
    }
}
exports.PreviewSelect = PreviewSelect;
//# sourceMappingURL=preview-select.js.map