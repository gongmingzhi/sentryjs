// import { Sentry } from '../src/main.js';
import { Sentry } from 'sentryjs';
// import Sentry from 'sentryjs';
import Vue from 'vue/dist/vue.min';

const sentryInstance = new Sentry({
  apikey: 'xxx',
  server: 'http://10.22.22.22',
  path: '/server',
  module: {
    // enable: false,
  },
  delay: 100,
});

sentryInstance.installVuePlugin(Vue);

sentryInstance.send({

})

const createElm = function() {
	const elm = document.createElement('div');
  
  elm.id = 'app';
  document.body.appendChild(elm);
  
  return elm;
};

const createVue = function () {
	const elm = createElm();
  
  return new Vue({
    template: `<div @click="_click">{{'vueDataUndefined'}}<div>
    <div>
      <img src="nonexistentresource" />
    </div>
    `,
    methods: {
    	_click: function () {
        console.log(vueAsyncError);
      }
    }
  }).$mount(elm);
};

// vue test
createVue();

// window test
// console.log(someVarUndefined);

// async test
window.onclick = function () {
  console.log(asyncError);
};

// xhr test
var XHR = new XMLHttpRequest();
XHR.open('GET', 'getNothing');
XHR.send();

// Promise test
(function () {
  Promise.reject('uncaugth promise error');
})();

