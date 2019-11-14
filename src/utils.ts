export function getPV(el: HTMLElement, prop: string) {
  return document
    .defaultView!.getComputedStyle(el, null)
    .getPropertyValue(prop);
}

export function createCSSStyleDeclaration(style?: {
  [key: string]: string;
}): CSSStyleDeclaration {
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

export function setBodyOverflowHidden(hidden: boolean): void {
  // TODO: 滚动条的显示或隐藏，将会引起页面的"跳动"，暂时不处理
  // document.body.style.overflow = hidden ? "hidden" : "auto";
}
