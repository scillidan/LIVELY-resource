
var numrows = 41;
var numcols = 200;
var altColor = 'g';
var altmin = 1;
var altmax = 70;
var pmin = 1;
var pmax = 110;

function iterateAltColor() {
  switch (altColor) {
    case 'r':
      altmin = rand(1, 30);
      altmax = rand(40, 80);
      pmin = rand(1, 50);
      pmax = rand(70, 120);
      altColor = 'g';
      break;
    case 'g':
      altmin = rand(1, 50);
      altmax = rand(70, 120);
      pmin = rand(1, 50);
      pmax = rand(70, 120);
      altColor = 'b';
      break;
    case 'b':
      altmin = rand(1, 50);
      altmax = rand(70, 120);
      pmin = rand(1, 20);
      pmax = rand(30, 80);
      altColor = 'r';
      break;
  }
}

function setup() {
   var t, tr, td, i, j;
    t = document.getElementById("background");
    for (i = 0; i < numrows; i++) {
      tr = document.createElement("tr");
      t.appendChild(tr);
      for (j = 0; j < numcols; j++) {
        td = document.createElement("td");
        tr.appendChild(td);
      }
    }
}

function wash(isFirst) {
  var t, tr, td, x, y;
  t = document.getElementById("background");
  x = 0;
  y = 0;
  if (!isFirst) {
   iterateAltColor();
  }
  function washAction() {
    while(x !== numcols) {
      setColor(getTd(x, y));
      x++;
      if (x == numcols) {
        y++;
      }
    }
    x = 0;
    if (y < numrows) {
      setTimeout(washAction, 100);
    } else {    
      setTimeout(wash, 11000);
    }
  }
  washAction();
}

function setColor(td) {
  var c;
  c = getRandomColor();
  td.style.backgroundColor = getColor(c);
}

function getRandomColor() {
  var primary, alt, isBright, isWhite, v;
  
  isBright = .025;
  isWhite = .001;
  primary = rand(pmax, pmin);
  alt = rand(altmax, altmin);
  v = Math.random();
  if (v <= isWhite) {
    alt = 220;
    primary = 220;
  } else if (v <= isBright) {
    alt = makeBright(alt);
    primary = makeBright(primary);
  }
  return {
    r: (altColor === 'r' ? alt : primary),
    g: (altColor === 'g' ? alt : primary),
    b: (altColor === 'b' ? alt : primary)
  };
}

function makeBright(c) {
    c += 100;
    if (c > 256) {
        return 256;
    }
    return c;
}

function getColor(color) {
    return [
      "rgb(",
      color.r,
      ", ",
      color.g,
      ", ",
      color.b,
      ")"
    ].join('');
}

function twinkle() {
  var rowNum, colNum, isFlash, td, numTwinkles, i;
  numTwinkles = 5;
  for (i = 0; i < numTwinkles; i++) {
    x = rand(0, numcols);
    y = rand(0, numrows);
    isFlash = .01;
    td = getTd(x, y);
    if (Math.random() <= isFlash) {
      flash(td);
    } else {
      setColor(td);
    }
  }
  setTimeout(twinkle, 10);
}

function getTd(colNum, rowNum) {
  var t, tr;
  t = document.getElementById("background");
  tr = t.children[rowNum];
  return tr.children[colNum];
}

function streak() {
  var isColumn, coords;
  isColumn = Math.random() >= .5;
  isOpposite = Math.random() >= .5;
  if (isColumn) {
    coords = {
      x: rand(0, numcols-1),
      y: isOpposite ? 0 : numrows-1
    };
  } else {
    coords = {
      x: isOpposite ? 0 : numcols-1,
      y: rand(0, numrows-1)
    };
  }
  function runStreak() {
    var td;
    td = getTd(coords.x, coords.y);
    flash(td);
    setTimeout(function() {
      flash(td);
    }, 250);
    if (isColumn) {
      coords.y = incrementCoord(coords.y, numrows,
        isOpposite, runStreak);
    } else {
      coords.x = incrementCoord(coords.x, numcols,
        isOpposite, runStreak);
    }
  };
  runStreak();
}

function incrementCoord(coord, limit, isOpp, cb) {
  coord += 1 * (isOpp ? 1 : -1);
  if (coord < limit && coord >= 0) {
    setTimeout(cb, 5);
  } else {
    setTimeout(streak, rand(10, 11000));
  }
  return coord;
}

function flash(td) {
  var finalColor, r, g, b, shouldContinue,
    currentColor, rStep, gStep, bStep;
  finalColor = getRandomColor();
  r = g = b = 256;
  currentColor = {
    r: 255,
    g: 255,
    b: 255
  };
  rStep = rand(1, 10);
  gStep = rand(1, 10);
  bStep = rand(1, 10);
  function runFlash() {
    td.style
      .backgroundColor = getColor(currentColor);
    shouldContinue = false;
    shouldContinue = flashColor(finalColor,
      currentColor, 'r', rStep);
    shouldContinue = flashColor(finalColor,
      currentColor, 'g', gStep) || shouldContinue;
    shouldContinue = flashColor(finalColor,
      currentColor, 'b', bStep) || shouldContinue;
    if (shouldContinue) {
      setTimeout(runFlash, 1);
    }
  }
  runFlash();
}

function flashColor(finalColor, currentColor,
    name, step) {
  
  if (currentColor[name] !== finalColor[name]) {
    currentColor[name] -= step;
    if (currentColor[name] < finalColor[name]) {
      currentColor[name] = finalColor[name];
    }
    return true;
  }
  return false;
}

function rand(max, min) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function setupEvents() {
  var t;
  t = document.getElementById("background");
  t.addEventListener('mouseover', function(event) {
    flash(event.target);
    setTimeout(function() {
      flash(event.target);
    }, 250);
  });
}
setup();
wash(true);
twinkle();
streak();
setupEvents();
