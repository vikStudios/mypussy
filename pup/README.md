
# 🎧 audio-visualization-toolkit

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde)
[![](https://data.jsdelivr.com/v1/package/npm/audio-visualization-tool/badge)](https://www.jsdelivr.com/package/npm/audio-visualization-tool)


> Lightweight and customizable audio visualization toolkit build up on web audio api.

> A thin wrapper of Audio Element and Web Audio API.

> It currently uses canvas2D as the graphic engine, I will implement the ability to use Three.js later.
> 

> Demo: https://eggtronic.github.io/web-audio-visualization-tool/
> 
> ![preview](/static/preview.jpg)
---
## ✨ Features
- 🌈 Customizable - provides lifecycle hooks for audio visualization and interaction.
- 🛡 Modularity - use imagination to create your own audio visualization or audio player.
- 📦 Lightweight - only few lines of code.
- 🎨 Ready to go - there are some ready to use hooks implemented for you.
  
## ✨ Useful Libraries
- 🌈 web-audio-beat-detector - use it to detect BPM of the audio
  
--- 
## 🖥 Environment Support
- Currently only support the latest browsers such as Chrome, but will implement the support for more browers in the future.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome |
| --- | --- |
| latest versions | latest versions |

---
## 🔨 Development
> 1. Run `npm install`
> 2. Run `npm run build` to build
> 3. Run `npm run dev` for development

---
## ✨ Basic Usage
> 1. You can install it from npm (unstable) 
>    ```
>    `npm install --save audio-visualization-tool`
>    ```
>
>    You can also get it from cdn in script tag
>    ```
>    <script src='https://cdn.jsdelivr.net/npm/audio-visualization-tool@0.0.1/lib/index.js'></script>
>    ```
> 2. In your html body you need create 2 canvas element and 1 audio element.
```html
    <audio id="myAudio" src="..." data-author="..." data-title="..."></audio>
    <canvas id="myCanvas" width="800" height="400"></canvas>
    <canvas id="myStaticCanvas" width="800" height="400"></canvas>

    <script src='https://cdn.jsdelivr.net/npm/audio-visualization-tool@0.0.2/lib/index.js'></script>
    <script type="module" src='example.js'></script>
```

> 2. Create an example.js file and copy the js code below into it. (you can also use your own name)
> 3. You will need to reference 2 canvas element id and  1 audio element id to init the AudioVisualizer.
> 4. (optional) You can reference your own canvases.
> 5. You can reuse my example style for a better preview (it's in the index.html)

```js
window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  const AudioVisualizer = AudioVisualizeTool.AudioVisualizer;

  const {
    Ripple
  } = AudioVisualizeTool.defaultElements;

  const {
    renderTime,
    renderInfo,
    renderLoading,
    clearLoading,
    renderBackgroundImg,
    renderLounge,
    renderProgressbar,
    renderProgressbarShadow,
    renderSeekBar,
    renderSeekBarShadow,
    bindSeekBarEvent,
    renderPlayControl,
    bindPlayControlEvent,
    renderVolumeBar,
    bindVolumeBarEvent
  } = AudioVisualizeTool.defaultRenderHooks;

  const {
    setCanvasStyle,
    setStaticCanvasStyle
  } = AudioVisualizeTool.defaultInitHooks;

  let ripple = new Ripple();
  let audioVisualizer = new AudioVisualizer({
    autoplay: false,
    loop: true,
    initVolume: 0.5, // 0 to 1;
    fftSize: 512, // the frequency sample size for audio analyzer
    framesPerSecond: 60, // the refresh rate for rendering canvas (not static canvas)

    audio: 'myAudio',
    audioURLs: ['./static/reverie.mp3'], // these urls are for tempo(NPM) detection only

    canvas: 'myCanvas', // main canvas for rendering frames
    canvasStatic: 'myStaticCanvas', // static canvas
    customCanvases: [], // you can add your own canvases

    // customize your theme
    theme: {
      barWidth: 2,
      barHeight: 5,
      barSpacing: 7,
      barColor: '#ffffff',
      shadowBlur: 20, // avoid this attribute for rendering frames, it can reduce the performance
      shadowColor: '#ffffff',
      font: ['12px', 'Helvetica'],
    },

    // hooks contain callbacks just before/after differency lifecycle stage
    // cb in before hooks should return promises
    beforeInitHook: [],
    afterInitHook: [setCanvasStyle, setStaticCanvasStyle],

    beforeLoadAudioHook: [renderLoading],
    afterLoadAudioHook: [clearLoading, renderPlayControl],

    beforeStartHook: [],
    afterStartHook: [],

    beforePauseHook: [],
    afterPauseHook: [renderProgressbar, renderTime, renderSeekBar, renderPlayControl],

    beforeResumeHook: [],
    afterResumeHook: [],

    // you can react to volume change here
    onVolumeChangeHook: [renderVolumeBar],

    // hook for static canvas
    beforeStaticHook: [renderBackgroundImg],
    onStaticHook: [renderProgressbarShadow, renderInfo, renderSeekBarShadow, renderVolumeBar],

    // hooks that will be excuted for each frame
    // used for the main canvas
    onFrameHook: [renderLounge, renderProgressbar, renderTime, renderSeekBar, ripple.render()],

    // you may bind your events here
    onEventHook: [bindPlayControlEvent, bindSeekBarEvent, bindVolumeBarEvent],

    // you may release some resourse here 
    // if loop is ture this hook will not be excuted
    onEndHook: [],
  })
  audioVisualizer.init();
}, false);
```
---
## 🔨 Create Your Own Audio Visualization
> editing...

---
## 🤝 Contributing
> I haven't specified an contributing guide, but I welcome all contributions.
> If you have any questions or ideas just email me.

---
## 📝 Here is my todo list (** means on going)
- [ ] ** NPM upload + cdn
- [ ] ** multiple audio source support
- [ ] ** Refactor to TypeScript
- [ ] ** design object modal for elements on canvas
  - [x] an example of ripple class
  - [ ] create super class for dynamic elements
  - [ ] create super class for static elements
  - [ ] interface for handling mouse events
  - [ ] interface for handling key events
- [ ] ** hover event cursor management
- [ ] ** size - autofit container
- [x] using rollup to pack the tool
- [x] audio load on fly support
- [x] add another layer of canvas for rendering static elements
- [x] class implementation
- [x] include canvas2d as render engine 
- [x] split the lifecycle into serveral stages
- [x] Hooks for lifecycle stages:
  - [x] init stage
  - [x] on start stage
  - [x] on pause stage
  - [x] on resume stage
  - [x] on end stage
  - [x] on volume change
  - [x] render frame stage
  - [x] add async loader for static rendering 
- [ ] add some ready to use renderers (hooks)
  - [x] rounded frequency visualization
  - [x] time visualization
  - [x] progress visualization
    - [x] draggable seeking bar
  - [x] background_image
  - [x] volume control
  - [x] start/pause control
  - [ ] next/previous song button
- [ ] Compatibility across different browsers
- [ ] adding ability to support Three.js
- [ ] typescript support
