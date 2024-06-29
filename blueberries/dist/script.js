function App() {
  const { Renderer, Geometry, Program, Mesh, Vec2, Vec3, Texture, GPGPU } = ogl;

  let renderer, gl;
  let time, mouse, ratio;
  let points, positionB, dataB;
  let texture;

  init();

  function init() {
    renderer = new Renderer({ dpr: 2, alpha: true, depth: false, autoClear: true, preserveDrawingBuffer: false });
    gl = renderer.gl;
    document.body.appendChild(gl.canvas);

    time = { value: 0 };
    mouse = { value: new Vec2() };
    ratio = { value: new Vec2() };

    texture = new Texture(gl);
    const images = [
    { texture: texture, src: 'img/2560_Composite_of_the_Moon,_variant_01.jpg' }];


    Promise.all(images.map(loadImage)).then(responses => {
      initAfterLoad();
    });
  }

  function initAfterLoad() {
    resize();
    window.addEventListener('resize', resize, false);
    function resize() {
      const tR = texture.image.width / texture.image.height;
      const w = window.innerWidth,h = window.innerHeight,r = w / h;
      if (r > tR) ratio.value.set(1, h / w * tR);else
      ratio.value.set(w / h / tR, 1);
      renderer.setSize(w, h);
    }

    document.addEventListener('click', () => {
      document.body.classList.toggle('hide-background');
    });

    initScene();
    initListeners();
    requestAnimationFrame(animate);
  }

  function initScene() {
    const numParticles = 256 * 256;
    const positions = new Float32Array(numParticles * 4);
    const data = new Float32Array(numParticles * 4);
    const random = new Float32Array(numParticles * 4);
    const v = new Vec3();
    for (let i = 0; i < numParticles; i++) {
      v.set(rnd(-1, 1), rnd(-1, 1), 0);
      positions.set([v.x, v.y, v.z, 1], i * 4);
      data.set([2, 0, 0, 1], i * 4);
      random.set([rnd(0.1, 1), rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)], i * 4);
    }

    positionB = new GPGPU(gl, { data: positions });
    dataB = new GPGPU(gl, { data: data });
    dataB.addPass({
      uniforms: {
        uTime: time,
        uMouse: mouse,
        tPosition: positionB.uniform },

      fragment: `
        precision highp float;

        uniform float uTime;
        uniform vec2 uMouse;
        uniform sampler2D tMap;
        uniform sampler2D tPosition;

        varying vec2 vUv;

        void main() {
          vec4 position = texture2D(tPosition, vUv);
          vec4 data = texture2D(tMap, vUv);

          float toMouse = length(position.xy - uMouse);
          if (toMouse<.2) {
            data.x += abs(.2 - toMouse);
            data.x = min(data.x, 3.0);
          }
          // data.x = min(data.x + 1.0, 3.0);
          data.x *= 0.997;
          gl_FragColor = data;
        }
      ` });


    const geometry = new Geometry(gl, {
      coords: { size: 2, data: positionB.coords },
      random: { size: 4, data: random } });


    const program = new Program(gl, {
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: time,
        uRatio: ratio,
        tPosition: positionB.uniform,
        tData: dataB.uniform,
        tTexture: { value: texture } },

      vertex: `
        precision highp float;

        attribute vec2 coords;
        attribute vec4 random;

        uniform float uTime;
        uniform sampler2D tPosition;
        uniform sampler2D tData;

        varying vec4 vData;
        varying vec2 vPos;

        void main() {
          vec4 position = texture2D(tPosition, coords);
          vData = texture2D(tData, coords);
          vPos = position.xy;
          gl_Position = vec4(position.xy, 0, 1);
          // gl_Position.x += cos(uTime * random.z) * random.w * 0.03 * vData.x;
          // gl_Position.y += sin(uTime * random.w) * random.z * 0.03 * vData.x;
          gl_Position.x += cos(uTime * random.z * 0.8) * random.x * 0.03 * vData.x;
          gl_Position.y += sin(uTime * random.w * 0.8) * random.x * 0.03 * vData.x;
          gl_PointSize = (cos(uTime * 2.0 * random.y) + 1.0) * vData.x * random.x * 8.0;
        }
      `,
      fragment: `
        precision highp float;

        uniform vec2 uRatio;
        uniform sampler2D tTexture;
        varying vec4 vData;
        varying vec2 vPos;

        void main() {
          if (step(0.5, length(gl_PointCoord.xy - 0.5)) > 0.0) discard;
          vec2 pos = vPos;
          pos.x *= uRatio.x;
          pos.y *= uRatio.y;
          gl_FragColor = texture2D(tTexture, (pos + 1.0) / 2.0);
          gl_FragColor.a = clamp(0.0, 1.0, vData.x);
        }
      ` });


    points = new Mesh(gl, { geometry, program, mode: gl.POINTS });
  }

  function animate(t) {
    requestAnimationFrame(animate);

    time.value = t * 0.001;
    dataB.render();
    renderer.render({ scene: points });
  }

  function initListeners() {
    if ('ontouchstart' in window) {
      gl.canvas.addEventListener('touchstart', updateMouse, false);
      gl.canvas.addEventListener('touchmove', updateMouse, false);
    } else {
      gl.canvas.addEventListener('mousemove', updateMouse, false);
    }

    function updateMouse(e) {
      if (e.changedTouches && e.changedTouches.length) {
        e.x = e.changedTouches[0].pageX;
        e.y = e.changedTouches[0].pageY;
      }
      if (e.x === undefined) {
        e.x = e.pageX;
        e.y = e.pageY;
      }
      mouse.value.set(
      e.x / gl.renderer.width * 2 - 1,
      (1.0 - e.y / gl.renderer.height) * 2 - 1);

    }
  }

  function loadImage(i) {
    const { texture, src } = i;
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {texture.image = img;resolve({ src, status: 'ok' });};
      img.src = src;
    });
  }

  function rnd(min, max) {
    if (min === undefined) {min = 1;}
    if (max === undefined) {max = min;min = 0;}
    return Math.random() * (max - min) + min;
  }
}

App();