"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPV(el, prop) {
    return document
        .defaultView.getComputedStyle(el, null)
        .getPropertyValue(prop);
}
exports.getPV = getPV;
function createCSSStyleDeclaration(style) {
    const div = document.createElement("div");
    let cssText = "";
    if (style) {
        for (const key in style) {
            if (key in div.style) {
                const value = style[key];
                cssText += `${key}: ${value}; `;
            }
        }
    }
    div.style.cssText = cssText;
    return div.style;
}
exports.createCSSStyleDeclaration = createCSSStyleDeclaration;
function setBodyOverflowHidden(hidden) {
    // TODO: 滚动条的显示或隐藏，将会引起页面的"跳动"，暂时不处理
    // document.body.style.overflow = hidden ? "hidden" : "auto";
}
exports.setBodyOverflowHidden = setBodyOverflowHidden;
//# sourceMappingURL=utils.js.map