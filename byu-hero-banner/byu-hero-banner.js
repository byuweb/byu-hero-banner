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
const ATTR_VIDEO_SRC = 'video-source';

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