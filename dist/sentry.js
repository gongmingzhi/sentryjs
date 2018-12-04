!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";n.r(t);var r={version:"1.0.0",protocol:"https",serverIP:"10.35.93.100",httpsServerPort:"8090",path:"/overseaFE/record/save",sentryGlobalConfig:{enable:!0,window:!0,http:!0,xhr:!0,vue:!0},typeDict:{diy:"000",window:"001",http:"002",xhr:"003",vue:"004",promise:"005"}};function o(e,t,n){if(null===e)return;const r=e[t];e[t]=n(r),e[t].__sentry__=!0,e[t].__orig__=r}function s(e){return"function"==typeof e}function i(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function a(e,t){return Object.assign({},e,t)}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"Sentry",function(){return l});let u=null;class l{constructor(e={}){this.options=e,e.apikey?(u=e.apikey,this.init()):warn("apikey缺失, 无法开启监控")}init(){const e=new p,t=new h,n=new y,r=new f;e.install(r.errorType,r.valid,r.callback),e.install(n.errorType,n.valid,n.callback),t.init()}mergeOptions(e){e.server&&(this.server=e.server),e.path&&(this.path=e.path),e.module?this.enable=a(r.sentryGlobalConfig,e.module):this.enable=r.sentryGlobalConfig}installVuePlugin(e){const t=new d;t.vuePlugin(e,t.send)}send(e){e?"[object Object]"===Object.prototype.toString.call(e)?this.commonModel.send({type:confog.typeDoct.diy,metaData:e}):warn("上报失败, 参数必须为普通对象"):warn("上报失败, 参数为空")}}c(l,"server",`${r.protocol}://${r.serverIP}:${r.httpsServerPort}`),c(l,"path",r.path),c(l,"enable",void 0);class p{constructor(){this.stack=[],this.addErrorEventListener()}install(e,t,n){this.stack.push({type:e,valid:t,callback:n})}addErrorEventListener(){const e=this;window.addEventListener("error",t=>{let n=0,r=e.stack.length;for(;n<r;n++)if(e.stack[n].valid(t)){e.stack[n].callback.call(this,t);break}},!0)}send(e){const t=this.getCommonReportMessage(),n=l.server+l.path;return e=[e].map(e=>a(e,t)),function(e,t){const n=JSON.stringify(t);(new Image).src=encodeURIComponent(e+n)}.call(this,n,e)}getCommonReportMessage(){const e=u,t=r.version,n=window.location&&window.location.href?window.location.href:"";return{apikey:e,title:window.document&&window.document.title?window.document.title:"",url:n,version:t,userAgent:window.navigator&&window.navigator.userAgent?window.navigator.userAgent:""}}}class d extends p{constructor(){super()}formatComponentName(e){if(e.$root===e)return"root instance";let t=e._isVue?e.$options.name||e.$options._componentTag:e.name;return(t?"component <"+t+">":"anonymous component")+(e._isVue&&e.$options.__file?" at "+e.$options.__file:"")}vuePlugin(e,t){const n=this;if(!e||!e.config)return;const o=e.config.errorHandler;e.config.errorHandler=function(e,t,s){let i={message:e.message,stack:e.stack},a={type:r.typeDict.vue,vueMessage:i,componentName:"",lifecycleHook:null};"[object Object]"===Object.prototype.toString.call(t)&&(a.componentName=n.formatComponentName(t)),void 0!==s&&(a.lifecycleHook=s),"function"==typeof o&&o.call(n,e,t,s),n.send(a)}}}class f extends p{constructor(){super(),this.errorType="WindowError"}valid(e){return e.target===window}callback(e){let t={};e.error&&(t.stack=e.error.stack||"no stack",t.name=e.error.name||"no name");const n={type:r.typeDict.window,colno:e.colno||0,lineno:e.lineno||0,message:e.message||"no message",stack:t};this.send(n)}}class y extends p{constructor(){super(),this.errorType="ResourceError"}valid(e){return e.target!==window}callback(e){const t={type:r.typeDict.http,path:function(e){return e.map(e=>window===e?"window":(e.nodeName||"").toLocaleLowerCase())}(e.path).reverse().join(" > "),target:e.target.nodeName.toLocaleLowerCase(),resourceUrl:e.target.src,outerHTML:e.target.outHTML};this.send(t)}}class h extends p{constructor(){super()}init(){this.instrumentBreadcrumbs()}wrap(e,t,n){const r=this;if(function(e){return void 0===e}(t)&&!isFuntion(e))return e;if(s(e)&&(t=e,e=void 0),!s(t))return t;try{if(t.__sentry__)return t;if(t.__sentry_wrapper__)return t.__sentry_wrapper__}catch(e){return t}function o(){let o=[],i=arguments.length,a=!e||e&&!1!==e.deep;for(n&&s(n)&&n.apply(this,arguments);i--;)o[i]=a?r.wrap(e,arguments[i]):arguments[i];try{return t.apply(this,o)}catch(e){throw r._ignoreNextError(),e}}for(var a in t)i(t,a)&&(o[a]=t[a]);return o.prototype=t.prototype,t.__sentry_wrapper__=o,o.__sentry__=!0,o.__orig__=t,o}captureErrorRequest(e){const t=r.typeDict.xhr,n=e.data.method,o=e.data.url,s=e.data.response,i=e.data.status_code;/^4|^5/.test(i.toString())&&-1===o.indexOf(r.path)&&this.send({type:t,method:n,requestUrl:o,response:s,statusCode:i})}instrumentBreadcrumbs(){const e=this;function t(t,n){t in n&&s([n[t]])&&o(n,t,function(n){return e.wrap({mechanism:{type:"istrument",data:{function:t,handler:n&&n.name||"<anonymous>"}}},n)})}if("XMLHttpRequest"in window){const n=window.XMLHttpRequest&&window.XMLHttpRequest.prototype;o(n,"open",function(t){return function(n,r){return function(e){return"[object String]"===Object.prototype.toString.call(e)}(r)&&-1===r.indexOf(e._globalkey)&&(this.__sentry_xhr_={method:n,url:r,status_code:null}),t.apply(this,arguments)}}),o(n,"send",function(n){return function(){let r=this;function i(){if(r.__sentry_xhr_&&4===r.readyState){try{r.__sentry_xhr_.status_code=r.status,r.__sentry_xhr_.response=r.response}catch(e){}e.captureErrorRequest({type:"http",category:"xhr",data:r.__sentry_xhr_})}}const a=["onload","onerror","onprogress"];for(let e=0;e<a.length;e++)t(a[e],r);return"onreadystatechange"in r&&s(r.onreadystatechange)?o(r,"onreadystatechange",function(t){return e.wrap({mechanism:{type:"instrument",data:{function:"onreadystatechange",handler:t&&t.name||"<anonymous>"}}},t,i)}):r.onreadystatechange=i,n.apply(this,arguments)}})}}}}])});
//# sourceMappingURL=sentry.js.map