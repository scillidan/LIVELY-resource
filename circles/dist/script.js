// https://www.webredone.com/
const canvas      = document.querySelector('.graph'),
      ctx         = canvas.getContext('2d'),
      inputPoints = document.getElementById('points'),
      inputSpeed  = document.getElementById('speed'),
      resetMultip = document.getElementById('reset'),
      plusTen     = document.getElementById('plusTen'),
      plusOne     = document.getElementById('plusOne'),
      rangeLabels = document.querySelectorAll('.slideContainer h4'),
      root        = document.documentElement,
      mValue      = document.getElementById('mValue'),
      sSize       = { s: 8, w: 60, h: 60, o: 2 },
      size        = { 
                      ...sSize, 
                      sw: sSize.w * sSize.s,
                      sh: sSize.h * sSize.s,
                      mw: Math.floor(sSize.w * sSize.s * .5),
                      mh: Math.floor(sSize.h * sSize.s * .5),
                      lw: sSize.w * sSize.s - sSize.s,
                      lh: sSize.h * sSize.s - sSize.s,
                    },
      pi2         = Math.PI * 2;
let   m           = 1;

canvas.width  = size.sw;
canvas.height = size.sh;

const dist = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const map = (value, minA, maxA, minB, maxB) => {  
  return (1 - (value - minA) / (maxA - minA)) * minB + (value - minA) / (maxA - minA) * maxB;
};

const rect = (r, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(r.x, r.y, r.w, r.h);
};

const line = (s, e, color) => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(s.x, s.y);
  ctx.lineTo(e.x, e.y);
  ctx.stroke();
};

const circle = (c, color) => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, pi2);
  ctx.stroke();
};

const patterns = value => {
  m = value;
  inputSpeed.value  = 0;
  inputPoints.value = 200;
};

rangeLabels.forEach((label) => {
  const word = [...label.textContent];
  label.innerHTML = '';
  word.forEach((letter) => {
    const spannedLetter = document.createElement('span');
    spannedLetter.textContent = letter;
    label.appendChild(spannedLetter);
  });
});

const drawGraph = () => {
  const n = inputPoints.value,
        r = Math.floor((size.w - size.o) * size.s * .5);
  
  m >= 999 ? m = 0 : m += +inputSpeed.value;

  rect({ x: 0, y: 0, w: size.sw, h: size.sh }, '#222');
  circle({ x: size.mw, y: size.mh, r: r }, '#333');

  for (let i = 0; i < n; i++) {
    const x     = Math.sin(pi2 / n * i - pi2 * .25) * r,
          y     = Math.sin(pi2 / n * i) * r,
          ex    = Math.sin(pi2 / n * m * i - pi2 * .25) * r,
          ey    = Math.sin(pi2 / n * m * i) * r,
          Xw    = size.mw + x,
          Yh    = size.mh + y,
          eXw   = size.mw + ex,
          eYh   = size.mh + ey,
          lineL = dist( Xw, Yh, eXw, eYh ),
          a     = map(lineL, 0, r * 1.73, 1, 0.25) > 1 ? 1 : map(lineL, 0, r * 1.73, 1, 0.25).toFixed(2);
    circle({ x: Xw, y: Yh, r: size.o }, '#fff');
    line({ x: Xw, y: Yh }, { x: eXw, y: eYh }, `hsla(${m * 100 % 360}, 100%, 85%, ${a})`);
  }
  mValue.textContent = parseFloat(Math.round(m * 100) / 100).toFixed(2);
  root.style.setProperty('--Hsl', +m * 100 % 360);
  requestAnimationFrame(drawGraph);
};

document.querySelectorAll('.controlBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const btnValue = btn.getAttribute('data-value');
    btnValue == 0 ? m = 0 : m += +btnValue;
  });
});

window.addEventListener('load', drawGraph);