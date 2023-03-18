// enJin Audio Module
class AudioController {
  constructor(debug) {
    this._audioArray = [];
    this._fxAudioArray = [];
    this.sampleCount = 0;
    this.loadedIndex = 0;
    this.debug = debug;
    this.muted = false;

    // Confirm in console that module has been included
    console.log('%c 🔊 Audio module active', 'color: #ff730f');
  }

  // Load the audio array and process
  load(array) {
    this._audioArray = array;
    this.process(this._audioArray);
  }

  process(audioArray) {
    if (audioArray.length == 0) {
      console.warn('No audio array or audio array empty');
    }

    audioArray.forEach(function (aud, index) {
      if (aud.stack != undefined) {
        this.sampleCount += aud.stack;
      } else {
        this.sampleCount += 1;
      }
    }.bind(this));

    // Create a global audio array
    this._globalAudio = [];

    // Iterate through all our samples
    audioArray.forEach(function (aud, index) {
      if (aud.stack != undefined) {
        this.stack = aud.stack;
      } else {
        this.stack = 1;
      }

      // If the type of audio is not background music, stack it and play based on an index,
      // This means you can play small samples very quickly. You cannot play the same audio
      // Object until the current object has finished

      var audioObject = [];

      let a = new Audio();
      let b;
      a.preload = true;
      a.src = aud.source;

      for (var i = 0; i < this.stack; i++) {
        b = new Audio();
        b.src = a.src;

        b.setAttribute('volume', 1);

        var that = this;

        b.onloadeddata = function () {
          this.loadedIndex++;
          this.progress = Math.ceil(this.loadedIndex / this.sampleCount * 100);

          if (that.debug) {
            console.log(`Loading ${audioArray.length} audio sample(s)`);
            console.log(`Loading ${aud.name}`);
            console.log(`${this.progress}%`);
          }

          if (this.progress == 100) {
            this.onLoaded();
          }

        }.bind(this);

        audioObject.push(b);
      }

      audioObject.index = 0;
      audioObject.maxIndex = this.stack;

      this._globalAudio[aud.name] = audioObject;

    }.bind(this));
  }

  // Set the volume of an audio sample
  setVolume(audio, volume) {
    let sample = this._globalAudio[audio];
    let vol = volume / 100;

    sample.forEach(function (s) {
      s.volume = vol;
      s.setAttribute('volume', vol);
    });
  }

  // Play the specified audio sample
  play(audio, loop = false) {

    let sample = this._globalAudio[audio];

    if (sample != undefined) {
      // Get the current audio object in the stack
      let index = sample.index;
      let aud = sample[index];

      // Play the audio object
      aud.loop = loop;
      aud.play();


      // Increase the stack index or reset if it exceeds the max stack size
      if (sample.index > sample.maxIndex - 2) {
        sample.index = 0;
      } else {
        sample.index++;
      }
    } else {
      console.warn(`${audio} does not exist.`);
    }
  }

  // Stop the specified audio sample and reset its time
  stop(audio) {
    let sample = this._globalAudio[audio];

    if (sample != undefined) {
      // Get the current audio object in the stack
      let index = sample.index;
      let aud = sample[index];

      // Stop the audio object
      aud.pause();
      aud.currentTime = 0;
    }
  }

  // Stop all playing audio samples
  stopAll() {
    Object.keys(this._globalAudio).forEach(function (key) {
      this._globalAudio[key].forEach(function (aud) {
        aud.pause();
        aud.currentTime = 0;
      });
    }.bind(this));
  }

  // Restart the audio sample by pausing, setting time to 0 and playing again
  restart(audio) {
    let sample = this._globalAudio[audio];

    if (sample != undefined) {
      // Get the current audio object in the stack
      let index = sample.index;
      let aud = sample[index];

      // Stop the audio object
      aud.pause();
      aud.currentTime = 0;
      aud.play();
    }
  }

  // Pause the specified audio
  pause(audio) {
    let sample = this._globalAudio[audio];

    if (sample != undefined) {
      // Get the current audio object in the stack
      let index = sample.index;
      let aud = sample[index];

      // Stop the audio object
      aud.pause();
      console.log(aud);
    }
  }

  // Destroy an audio sample to save memory
  destroy(audio) {
    this._globalAudio[audio] = undefined;
  }

  // Mute a specific sample
  mute(audio) {
    let sample = this._globalAudio[audio];

    sample.forEach(function (s) {
      s.volume = 0;
    });
  }

  // Mute a specific sample
  unmute(audio) {
    let sample = this._globalAudio[audio];

    sample.forEach(function (s) {
      console.log(s.getAttribute('volume'));
      s.volume = s.getAttribute('volume');
    });
  }

  globalMute() {
    Object.keys(this._globalAudio).forEach(function (key) {
      this._globalAudio[key].forEach(function (aud) {
        aud.volume = 0;
      });
    }.bind(this));

    let all = document.querySelector("audio");
    all.volume = 0;
  }

  globalUnmute() {
    Object.keys(this._globalAudio).forEach(function (key) {
      this._globalAudio[key].forEach(function (aud) {
        aud.volume = aud.getAttribute('volume');
      });
    }.bind(this));

    let all = document.querySelector("audio");
    all.volume = 1;
  }

  globalMuteToggle() {
    if (!this.muted) {
      this.globalMute();
    } else {
      this.globalUnmute();
    }
    this.muted = !this.muted;
  }

  list() {
    Object.keys(this._globalAudio).forEach(function (key) {
      console.log('%c' + key, 'font-weight: bold; color: green');
    }.bind(this));
  }

  onLoaded() {
    if (this.debug) {
      console.log('All audio loaded');
    }
  }

  // =========================================

  setFilterType(type) {
    if (this.biquadFilter) {
      this.biquadFilter.type = type;
    }
  }

  setFrequency(frequency) {
    if (this.biquadFilter) {
      this.biquadFilter.frequency.value = frequency;
    }
  }

  playPostProcessed(audio) {
    this._fxAudioArray[audio].loop = true;
    this._fxAudioArray[audio].play();
  }

  createAnalyser(dialogueElem, bgAudioElem) {
    if (!this.analyser) {
      this.dialogue = document.getElementsByClassName(dialogueElem)[0];
      this.bgAudio = document.getElementsByClassName(bgAudioElem)[0];

      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      this.analyser = this.audioCtx.createAnalyser();
      this.dialogueSource = this.audioCtx.createMediaElementSource(this.dialogue);
      this.dialogueSource.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
      this.analyser.fftSize = 32;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.frequencyData = new Uint8Array(this.bufferLength);


      this.bgSource = this.audioCtx.createMediaElementSource(this.bgAudio);
      this.biquadFilter = this.audioCtx.createBiquadFilter();
      this.biquadFilter.frequency.value = 3000;

      // Connect the source to the lowpass filter
      this.bgSource.connect(this.biquadFilter);

      // Connect the lowpass filter to the output (speaker)
      this.biquadFilter.connect(this.audioCtx.destination);

      this.drawWaveform();
    }
  }

  drawWaveform() {
    var that = this;

    setInterval(function () {
      that.analyser.getByteFrequencyData(that.frequencyData);

      for (let i = 0; i < 4; i++) {
        document.querySelectorAll('.equaliser_part')[i].getElementsByClassName('equaliser_part__inner')[0].style.height = that.frequencyData[i] / 18 + 'px';
      }

    }, 10);
  }

  postProcess(src) {
    let sample = this._globalAudio[src][0];

    // Create the audio context just once
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      document.getElementsByClassName('_audio')[0].innerHTML = `<audio crossorigin='anonymous'><source src='${sample.src}' type='audio/mp3'></audio>`;

      let audioNode = document.querySelector("audio");

      let sourceNode = this.audioCtx.createMediaElementSource(audioNode);

      // Create the lowpass filter
      this.biquadFilter = this.audioCtx.createBiquadFilter();

      this.biquadFilter.frequency.value = 3000;

      // Connect the source to the lowpass filter
      sourceNode.connect(this.biquadFilter);

      // Connect the lowpass filter to the output (speaker)
      this.biquadFilter.connect(this.audioCtx.destination);
      this._fxAudioArray[src] = audioNode;
    }
  }}