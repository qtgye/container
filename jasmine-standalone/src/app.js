(function(t){"use strict";var e=0,n=Array.prototype.slice,r=function(e,n){var r=e[n];if(r===t&&L.strict)throw new Error("Bottle was unable to resolve a service.  `"+n+"` is undefined.");return r},i=function(t){return this.nested[t]||(this.nested[t]=M.pop())},o=function(t){return t.split(".").reduce(r,this)},c=function(t,e){var n=t.split(".");return t=n.pop(),s.call(n.reduce(x,this.container),t,e),this},s=function(t,e){Object.defineProperty(this,t,{configurable:!1,enumerable:!0,value:e,writable:!1})},a=function(t,e){var n,r;return"function"==typeof t&&(e=t,t="__global__"),n=t.split("."),r=n.shift(),n.length?i.call(this,r).decorator(n.join("."),e):(this.decorators[r]||(this.decorators[r]=[]),this.decorators[r].push(e)),this},u=function(t){return this.deferred.push(t),this},l=function(t){return(t||[]).map(o,this.container)},f=function(t,e){return C.call(this,t,function(){this.$get=e})},d=function(t,e){return f.call(this,t,function(t){return{instance:e.bind(e,t)}})},p=function(t){return!/^\$(?:register|list)$|Provider$/.test(t)},h=function(t){return Object.keys(t||this.container||{}).filter(p)},v=function(t,e,n,r){var i={configurable:!0,enumerable:!0};return t.length?i.get=function(){var e=0,r=function(i){if(i)throw i;t[e]&&t[e++](n,r)};return r(),n}:(i.value=n,i.writable=!0),Object.defineProperty(r,e,i),r[e]},m=function(t,e){var n,r;return"function"==typeof t&&(e=t,t="__global__"),n=t.split("."),r=n.shift(),n.length?i.call(this,r).middleware(n.join("."),e):(this.middlewares[r]||(this.middlewares[r]=[]),this.middlewares[r].push(e)),this},g={},b=function(t){var e;return t?(e=g[t],e||(g[t]=e=new M,e.constant("BOTTLE_NAME",t)),e):new M},y=function(t){t?delete g[t]:g={}},w=function(t,e){return e(t)},C=function(t,e){var n,r;return n=t.split("."),this.providerMap[t]&&1===n.length&&!this.container[t+"Provider"]?void 0:(this.providerMap[t]=!0,r=n.shift(),n.length?(_.call(this,r,e,n),this):O.call(this,r,e))},j=function(t,e){return(t[e]||[]).concat(t.__global__||[])},O=function(e,n){var r,i,o,c,s,a;return c=this.id,o=this.container,s=this.decorators,a=this.middlewares,r=e+"Provider",i=Object.create(null),i[r]={configurable:!0,enumerable:!0,get:function(){var t=new n;return delete o[r],o[r]=t,t}},i[e]={configurable:!0,enumerable:!0,get:function(){var n,i=o[r];return i&&(n=j(s,e).reduce(w,i.$get(o)),delete o[r],delete o[e]),n===t?n:v(j(a,e),e,n,o)}},Object.defineProperties(o,i),this},_=function(t,e,n){var r;return r=i.call(this,t),this.factory(t,function(){return r.container}),r.provider(n.join("."),e)},$=function(e){var n=e.$value===t?e:e.$value;return this[e.$type||"service"].apply(this,[e.$name,n].concat(e.$inject||[]))},B=function(t){return this.deferred.forEach(function(e){e(t)}),this},A=function(t,e){var r=arguments.length>2?n.call(arguments,2):null,i=this;return f.call(this,t,function(){return r&&(r=r.map(o,i.container),r.unshift(e),e=e.bind.apply(e,r)),new e})},E=function(t,e){var n;return n=t.split("."),t=n.pop(),P.call(n.reduce(x,this.container),t,e),this},x=function(t,e){var n=t[e];return n||(n={},P.call(t,e,n)),n},P=function(t,e){Object.defineProperty(this,t,{configurable:!0,enumerable:!0,value:e,writable:!0})},M=function t(n){return this instanceof t?(this.id=e++,this.decorators={},this.middlewares={},this.nested={},this.providerMap={},this.deferred=[],void(this.container={$register:$.bind(this),$list:h.bind(this)})):t.pop(n)};M.prototype={constant:c,decorator:a,defer:u,digest:l,factory:f,instanceFactory:d,list:h,middleware:m,provider:C,register:$,resolve:B,service:A,value:E},M.pop=b,M.clear=y,M.list=h;var L=M.config={strict:!1},k={function:!0,object:!0};!function(t){var e=k[typeof exports]&&exports&&!exports.nodeType&&exports,n=k[typeof module]&&module&&!module.nodeType&&module,r=n&&n.exports===e&&e,i=k[typeof global]&&global;!i||i.global!==i&&i.window!==i||(t=i),"function"==typeof define&&"object"==typeof define.amd&&define.amd?(t.Bottle=M,define(function(){return M})):e&&n?r?(n.exports=M).Bottle=M:e.Bottle=M:t.Bottle=M}(k[typeof window]&&window||this)}).call(this),function(t){String.prototype.data=t}(function(t){var e=this.toString();if(!is.object(t))return e;var n=e.match(/{{[^{{}}]*}}/g);if(!n||!n.length)return e;var r=n.map(function(e){var n=e.match(/[^{{}}]+/g)[0].trim();return n in t?t[n]:""});return n.forEach(function(t,n){e=e.replace(t,r[n])}),e}),function(t){function e(t){for(key in t)Object.defineProperty(r,key,{value:t[key]});Object.freeze(r)}function n(){i.decorator(function(t){return t.moduleLoaded=!0,t})}var r=t.App=t.App||{},i=new Bottle;e({module:function(t,e,n){if(t in i.container)throw Error("Redefining a module is not allowed.");i.defer(function(t){console.log("defer",t)});var r,o=[].slice.call(arguments),t=o[0],c=[],s=[];Array.isArray(o[1])?(c=c.concat(o[1]),r=o[2]):r=o[1],r.prototype.name=t,s=[t,r].concat(c),i.service.apply(i,s)},get:function(t){return i.container[t]},init:function(){n()}}),t.document&&t.document.addEventListener?document.addEventListener("DOMContentLoaded",r.init):r.init()}(this),describe("Module Operations",function(){it("passing inner constructors",function(){App.module("BaseClass",function(){function t(t){this.componentName=t,this.component=!0}this.getComponentClass=function(){return t}}),App.module("ChildClass",["BaseClass"],function(t){this.components=[],this.ComponentConstructor=t.getComponentClass(),this.createComponent=function(t){var e=new this.ComponentConstructor(t);return this.components.push(e),e}});var t=App.get("ChildClass").createComponent("componentOne");expect(t.componentName).toEqual("componentOne"),expect(t.constructor).toBe(App.get("BaseClass").getComponentClass())})});