(()=>{"use strict";function t(o){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(o)}function o(t,o){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);o&&(e=e.filter((function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable}))),i.push.apply(i,e)}return i}function i(t){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{};i%2?o(Object(n),!0).forEach((function(o){e(t,o,n[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(n,o))}))}return t}function e(t,o,i){return o in t?Object.defineProperty(t,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[o]=i,t}function n(t,o){for(var i=0;i<o.length;i++){var e=o[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}new(function(){function o(t){!function(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(this,o),this.defaultOptions={animation:"show",position:"center",width:"600px",height:null,speed:250};var e={isOpen:function(){},isClose:function(){},animation:this.defaultOptions.animation,position:this.defaultOptions.position,width:this.defaultOptions.width,height:this.defaultOptions.height,speed:this.defaultOptions.speed};this.options=i(i({},e),t),this.modal=document.querySelector("#modal"),this.modalItem=null,this.nextModalItem=null,this.isOpenModal=!1,this.isCloseModal=!1,this.animation=null,this._modalAnimationNames=["fadeIn","fadeInUp","fadeInDown","fadeInLeft","fadeInRight"],this._modalPositionNames=["top","top-left","top-right","center","center-left","center-right","bottom","bottom-left","bottom-right"],this.position=null,this.width=null,this.height=null,this.speed=this.defaultOptions.speed,this.selectedModal=null,this.selectedBtn=null,this.fixedBlock=document.querySelectorAll(".fixed-block"),this.init()}var e,s,a;return e=o,(s=[{key:"init",value:function(){var t=this,o=this;if(!o.modal)throw new Error("Wrapper for modal window not found");document.addEventListener("click",(function(i){var e=i.target.closest("[data-modal-path]"),n=i.target.closest(".modal-close"),s=i.target.closest(".modal-uninstall-close");if(e){o.selectedBtn=e;var a=e.dataset.modalPath,l=o.modal.querySelector('[data-modal-target="'.concat(a,'"]'));if(!l)throw new Error("Modal window not found");return o.modalItem=l,void o.showModal()}return!i.target.closest(".modal__item")&&o.isOpenModal||n?(o.closeModal(),void(o.isOpenModal=!1)):s?(o.closeModal(),o.isOpenModal=!1,void setTimeout((function(){alert("DONE")}),t.speed)):void 0})),document.addEventListener("keydown",(function(t){"Escape"===t.key&&o.isOpenModal&&o.closeModal()}))}},{key:"showModal",value:function(o){var i=this;this.options.speed?this.speed=this.options.speed:this.speed=this.defaultOptions.speed,getComputedStyle(this.modal).getPropertyValue("--transition-time",this.speed),this.modal.style.setProperty("--transition-time",this.speed+"ms");var e=this.options.isOpen,n=this,s=function(){n.modalItem.classList.add(n.defaultOptions.animation),n.modalItem.classList.add(n.animation),setTimeout((function(){n.modalItem.classList.add("animation-show"),e(n),n.isOpenModal=!0}),n.speed)};if(this.isOpenModal){var a=function(){for(var o=i.modal.querySelectorAll("[data-modal-target]"),e=function(t){if(o[t].classList.contains(i.defaultOptions.animation)){var e=[o[t].getAttribute("data-modal-target"),document.activeElement.getAttribute("data-modal-path")];if(e[0]===e[1])return{v:{v:alert("This modal window is open")}};i.disableScrollElem(),o[t].classList.remove("animation-show"),o[t].classList.remove(i.position),setTimeout((function(){o[t].classList.remove(i.defaultOptions.animation)}),i.speed)}},n=0;n<o.length;n++){var s=e(n);if("object"===t(s))return s.v}}();if("object"===t(a))return a.v}n.modal.classList.add(n.defaultOptions.animation),o&&(this.modalItem=this.modal.querySelector('[data-modal-target="'.concat(o,'"]')),s()),this.modalAnimation(),this.modalPosition(),this.disableScrollElem(),this.modalSize("height"),this.modalSize("width"),s()}},{key:"closeModal",value:function(){var t=this;this.modalItem&&this.modalItem.classList.contains("animation-show")&&this.modalItem.classList.remove("animation-show"),setTimeout((function(){t.modalItem.classList.remove(t.defaultOptions.animation),t.modalItem.classList.remove(t.animation),t.modalItem.classList.remove(t.position),t.modal.classList.remove(t.defaultOptions.animation),t.enableScroll(),t.options.isClose(t)}),this.speed)}},{key:"modalSize",value:function(t){var o,i,e,n=this.options[t];switch(t){case"width":e=null===(o=this.selectedBtn)||void 0===o?void 0:o.dataset.modalWidth;break;case"height":e=null===(i=this.selectedBtn)||void 0===i?void 0:i.dataset.modalHeight}var s=/([0-9]+)(px|\%|vh|rem|em|pt|cm|mm|pc|in)?/gi;this[n]=n?n.match(s)[0]:this.defaultOptions[n],e?this[n]=e.match(s)[0]:this[n],this.modalItem.style[t]=this[n]}},{key:"modalPosition",value:function(){var t,o=this.options.position,i=null===(t=this.selectedBtn)||void 0===t?void 0:t.dataset.modalPosition;switch(this.position=o||this.defaultOptions.position,i?this.position=i:this.defaultOptions.position,this.position){case"center":this.position="position-center";break;case"center-left":this.position="position-center-left";break;case"center-right":this.position="position-center-right";break;case"top":this.position="position-top";break;case"top-left":this.position="position-top-left";break;case"top-right":this.position="position-top-right";break;case"bottom":this.position="position-bottom";break;case"bottom-left":this.position="position-bottom-left";break;case"bottom-right":this.position="position-bottom-right";break;default:this.position="position-center"}this.modalItem.classList.add(this.position)}},{key:"modalAnimation",value:function(){var t,o=this.options.animation,i=this._modalAnimationNames[Math.floor(Math.random()*this._modalAnimationNames.length)],e=null===(t=this.selectedBtn)||void 0===t?void 0:t.dataset.modalAnimation;if(this.animation=e,"random"===o){if(e)return void(this.animation=e);this.animation=i}else"random"===e?this.animation=i:(this.animation=o||this.defaultOptions.animation,this.animation=e||this.defaultOptions.animation)}},{key:"disableScrollElem",value:function(){var t=window.scrollY;this.lockPadding(),document.body.classList.add("disable--scroll"),document.body.dataset.windowPosition=t,document.body.style.top="-".concat(t,"px")}},{key:"enableScroll",value:function(){var t=document.body.dataset.windowPosition;this.unlockPadding(),document.body.classList.remove("disable--scroll"),document.body.style.top="auto",window.scroll({top:t,left:0})}},{key:"lockPadding",value:function(){var t=window.innerWidth-document.body.offsetWidth;document.body.style.boxSizing="border-box",document.body.style.paddingRight="".concat(t,"px"),this.fixedBlock.forEach((function(o){o.style.paddingRight="".concat(t,"px")})),document.body.style.paddingRight="".concat(t,"px")}},{key:"unlockPadding",value:function(){document.body.removeAttribute("data-window-position"),this.fixedBlock.forEach((function(t){t.style.paddingRight="0px"})),document.body.style.paddingRight="0px"}}])&&n(e.prototype,s),a&&n(e,a),o}())({animation:"random",speed:500,position:"center"})})();