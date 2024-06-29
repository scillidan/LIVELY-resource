const clock = document.getElementById("c");
const ctx = c.getContext("2d");
const ANGLE = 3.14 / (2 / 3);
const SIZE = 500;
const HALF = SIZE / 2;
const LWIDTH = 2;
const LPAD = 29;

const rMonth = new Ring(1, 26);
const rDate = new Ring(2, 14);
const rBeat = new Ring(3, 1e3);
const rPulse = new Ring(4, 1e3);

clock.width = SIZE;
clock.height = SIZE;

Object.assign(ctx, {
    lineWidth: LWIDTH,
    textAlign: "center",
    font: "11px monospace",
});

function Cal(d = new Date()) {
    const first = new Date(d.getFullYear(), 0, 1);
    const n = ~~((d - first) / 864e5) + 1;
    let date = 0;
    let month = 0;

    switch (n) {
        case 365:
        case 366:
            break;
        default: {
            date = n - 14 * ~~(n / 14);
            if (date === 0) date = 14;
            month = ~~((n - 1) / 14);
            break;
        }
    }

    return [month, date];
}

function time() {
    const d = new Date();
    const t = (new Date(d) - d.setHours(0, 0, 0, 0)) / 864e5;
    const f = t.toFixed(6).substr(2, 6);
    return [f.substr(0, 3), f.substr(3, 3)];
}

function calcAngle(x, y) {
    return (6.28 * x) / y - 1.57;
}

function Ring(position, maxValue) {
    this.maxValue = maxValue;
    this.radius = (LWIDTH + LPAD) * position;
    this.draw = function (n, h = HALF, startAngle = ANGLE) {
        ctx.beginPath();
        ctx.arc(h, h, this.radius, startAngle, calcAngle(n, this.maxValue), false);
        ctx.stroke();
    };
}

function display(month, date, beat, pulse) {
    const mon = String.fromCharCode(97 + month).toUpperCase();
    const str = `${beat}:${pulse} ${`0${date}`.substr(-2)}${mon}`;
    ctx.fillText(str, HALF, SIZE - 60);
}

function draw(month, date, beat, pulse) {
    ctx.clearRect(0, 0, SIZE, SIZE);
    rMonth.draw(month);
    rDate.draw(date);
    rBeat.draw(beat);
    rPulse.draw(pulse);
}

function paint(bg, fg) {
    document.body.style.backgroundColor = bg;
    Object.assign(ctx, { fillStyle: fg, strokeStyle: fg });
}

function invert() {
    const bg = document.body.style.backgroundColor;
    const fg = ctx.fillStyle;
    paint(fg, bg);
}

function parseHash() {
    const { hash } = window.location;
    let bg = "#030303";
    let fg = "#f8f8f8";
    if (hash) {
        const isHex = (value) => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value);
        let [a, b] = hash.split("-");
        b = `#${b}`;
        bg = isHex(a) ? a : bg;
        fg = isHex(b) ? b : fg;
    }
    paint(bg, fg);
}

document.onkeyup = function ({ code }) {
    if (code === "KeyI") invert();
};

window.onhashchange = parseHash;
parseHash();

(function tick() {
    const [month, date] = Cal();
    const [beat, pulse] = time();
    ctx.save();
    draw(month, date, beat, pulse);
    display(month, date, beat, pulse);
    ctx.restore();
    window.requestAnimationFrame(tick);
})();