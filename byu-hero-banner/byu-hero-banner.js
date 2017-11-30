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
"use strict";

import template from './byu-hero-banner.html';
import * as util from 'byu-web-component-utils';

const ATTR_IMG_SRC = 'image-source';
const ATTR_VIDEO_ID = 'video-id';

class ByuHeroBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    //This will stamp our template for us, then let us perform actions on the stamped DOM.
    util.applyTemplate(this, 'byu-hero-banner', template, () => {
      setupSlotListeners(this);
      applyImageSource(this);
      applyvideoID(this);
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
      case ATTR_VIDEO_ID:
        applyvideoID(this);
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

  set videoID(value) {
    this.setAttribute(ATTR_VIDEO_ID, value);
  }

  get videoID() {
    if (this.hasAttribute(ATTR_VIDEO_ID)) {
      return this.getAttribute(ATTR_VIDEO_ID);
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

function applyvideoID(component) {

  if (component.videoID && component.videoID != '') {


    let videoBox = component.shadowRoot.querySelector('#player');
    //videoBox.src = component.videoID;

    // Load the YouTube API asynchronously
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create the player object when API is ready

    window.onYouTubeIframeAPIReady = function () {
      let player = new YT.Player(videoBox, {
        videoId: component.videoID,
        playerVars: {
          autoplay: 0, 
          autohide: 1,
          modestbranding: 0,
          rel: 0, 
          showinfo: 0, 
          controls: 0,
          disablekb: 1,
          enablejsapi: 0,
          iv_load_policy: 3
        }
      });
    };

    component.shadowRoot.querySelector('#player').style.display = 'block';
    window.addEventListener('load', vidRescale);
    window.addEventListener('resize', vidRescale);
  }
}

function vidRescale(){

  var w = $(window).width()+200,
    h = $(window).height()+200;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

function setupSlotListeners(component) {
  // let slot = component.shadowRoot.querySelector('#fancy-template');

  // //this will listen to changes to the contents of our <slot>, so we can take appropriate action
  // slot.addEventListener('slotchange', () => {
  // }, false);
}
