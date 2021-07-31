!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.previewSelect=t():e.previewSelect=t()}(self,(function(){return(()=>{"use strict";var e={781:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mask=void 0;class i{constructor(e){if(this.div=document.createElement("div"),this.isOpen=!1,e){const{duration:t,background:i}=e;this.duration=t,this.background=i}this.background||(this.background="rgba(0, 0, 0, .5)"),this.setup()}setup(){this.div.style.cssText=`\n        position: fixed;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        height: 100vh;\n        overflow: hidden;\n        background: ${this.background};\n        z-index: ${i.zIndex};\n        transition: opacity 1s ease 0s;\n  `,this.hide(),document.body.append(this.div),this.div.addEventListener("click",(()=>this.toggle()))}hide(){this.isOpen=!1,this.div.style.opacity="0",setTimeout((()=>{this.div.style.width="0px"}),this.duration),this.closeEvent&&this.closeEvent()}open(){this.isOpen=!0,this.div.style.width="100%",this.div.style.opacity="1",this.openEvent&&this.openEvent()}toggle(){this.isOpen?this.hide():this.open()}closeEventListener(e){e&&(this.closeEvent=e)}openEventListener(e){e&&(this.openEvent=e)}}t.Mask=i,i.zIndex=1300},855:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PreviewNode=void 0;const s=i(781),n=i(593),o=i(591);class r{constructor(e,t,i){this.node=e,this.duration=t,this.transition=i,this.isOpen=!1,this.handle=()=>{this.isOpen?(this.reset(),o.PreviewSelect.mask.hide()):(this.preview(),o.PreviewSelect.mask.open())},e.addEventListener("click",this.handle),this.oldProp=n.createCSSStyleDeclaration()}previewEventListener(e){this.previewEvent=e}reset(){const[e,t,i]=[this.oldProp.removeProperty("position"),this.oldProp.removeProperty("zIndex"),this.oldProp.removeProperty("transition")],[s,o,r]=[this.node.style.position,this.node.style.zIndex,this.node.style.transition];this.node.style.cssText=this.oldProp.cssText,this.node.style.transition=r,this.node.style.position=s,this.node.style.zIndex=o,setTimeout((()=>{"static"===e.trim()&&(this.node.style.position=e),this.node.style.zIndex=t,this.node.style.transition=i,n.setBodyOverflowHidden(!1),this.isOpen=!1}),this.duration)}preview(){this.previewEvent&&this.previewEvent(this),this.oldProp.cssText=this.node.style.cssText,this.node.style.transition=this.transition,"static"===n.getPV(this.node,"position")&&(this.node.style.position="relative"),this.node.style.zIndex=r.zIndex.toString(),this.update(),this.isOpen=!0}update(){const e=window.innerWidth,t=window.innerHeight,i=parseFloat(n.getPV(this.node,"width")),s=parseFloat(n.getPV(this.node,"height"));let r=e/2-i/2-this.node.offsetLeft+window.scrollX,d=t/2-s/2-this.node.offsetTop+window.scrollY;if(o.PreviewSelect.toStyle)for(const e in o.PreviewSelect.toStyle)isNaN(parseInt(e))&&Object.getOwnPropertyDescriptor(this.node.style,e)&&o.PreviewSelect.toStyle[e]&&(this.node.style[e]="transform"===e?`translate(${r}px , ${d}px) ${o.PreviewSelect.toStyle[e]}`:o.PreviewSelect.toStyle[e],this.node);else this.node.style.transform=`translate(${r}px , ${d}px)`}}t.PreviewNode=r,r.zIndex=s.Mask.zIndex+1},591:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PreviewSelect=void 0;const s=i(781),n=i(855);class o{constructor(e){var t,i,n,r;this.duration=1e3,this.curent=null,this.curve="ease",this.duration=null!==(t=e.duration)&&void 0!==t?t:1e3,this.curve=null!==(i=e.curve)&&void 0!==i?i:"ease",this.nodes=Array.from(document.querySelectorAll(e.select)),o.mask=null!==(n=e.mask)&&void 0!==n?n:new s.Mask,o.mask.duration=null!==(r=e.duration)&&void 0!==r?r:0,this.setup()}setup(){const e=this;o.mask.closeEventListener((()=>{var t;return null===(t=e.curent)||void 0===t?void 0:t.reset()}));for(const e of this.nodes)new n.PreviewNode(e,this.duration,`all ${this.duration}ms ${this.curve} 0s`).previewEventListener((e=>this.curent=e))}to(e){return o.toStyle=e,this}}t.PreviewSelect=o},593:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.setBodyOverflowHidden=t.createCSSStyleDeclaration=t.getPV=void 0,t.getPV=function(e,t){return document.defaultView.getComputedStyle(e,null).getPropertyValue(t)},t.createCSSStyleDeclaration=function(e){const t=document.createElement("div");let i="";if(e)for(const s in e)s in t.style&&(i+=`${s}: ${e[s]}; `);return t.style.cssText=i,t.style},t.setBodyOverflowHidden=function(e){}}},t={};function i(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,i),o.exports}var s={};return(()=>{var e=s;Object.defineProperty(e,"__esModule",{value:!0}),e.Mask=e.PreviewSelect=void 0;var t=i(591);Object.defineProperty(e,"PreviewSelect",{enumerable:!0,get:function(){return t.PreviewSelect}});var n=i(781);Object.defineProperty(e,"Mask",{enumerable:!0,get:function(){return n.Mask}})})(),s})()}));