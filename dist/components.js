/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = matchesSelector;
/*
 *  @license
 *    Copyright 2017 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */


function matchesSelector(el, selector) {
    let proto = Element.prototype;
    let actual =
        proto.matches ||
        proto.matchesSelector ||
        proto.mozMatchesSelector ||
        proto.msMatchesSelector ||
        proto.oMatchesSelector ||
        proto.webkitMatchesSelector ||
        function (s) {
            let doc = this.document || this.ownerDocument;
            return doc.querySelectorAll(s).indexOf(this) !== -1;
        };

    return actual.call(el, selector);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__byu_hero_banner_html__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__byu_hero_banner_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__byu_hero_banner_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_byu_web_component_utils__ = __webpack_require__(3);
/**
 *  @license
 *    Copyright 2017 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/





const ATTR_IMG_SRC = 'image-source';
const ATTR_VIDEO_SRC = 'video-source';

class ByuHeroBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    //This will stamp our template for us, then let us perform actions on the stamped DOM.
    __WEBPACK_IMPORTED_MODULE_1_byu_web_component_utils__["a" /* applyTemplate */](this, 'byu-hero-banner', __WEBPACK_IMPORTED_MODULE_0__byu_hero_banner_html___default.a, () => {
      setupSlotListeners(this);
      applyImageSource(this);
      applyVideoSource(this);
    });
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case ATTR_IMG_SRC:
        applyImageSource(this);
        break;
      case ATTR_VIDEO_SRC:
        applyVideoSource(this);
        break;
    }
  }

  set imageSource(value) {
    this.setAttribute(ATTR_IMG_SRC, value);
  }

  get imageSource() {
    if (this.hasAttribute(ATTR_IMG_SRC)) {
      return this.getAttribute(ATTR_IMG_SRC);
    }
    return '';
  }

  set videoSource(value) {
    this.setAttribute(ATTR_VIDEO_SRC, value);
  }

  get videoSource() {
    if (this.hasAttribute(ATTR_VIDEO_SRC)) {
      return this.getAttribute(ATTR_VIDEO_SRC);
    }
    return '';
  }
}

window.customElements.define('byu-hero-banner', ByuHeroBanner);
window.ByuHeroBanner = ByuHeroBanner;

// -------------------- Helper Functions --------------------

function applyImageSource(component) {
  let imageBox = component.shadowRoot.querySelector('div.image-wrapper');
  imageBox.style.backgroundImage = "url('" + component.imageSource + "')";
  // this image is kind of a hack to allow us to use either a css background image
  // or an HTML image for different scenarios, depending on which one works best.
  let hiddenImage = component.shadowRoot.querySelector('#hidden-image');
  hiddenImage.src = component.imageSource;
}

function applyVideoSource(component) {
  if (component.videoSource.includes('youtube')) {
    let id = getParameterByName('v', component.videoSource);
    setYoutubeSource(component, id);
  } else if (component.videoSource.includes('.mp4')) {
    setMp4Source(component);
  }
}

function setYoutubeSource(component, videoId) {
  let videoBox = component.shadowRoot.querySelector('#player');

  // Load the YouTube API asynchronously
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Create the player object when API is ready
  var player;
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player(videoBox, {
      width: '100%',
      height: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 1, 
        autohide: 1,
        modestbranding: 1,
        playsinline: 1,
        rel: 0, 
        showinfo: 0, 
        controls: 0,
        disablekb: 1,
        enablejsapi: 0,
        iv_load_policy: 3,
        fs: 0
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onStateChange
      }
    });
  };

  function onPlayerReady(event) {
    // Limits the amount of black screen before restarting the video
    setInterval(function() {
      var i = (player.getCurrentTime()/player.getDuration())*100;
      // if the video is at least 99% complete, restart the video
      if (i >= 99) player.seekTo(0);
    }, 25);
    player.mute();
    vidRescale(player);
    // This forces it to start playing on mobile devices
    player.playVideo();
  }
  
  function onStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
        // Fade out the starting image
        component.shadowRoot.querySelector('#hidden-image').classList.add('hidden');
        break;
      case YT.PlayerState.ENDED:
        // Use this instead of a looped playlist to prevent loading the video again 
        // limiting a longer black screen in between
        player.playVideo(); 
        break;
    }
  }

  let video = component.shadowRoot.querySelector('#player');
  video.style.display = 'inline';
  video.style.marginLeft = 0;
  
  window.addEventListener('resize', vidRescale);

  function vidRescale() {
    var w = window.innerWidth + 300;
    var h = window.innerHeight + 300;
    if (w / h > 16 / 9) {
      player.setSize(w, w / 16 * 9);
    } else {
      player.setSize(h / 9 * 16, h);
    }
    video.style.left = (window.innerWidth - video.offsetWidth) / 2 + 'px';
  }
}

function setMp4Source(component) {
  let divPlayer = component.shadowRoot.querySelector('#player');
  var video = document.createElement('video');
  video.id = 'player';
  video.classList.add('screen', 'mute');
  video.src = component.videoSource;
  video.autoplay = true;
  video.controls = false;
  video.muted = true;
  video.loop = true;
  video.poster = component.imageSource;
  component.shadowRoot.querySelectorAll('.tv')[0].replaceChild(video, divPlayer);

  vidRescale();
  window.addEventListener('resize', vidRescale);

  // Fade the initial image when the video has enough frames to play
  video.addEventListener("canplay", function(){
    component.shadowRoot.querySelector('#hidden-image').classList.add('hidden');
  });

  function vidRescale() {
    var w = video.parentElement.clientWidth;
    var h = video.parentElement.clientHeight;
    if (w / h > 16 / 9) {
      video.style.width = '100%';
      video.style.height = '';
    } else {
      video.style.width = '';
      video.style.height = '100%';
    }
  }
}

function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setupSlotListeners(component) {

}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__byu_hero_banner_byu_hero_banner_js__ = __webpack_require__(1);
/**
 *  @license
 *    Copyright 2017 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/






/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_templating__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_matchesSelector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_querySelectorSlot__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_createEvent__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__lib_templating__["a"]; });
/* unused harmony reexport matchesSelector */
/* unused harmony reexport querySelectorSlot */
/* unused harmony reexport createEvent */
/**
 * Created by ThatJoeMoore on 2/14/17
 */










/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/*
 *  @license
 *    Copyright 2017 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */


function createEvent(name, detail) {
    if (typeof window.CustomEvent === 'function') {
        return new CustomEvent(name, {detail, cancelable: true, bubbles: true})
    }
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, true, true, detail);
    return evt;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__matchesSelector_js__ = __webpack_require__(0);
/*
 *  @license
 *    Copyright 2017 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */




function querySelectorSlot(slot, selector) {
    let roots = slot.assignedNodes({flatten: true})
        .filter(n => n.nodeType === Node.ELEMENT_NODE);

    for (let i = 0, len = roots.length; i < len; i++) {
        let each = roots[i];
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__matchesSelector_js__["a" /* default */])(each, selector)) {
            return each;
        }
        let child = each.querySelector(selector);
        if (child) {
            return child;
        }
    }
    return null;
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyTemplate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hash_sum__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hash_sum___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hash_sum__);
/*
 *  @license
 *    Copyright 2017 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */




const TEMPLATE_RENDERED_CLASS = 'byu-component-rendered';

function applyTemplate(element, elementName, template, callback) {
    let sum = __WEBPACK_IMPORTED_MODULE_0_hash_sum___default()(template);

    let elSettings = element.__byu_webCommunity_components = element.__byu_webCommunity_components || {};
    if (elSettings.templateHash === sum) {
        //Nothing has changed in the element.  Don't replace the DOM, don't fire the callback.
        return;
    }
    elSettings.templateHash = sum;

    if (window.ShadyCSS && !window.ShadyCSS.nativeShadow) {
        applyTemplateShady(element, elementName, template, callback, sum);
    } else {
        applyTemplateNative(element, template, callback);
    }
}

function applyTemplateShady(element, elementName, template, callback, sum) {
    let templateId = '__byu-custom-element-template_' + elementName + '_' + sum;
    let templateElement = document.head.querySelector('template#' + templateId);
    if (!templateElement) {
        templateElement = document.createElement('template');
        templateElement.id = templateId;
        templateElement.innerHTML = template;
        document.head.appendChild(templateElement);
        ShadyCSS.prepareTemplate(templateElement, elementName);
    }
    if (ShadyCSS.styleElement) {
        ShadyCSS.styleElement(element);
    } else if (ShadyCSS.applyStyle) {
        ShadyCSS.applyStyle(element);
    } else {
        throw new Error('ShadyCSS is not properly defined: no styleElement or applyStyle!');
    }
    let imported = document.importNode(templateElement.content, true);
    let shadow = element.shadowRoot;
    //It'd be nice if we could just diff the DOM and replace what changed between templates, but that might lead to
    // event listeners getting applied twice.  Easier to just clear out the shadow DOM and replace it.
    while (shadow.firstChild) {
        shadow.removeChild(shadow.firstChild);
    }
    shadow.appendChild(imported);
    setTimeout(function() {
        runAfterStamping(element, callback);
    });
}

function applyTemplateNative(element, template, callback) {
    element.shadowRoot.innerHTML = template;
    runAfterStamping(element, callback);
}

function runAfterStamping(element, callback) {
    element.classList.add(TEMPLATE_RENDERED_CLASS);
    if (callback) {
        callback();
    }
}



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "/*!\r\n *  @license\r\n *    Copyright 2017 Brigham Young University\r\n *\r\n *    Licensed under the Apache License, Version 2.0 (the \"License\");\r\n *    you may not use this file except in compliance with the License.\r\n *    You may obtain a copy of the License at\r\n *\r\n *        http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n *    Unless required by applicable law or agreed to in writing, software\r\n *    distributed under the License is distributed on an \"AS IS\" BASIS,\r\n *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n *    See the License for the specific language governing permissions and\r\n *    limitations under the License. \r\n */\n/*!\r\n *  @license\r\n *    Copyright 2017 Brigham Young University\r\n *\r\n *    Licensed under the Apache License, Version 2.0 (the \"License\");\r\n *    you may not use this file except in compliance with the License.\r\n *    You may obtain a copy of the License at\r\n *\r\n *        http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n *    Unless required by applicable law or agreed to in writing, software\r\n *    distributed under the License is distributed on an \"AS IS\" BASIS,\r\n *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n *    See the License for the specific language governing permissions and\r\n *    limitations under the License.\r\n */:host{width:100%;max-height:600px;height:600px;overflow:hidden;position:relative;display:block}.image-wrapper{height:100%;width:100%}#hidden-image{display:none}.text-wrapper ::slotted(*){font-family:Gotham A,Gotham B,Helvetica,sans-serif}.text-wrapper .headline ::slotted(*){font-family:Vitesse A,Vitesse B,Georgia,serif!important}.read-more-link{display:inline-block}.read-more-link ::slotted(.btn),.read-more-link ::slotted(a){margin-bottom:0;font-weight:700!important;vertical-align:middle;touch-action:manipulation;cursor:pointer;border:1px solid transparent;white-space:nowrap;padding:6px 12px;font-size:13px;line-height:1.42857143;border-radius:1px;user-select:none;text-decoration:none!important;min-width:200px;min-height:40px;box-sizing:border-box;display:flex;align-items:center;justify-content:center}:host(.title-only){max-height:400px;height:400px}:host(.title-only) .image-wrapper{background-repeat:no-repeat;background-position:50%;background-size:cover}:host(.title-only) .text-wrapper .headline{font-size:200px!important;position:absolute;left:50%;bottom:0;line-height:135px;transform:translateX(-50%);text-transform:uppercase}:host(.title-only) .text-wrapper .headline ::slotted(*){font-family:Gotham A,Gotham B,Helvetica,sans-serif!important;color:#fff}:host(.video-hero) .image-wrapper{position:absolute;top:0;left:0;z-index:200}:host(.video-hero) #hidden-image{display:inline;position:absolute;z-index:250}:host(.video-hero) .hidden{opacity:0;transition:opacity 2s ease-in-out}:host(.video-hero) .tv{position:absolute;top:0;left:0;z-index:100;background-color:#000;width:100%;height:100%;overflow:hidden}:host(.video-hero) .tv .overlay{position:absolute;z-index:400;width:100%;height:100%;background-image:url(\"/byu-hero-banner/dark.png\");background-repeat:repeat;background-size:auto}:host(.video-hero) .tv .screen{position:absolute;top:0;right:0;bottom:0;left:50%;transform:translateX(-50%);z-index:150;margin:auto;opacity:1;transition:opacity .5s}:host(.video-hero) .tv .screen.active{opacity:1}:host(.full-screen) .image-wrapper{background-size:cover;background-position:50%}:host(.full-screen,.video-hero) .text-wrapper{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-content:center;justify-content:center;text-align:center;box-sizing:border-box;z-index:300}:host(.full-screen,.video-hero) .text-wrapper .text-inner-wrapper{padding:20px;color:#fff}:host(.full-screen,.video-hero) .text-wrapper .headline{font-size:80px;line-height:normal}:host(.full-screen,.video-hero) .text-wrapper .intro-text{margin-top:15px;font-size:18px}:host(.full-screen,.video-hero) .text-wrapper .read-more-link{margin:0 auto;margin-top:50px}:host(.full-screen,.video-hero) .text-wrapper .read-more-link ::slotted(.btn),:host(.full-screen,.video-hero) .text-wrapper .read-more-link ::slotted(a){background-color:#002e5d!important;color:#fff!important}:host(.full-screen,.video-hero) .text-wrapper .read-more-link ::slotted(.btn:hover),:host(.full-screen,.video-hero) .text-wrapper .read-more-link ::slotted(a:hover){background-color:#00152a!important;border-color:#000306!important}:host(.full-screen.dark-image) .text-wrapper .text-inner-wrapper{background:inherit}:host(.full-screen.dark-image) .text-wrapper .headline,:host(.full-screen.dark-image) .text-wrapper .intro-text,:host(.full-screen.dark-image) .text-wrapper .read-more-link{color:#fff}:host(.full-screen.dark-image) .text-wrapper .read-more-link ::slotted(.btn),:host(.full-screen.dark-image) .text-wrapper .read-more-link ::slotted(a){background-color:#fff!important;color:#002e5d!important;border-color:#767676!important}:host(.side-image){background-color:initial;display:flex;margin:0 auto;max-width:1200px;padding:0 16px;box-sizing:border-box;height:auto;align-items:center;justify-content:center}:host(.side-image) .image-wrapper{height:414px;width:100%;background-size:contain;background-repeat:no-repeat;background-position:50%}:host(.side-image) .text-wrapper{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;text-align:left;box-sizing:border-box;margin-left:50px}:host(.side-image) .text-wrapper .headline{color:#002e5d;font-size:60px;line-height:normal}:host(.side-image) .text-wrapper .intro-text{margin-top:15px;font-size:18px;line-height:30px}:host(.side-image) .text-wrapper .read-more-link{margin-top:20px}:host(.side-image) .text-wrapper .read-more-link ::slotted(.btn),:host(.side-image) .text-wrapper .read-more-link ::slotted(a){background-color:#002e5d!important;color:#fff!important}:host(.side-image) .text-wrapper .read-more-link ::slotted(.btn:hover),:host(.side-image) .text-wrapper .read-more-link ::slotted(a:hover){background-color:#00152a!important;border-color:#000306!important}:host(.transparent-overlay) .image-wrapper{width:100%;height:100%;background-size:cover;background-position:50%}:host(.transparent-overlay) .text-wrapper{height:100%;max-width:1200px;margin:0 auto;margin-top:-600px;padding:0 16px;box-sizing:border-box;display:flex;justify-content:flex-start}:host(.transparent-overlay) .text-wrapper .text-inner-wrapper{width:400px;height:80%;margin-top:60px;background-color:hsla(0,0%,100%,.8);padding:0 30px;display:flex;flex-direction:column;justify-content:center;text-align:left;box-sizing:border-box}:host(.transparent-overlay) .text-wrapper .headline{color:#002e5d;font-size:60px;line-height:normal}:host(.transparent-overlay) .text-wrapper .intro-text{margin-top:15px;font-size:18px;line-height:30px}:host(.transparent-overlay) .text-wrapper .read-more-link{margin-top:20px;align-self:center}:host(.transparent-overlay) .text-wrapper .read-more-link ::slotted(.btn),:host(.transparent-overlay) .text-wrapper .read-more-link ::slotted(a){background-color:#002e5d!important;color:#fff!important}:host(.transparent-overlay) .text-wrapper .read-more-link ::slotted(.btn:hover),:host(.transparent-overlay) .text-wrapper .read-more-link ::slotted(a:hover){background-color:#00152a!important;border-color:#000306!important}:host(.transparent-overlay.right) .text-wrapper{justify-content:flex-end}@media (max-width:1440px){:host(.title-only){max-height:320px}:host(.title-only) .text-wrapper .headline{font-size:160px!important;line-height:108px}}@media (max-width:1224px){:host(.title-only){max-height:280px}:host(.title-only) .text-wrapper .headline{font-size:130px!important;line-height:88px}}@media (max-width:1024px){:host(.title-only){max-height:220px}:host(.title-only) .text-wrapper .headline{font-size:98px!important;line-height:66px}:host(.full-screen){height:768px}:host(.full-screen) .text-wrapper .text-inner-wrapper .headline{font-size:55px;line-height:60px}:host(.full-screen) .text-wrapper .text-inner-wrapper .intro-text{font-size:16px}:host(.side-image) .image-wrapper{height:216px}:host(.side-image) .text-wrapper .text-inner-wrapper .headline{font-size:35px;line-height:37px}:host(.side-image) .text-wrapper .text-inner-wrapper .intro-text{font-size:14px;line-height:22px}:host(.transparent-overlay){height:768px}:host(.transparent-overlay) .text-wrapper{height:auto;max-width:100%;width:100%;padding:0;position:absolute;bottom:0;left:0}:host(.transparent-overlay) .text-wrapper .text-inner-wrapper{width:100%;height:100%;padding:30px}:host(.transparent-overlay) .text-wrapper .text-inner-wrapper .headline{font-size:35px;line-height:37px}:host(.transparent-overlay) .text-wrapper .text-inner-wrapper .intro-text{font-size:14px;line-height:22px}}@media (max-width:768px){:host(.title-only){max-height:190px}:host(.title-only) .text-wrapper .headline{font-size:78px!important;line-height:52px}}@media (max-width:616px){:host(.title-only){max-height:120px}:host(.title-only) .text-wrapper .headline{font-size:55px!important;line-height:36px}:host(.side-image){height:auto;max-height:none;padding:0;display:block}:host(.side-image) .image-wrapper{background:none!important;height:auto}:host(.side-image) .image-wrapper #hidden-image{display:block;width:100%}:host(.side-image) .text-wrapper{margin-top:20px;margin-left:0;height:auto;padding:0 20px}:host(.side-image) .text-wrapper .read-more-link{margin-top:20px}}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function pad (hash, len) {
  while (hash.length < len) {
    hash = '0' + hash;
  }
  return hash;
}

function fold (hash, text) {
  var i;
  var chr;
  var len;
  if (text.length === 0) {
    return hash;
  }
  for (i = 0, len = text.length; i < len; i++) {
    chr = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash < 0 ? hash * -2 : hash;
}

function foldObject (hash, o, seen) {
  return Object.keys(o).sort().reduce(foldKey, hash);
  function foldKey (hash, key) {
    return foldValue(hash, o[key], key, seen);
  }
}

function foldValue (input, value, key, seen) {
  var hash = fold(fold(fold(input, key), toString(value)), typeof value);
  if (value === null) {
    return fold(hash, 'null');
  }
  if (value === undefined) {
    return fold(hash, 'undefined');
  }
  if (typeof value === 'object') {
    if (seen.indexOf(value) !== -1) {
      return fold(hash, '[Circular]' + key);
    }
    seen.push(value);
    return foldObject(hash, value, seen);
  }
  return fold(hash, value.toString());
}

function toString (o) {
  return Object.prototype.toString.call(o);
}

function sum (o) {
  return pad(foldValue(0, o, '', []).toString(16), 8);
}

module.exports = sum;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<style>" + __webpack_require__(7) + "</style> <div class=\"image-wrapper\"> <img class=\"hidden-image\" id=\"hidden-image\"> <div class=\"tv\"> <div class=\"overlay\"></div> <div id=\"player\" class=\"screen mute\"></div> </div> </div> <div class=\"text-wrapper\"> <div class=\"text-inner-wrapper\"> <div class=\"headline slot-wrapper\"> <slot id=\"headline\" name=\"headline\"></slot> </div> <div class=\"intro-text slot-wrapper\"> <slot id=\"intro-text\" name=\"intro-text\"></slot> </div> <div class=\"read-more-link slot-wrapper\"> <slot id=\"read-more\" name=\"read-more\"></slot> </div> </div> </div>";

/***/ })
/******/ ]);
//# sourceMappingURL=components.js.map