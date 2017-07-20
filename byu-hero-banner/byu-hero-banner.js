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

class ByuHeroBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    //This will stamp our template for us, then let us perform actions on the stamped DOM.
    util.applyTemplate(this, 'byu-hero-banner', template, () => {
      setupSlotListeners(this);
      applyImageSource(this);
    });
  }


  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch(attr) {
      case ATTR_IMG_SRC:
         applyImageSource(this);
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

function setupSlotListeners(component) {
  // let slot = component.shadowRoot.querySelector('#fancy-template');

  // //this will listen to changes to the contents of our <slot>, so we can take appropriate action
  // slot.addEventListener('slotchange', () => {
  // }, false);
}
