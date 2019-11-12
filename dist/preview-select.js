(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.previewSelect = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function getPV(el, prop) {
        return document
            .defaultView.getComputedStyle(el, null)
            .getPropertyValue(prop);
    }
    class Mask {
        constructor() {
            this.isHide = true;
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
        hide() {
            this.isHide = true;
            this.div.style["opacity"] = "0";
            setTimeout(() => {
                this.div.style["width"] = "0px";
                document.body.style["overflow"] = "auto";
            }, 1000);
            if (this.closeEvent)
                this.closeEvent();
        }
        open() {
            document.body.style["overflow"] = "hidden";
            this.isHide = false;
            this.div.style["opacity"] = "1";
            this.div.style["width"] = "100vw";
            if (this.openEvent)
                this.openEvent();
        }
        toggle() {
            if (this.isHide) {
                this.open();
            }
            else {
                this.hide();
            }
        }
        closeEventListener(fn) {
            if (fn) {
                this.closeEvent = fn;
            }
        }
        openEventListener(fn) {
            if (fn) {
                this.openEvent = fn;
            }
        }
    }
    Mask.zIndex = 1300;
    class PreviewSelect {
        constructor({ select }) {
            this.nodes = Array.from(document.querySelectorAll(select));
            this.setup();
        }
        setup() {
            PreviewSelect.mask = new Mask();
            const self = this;
            PreviewSelect.mask.closeEventListener(() => {
                if (self.curent)
                    self.curent.resize();
            });
            for (const node of this.nodes) {
                new PreviewNode(node).start(node => {
                    this.curent = node;
                });
            }
        }
        to(style) {
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
        constructor(node) {
            this.node = node;
            this.isOpen = false;
            node.addEventListener("click", () => this.handle());
            this.oldProp = document.createElement("div").style;
        }
        handle() {
            if (this.isOpen) {
                this.resize();
                PreviewSelect.mask.hide();
            }
            else {
                this.animeted();
                PreviewSelect.mask.open();
            }
        }
        start(fn) {
            this.startCB = fn;
        }
        resize() {
            this.isOpen = false;
            const _a = this.oldProp, { position, zIndex } = _a, _oldProp = __rest(_a, ["position", "zIndex"]);
            this.node.style.cssText = _oldProp.cssText;
            setTimeout(() => {
                this.node.style.position = position;
                this.node.style.zIndex = zIndex;
            }, 1000);
        }
        animeted() {
            if (this.startCB)
                this.startCB(this);
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
            const _a = PreviewSelect.toStyle, { transform } = _a, _toStyle = __rest(_a, ["transform"]);
            target.style.cssText += _toStyle.cssText;
            target.style.transform = `translate(${x}px , ${y}px )` + transform;
            this.isOpen = true;
        }
    }
    PreviewNode.zIndex = Mask.zIndex + 1;

    exports.PreviewSelect = PreviewSelect;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=preview-select.js.map
