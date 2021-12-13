window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let audioVisualizer;
  player();
  let root = document.querySelector('.vz-wrapper'),
    audio = root.querySelectorAll('.track'),
    prev = root.querySelector('.prev'),
    next = root.querySelector('.next'),
    i = 0;
  prev.addEventListener('click', back);
  next.addEventListener('click', go);

  function back() {
    audio[i].classList.remove('play');
    i--;
    if (i < 0) {
      i = audio.length - 1;
    }
    audio[i].classList.add('play');
    audioVisualizer.audio = audio[i];
  }
  function go() {
    audio[i].classList.remove('play');
    i++;

    if (i >= audio.length) {
      i = 0;
    }
    audio[i].classList.add('play');
    audioVisualizer.audio = audio[i];
  }

  function player() {

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

    audioVisualizer = new AudioVisualizer({
      autoplay: false,
      loop: true,
      initVolume: 0.5, // 0 to 1;

      // the frequency sample size for audio analyzer
      // Must be a power of 2 between 25 and 215, like 32, 64, 128, 256, 512, 1024, 2048,
      // Defaults to 512.
      fftSize: 512,

      // the refresh rate for rendering canvas (not static canvas)
      framesPerSecond: 60,

      audio: '.play',

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
        shadowColor: '#444',
        font: ['14px', 'Helvetica'],
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
    console.log(audioVisualizer.audio); /// смена атрибутов !!! 
  }
}, false);

