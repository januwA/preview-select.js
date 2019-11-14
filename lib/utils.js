"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPV(el, prop) {
    return document
        .defaultView.getComputedStyle(el, null)
        .getPropertyValue(prop);
}
exports.getPV = getPV;
function createCSSStyleDeclaration() {
    return document.createElement("div").style;
}
exports.createCSSStyleDeclaration = createCSSStyleDeclaration;
function setBodyOverflowHidden(hidden) {
    // TODO: 滚动条的显示或隐藏，将会引起页面的"跳动"，暂时不处理
    // document.body.style.overflow = hidden ? "hidden" : "auto";
}
exports.setBodyOverflowHidden = setBodyOverflowHidden;
//# sourceMappingURL=utils.js.map