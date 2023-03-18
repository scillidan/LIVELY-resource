window.onload = function () {
  // Audio
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById("nakamoto");
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();
  analyser.fftSize = 512;
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);
  audioElement.volume = 0.5;
  audioElement.currentTime = 14;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  // Pt
  var space = new CanvasSpace("wecrypto", false).display("#satoshi");
  space.refresh(false);
  var form = new Form(space);

  // Mouse
  var mouseIsDown = false;

  // BTC
  var transactions = [];
  var btcSocket = new WebSocket("wss://ws.blockchain.info/inv");
  btcSocket.onopen = function (e) {
    btcSocket.send(JSON.stringify({ op: "unconfirmed_sub" }));
  };
  btcSocket.onmessage = function (e) {
    if (transactions.length > 100) return;
    JSON.parse(e.data).x.out.map(function (transaction) {
      transactions.push({
        value: transaction.value / 10e6,
        addr: transaction.addr,
      });
    });
  };
  btcSocket.onerror = function (e) {
    // Welp
    console.log(e);
  };

  // BTC stream
  // BPM is 180, hence 1000 / 3
  setInterval(function () {
    if (audioElement.paused || !transactions.length) return;
    document.getElementById("input").textContent = transactions[0].value + "BTC → " + transactions[0].addr;
    transactions.shift();
  }, 1000 / 3);

  // Below is unused code.

  // Click
  window.addEventListener("mousedown", function () {
    mouseIsDown = true;
  });
  window.addEventListener("mouseup", function () {
    mouseIsDown = false;
  });

  // Touch events
  window.addEventListener("touchstart", function () {
    mouseIsDown = true;
  });
  window.addEventListener("touchend", function () {
    mouseIsDown = false;
  });

  // Spring
  var springSystem = new rebound.SpringSystem();
  var spring = springSystem.createSpring(32, 3);
  var springBit = 0;

  // Other
  var htmlEl = document.querySelector("html");
  function beatDropped() {
    return audioElement.currentTime > 21.3;
  }

  // Cloning is faster
  var pts = [];
  for (var i = 0; i < bufferLength; i++) {
    pts.push(new Vector((space.size.x / 7) * (7 / 2 + Math.cos((i / bufferLength) * 2 * Math.PI) * Math.min(dataArray[i] / 128.0, 1)), (space.size.y / 7) * (7 / 2 + Math.sin((i / bufferLength) * 2 * Math.PI) * Math.min(dataArray[i] / 256.0, 1))));
  }

  var timer = 0;
  var afterImages = [];
  var afterImageTones = ["rgba(69, 255, 246, " + 0.8 + ")", "rgba(69, 255, 246, " + 0.6 + ")", "rgba(69, 255, 246, " + 0.4 + ")", "rgba(69, 255, 246, " + 0.2 + ")", "rgba(69, 255, 246, " + 0.1 + ")"].reverse();

  // Contract/Expand
  setInterval(function () {
    if (beatDropped() && !audioElement.paused) {
      springBit = 1 - springBit;
      spring.setEndValue(springBit);
    } else {
      spring.setEndValue(0);
    }
  }, 1000 / 1.5);

  space.add({
    animate: function (time, fps, ctx) {
      timer = time % 300;
      if (timer > 1000 / 16 && beatDropped()) {
        timer = 0;
        space.clear();
      } else if (!beatDropped()) {
        space.clear();
      }

      ctx.globalCompositeOperation = "destination-over";
      if (beatDropped()) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#45fff6";
        // xD
        htmlEl.className.indexOf("inverted") === -1 ? (htmlEl.className += " inverted") : null;
      } else {
        ctx.shadowBlur = 0;
        ctx.shadowColor = "#fff";
        htmlEl.className = "";
      }

      // Put data into unsigned array
      analyser.getByteTimeDomainData(dataArray);

      var _pts = Util.clonePoints(pts);
      for (var i = 0; i < bufferLength; i++) {
        _pts[i].set((space.size.x / 7) * (7 / 2 + Math.cos((i / bufferLength) * 2 * Math.PI) * Math.min(dataArray[i] / 128.0, 1)), (space.size.y / 7) * (7 / 2 + Math.sin((i / bufferLength) * 2 * Math.PI) * Math.min(dataArray[i] / 256.0, 1)));
        _pts[i].scale2D(1 + spring.getCurrentValue() * 1.2, 1 + Math.sin((i / bufferLength) * 2 * Math.PI) * spring.getCurrentValue() * 0.6, new Point(space.size.x / 2, space.center.y - 100));
      }

      // Close the circle
      _pts.push(_pts[0].clone());

      var curve = new Curve().to(_pts);
      form.stroke(beatDropped() ? "#45fff6" : "#222", audioElement.currentTime > 21.3 ? 2 : 1);
      form.curve(curve.catmullRom());
      if (beatDropped()) {
        if (afterImages.length > 5) {
          afterImages.shift();
        }
        afterImages.push(new Curve().to(Util.clonePoints(_pts)));
        afterImages.map(function (image, index) {
          form.stroke(afterImageTones[index], 2 / index);
          form.curve(image.catmullRom());
          return image.moveBy(0, 30, -index);
        });
      }
    },
  });

  // On play
  var playBtn = document.querySelector("#play");
  var playHelpEl = document.querySelector("#play-helper");
  playBtn.onclick = function () {
    audioElement.paused ? audioElement.play() : audioElement.pause();
    if (!audioElement.paused) {
      playBtn.className += " hidden";
      playHelpEl.className += " hidden";
      document.querySelector("#satoshi").className += " visible";
    } else {
      playBtn.className = "";
      playHelpEl.className = "";
    }
  };

  space.play();
};