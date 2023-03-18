/*
TrainScape
Created by Pedram Sadegh Beyki @pitheorem
Submission for Sableraph's WCCChallenge : Train
Dedicated to my favorite teacher of all time, Daniel Shiffman.
2022


INTERACTION MANUAL:
Click&Drag horizontally on the sky to change the cloud density
Click&Drag horizontally around the horizon to change the lake density
Click&Drag horizontally below the horizon to change the plants & flowers density

Press 1 > to toggle between Sea | Hills | Mountain | Forest
Press 2 > to toggle between Sand | Soil | Wheat | Grass
Press 3 > to toggle between foreground colors
Press 4 > to toggle between Hill colors1
Press 5 > to toggle between Mountain colors1
Press 6 > to toggle between Flower colors1
*/

var spdMultiplier = 1;
var wiggle = 2;
var idBG = 0; // 0: Sea   1: Hill    2: Mountain    3: Forest
var idMG = 0; // 0: Shore   1: Desert   2: Farm    3: Grass
var idFG = 0; // 0: Soil   1: Brown Soil  2: Grass
var idFlower = 0; // 0: Red   1: Yellow   2: Purple
var idHill = 0;
var idMountain = 0;

var grassSize = 10;
var flowerSize = 12;
var plantSize = 20;
var windowW = 0.97;
var windowH = 0.93;

var nDecaySky = 0.3; // .2-.5
var nDecayPlants = 0.0; // .1-.6
var nDecayLake = 0.0; // .3-.5

var nAmpSky = 0.5;
var nFrqSky = 10;
var nLodSky = 8;

var pLodMG = 8;
var pFalloffMG = 0.8;
var pFrqMG = 10;
var pAmpMG = 2;

var nAmpPlants = 10;
var nFrqPlants = 4;
var nLodPlants = 8;

var nAmpLake = 1;
var nFrqLake = 4;
var nLodLake = 4;

var nLodBG = 4;
var nLodMG = 4;
var nLodFG = 4;
var nDecayBG = 0.33;
var nDecayMG = 0.33;
var nDecayFG = 0.33;

var nAmpBGlist = [0, 0, 0.5, 0.15, 0.8];
var nFrqBGlist = [2, 2, 8, 16, 16];
var nAddBGlist = [0.55, 0.5, 0.3, 0.45, 0.2];

var nAmpMGlist = [0, 0.25, 0.4, 0.15];
var nFrqMGlist = [2, 2, 8, 16];
var nAddMGlist = [0.4, 0.4, 0.3, 0.45];

var wAmpBG = 20;
var wFrqBG = 5;

var gLodMG = 8;
var gFalloffMG = 0.8;
var gFrqMG = 10;
var gAmpMG = 20;

var nAmpMG = 0.1;
var nAmpFG = 0.15;
var nFrqMG = 1;
var nFrqFG = 1;
var nAddMG = 0.6;
var nAddFG = 0.8;

var nSpdSky = 0.005;
var nSpdBG = 0.01;
var nSpdMG = 0.05;
var nSpdFG = 0.1;
var gridDensity = [0.1, 0.1];

var panBG = 0;
var panMG = 0;
var panFG = 0;
var panSky = 0;
var nAmpBG;
var nFrqBG;
var nAddBG;
var gridSize;
var pts = [];
var ls = [];

var skyPalette = ["#92B4EC"];
var forestPalette = ["#076410", "#31906F"];
var desertPalette = ["#FFD9C0", "#F77E21", "#DEA057"];
var mountainPalette = ["#5C3D27", "#975A20", "#525E75", "#3A3845"];
var hillsPalette = ["#FFD9C0", "#F77E21", "#DEA057", "#4BD667", "#076410"];
var seaPalette = ["#2155CD", "#79DAE8"];
var beachPalette = ["#F1DDBF", "#E6BA95"];
var farmPalette = ["#BBB332", "#BD9824"];
var grassPalette = ["#B4E197", "#83BD75"];
var flowerPalette = ["#EB5353", "#E28B1E", "#8B2CC0"];
var plantsPalette = ["#0A4410", "#3A8846", "#B49E06", "#686029"];
var fgPalette = ["#DEA057", "#975A20", "#076410"];

function setup() {
  createCanvas(720, 480);

  initColors(skyPalette);
  initColors(forestPalette);
  initColors(desertPalette);
  initColors(mountainPalette);
  initColors(hillsPalette);
  initColors(seaPalette);
  initColors(beachPalette);
  initColors(farmPalette);
  initColors(grassPalette);
  initColors(flowerPalette);
  initColors(plantsPalette);
  initColors(fgPalette);

  gridSize = createVector(gridDensity[0] * width, gridDensity[1] * height);

  for (let x = 0; x < gridSize.x; x++) {
    pts[x] = [];
    let normX = float(x) / (gridSize.x - 1);
    for (let y = 0; y < gridSize.y; y++) {
      let normY = float(y) / (gridSize.y - 1);
      pts[x][y] = new pt(x, y, normX, normY);
    }
  }
}

function draw() {
  fill(255, 100);
  rect(0, 0, width, height);
  // background(255);

  noFill();

  if (mouseIsPressed && mouseButton == LEFT) {
    let mX = mouseX / width;
    let mY = mouseY / height;
    if (mY < 0.33) {
      nDecaySky = map(mX, 0, 1, 0, 0.66);
    } else if (mY >= 0.33 && mY < 0.66) {
      nDecayLake = constrain(map(mX, .1, 1, 0, 0.66),0,1);
    } else if (mY >= 0.66) {
      nDecayPlants = map(mX, 0, 1, 0, 0.8);
    }
  }

  nAmpBG = nAmpBGlist[idBG];
  nFrqBG = nFrqBGlist[idBG];
  nAddBG = nAddBGlist[idBG];

  for (let x = 0; x < gridSize.x; x++) {
    for (let y = 0; y < gridSize.y; y++) {
      pts[x][y].render();
    }
  }

  panBG += nSpdBG * nFrqBG * spdMultiplier;
  panMG += nSpdMG * nFrqMG * spdMultiplier;
  panFG += nSpdFG * nFrqFG * spdMultiplier;
  panSky += nSpdSky * nFrqSky * spdMultiplier;
}

function keyPressed() {
  if (key == "1") {
    if (idBG == 3) {
      idBG = 0;
    } else {
      idBG += 1;
    }
  } else if (key == "2") {
    if (idMG == 3) {
      idMG = 0;
    } else {
      idMG += 1;
    }
  } else if (key == "3") {
    if (idFG == 2) {
      idFG = 0;
    } else {
      idFG += 1;
    }
  } else if (key == "4") {
    if (idHill == 3) {
      idHill = 0;
    } else {
      idHill += 1;
    }
  } else if (key == "5") {
    if (idMountain == 2) {
      idMountain = 0;
    } else {
      idMountain += 1;
    }
  } else if (key == "6") {
    if (idFlower == 2) {
      idFlower = 0;
    } else {
      idFlower += 1;
    }
  }
}
class pt {
  constructor(in_xID, in_yID, in_u, in_v) {
    this.xid = in_xID;
    this.yid = in_yID;
    this.u = in_u;
    this.v = in_v;
    this.x = in_u * width;
    this.y = in_v * height;
    this.lBG = 0;
    this.lMG = 0;
    this.lFG = 0;
    this.wBG = 0;
    this.normMF = 0;
    this.centerMF = 0;
    this.r = [];
  }
  sky(xPos, yPos) {
    noiseDetail(nLodSky, nDecaySky);
    let n = int(((this.lBG - this.v) * 10) / this.lBG > 1);
    let cloud =
      n * noise(this.u * nFrqSky + panSky, this.v * nFrqSky) * nAmpSky;
    if (cloud < nAmpSky / 2) {
      let w0 = map(this.v, 0, this.lBG, 0, this.wBG / 2); // related to w1

      stroke(skyPalette[0]);
      if (idBG == 1) {
        line(xPos - 10, yPos - 5 + w0, xPos + 10, yPos + 5 + w0);
      } else {
        line(xPos - 10, yPos - 5, xPos + 10, yPos + 5);
      }
    }
  }

  sea(xPos, yPos, variance) {
    // Sea
    stroke(lerpColor(seaPalette[0], seaPalette[1], variance));
    line(xPos - 10, yPos, xPos + 10, yPos);
    line(xPos - this.r[1] * 10, yPos + 5, xPos + this.r[1] * 10, yPos + 5);
    // line(xPos - 5+this.r[1]*5, yPos + 5, xPos + 5+this.r[1]*5, yPos + 5);
  }

  seashore(xPos, yPos, variance) {
    stroke(lerpColor(beachPalette[0], beachPalette[1], variance));
    line(xPos - 10, yPos - 10, xPos + 10, yPos + 10);
    line(xPos - 10, yPos + 10, xPos + 10, yPos - 10);
  }

  hill(xPos, yPos, variance) {
    let w1 = map(this.v, this.lBG, this.lMG, this.wBG / 2, 0); // related to w0

    stroke(
      lerpColor(hillsPalette[idHill], hillsPalette[idHill + 1], variance)
    );
    line(xPos - 8, yPos + w1, xPos + 8, yPos + w1);
    line(xPos - 8, yPos + w1 + 5, xPos + 8, yPos + w1 + 5);
    // line(xPos+5, yPos-5+w, xPos-5, yPos+5+w);
    // line(xPos-5, yPos-5+w, xPos+5, yPos+5+w);
  }

  mountain(xPos, yPos, variance) {
    let mntW = map(this.v, this.lBG, this.lMG, 20, 10);
    let mntH = map(this.v, this.lBG, this.lMG, 10, 5);

    // Mountains
    stroke(
      lerpColor(mountainPalette[idMountain], mountainPalette[idMountain + 1],variance)
    );

    if (this.xid % 2 == 0) {
      line(xPos, yPos - mntH, xPos - mntW, yPos + mntH);
      line(xPos, yPos - mntH, xPos + mntW, yPos + mntH);
      line(xPos, yPos - mntH + 5, xPos - mntW, yPos + mntH + 5);
      line(xPos, yPos - mntH + 5, xPos + mntW, yPos + mntH + 5);
    }
  }

  forest(xPos, yPos, variance) {
    let frstW = map(this.v, this.lBG, this.lMG, 2, 10);
    let frstH = map(this.v, this.lBG, this.lMG, 10, 2);
    let frstX = 0; //noise(this.u +panMG)*20;

    // Forest
    var col = lerpColor(forestPalette[0], forestPalette[1], variance);
    // if (this.xid % 2 == 0) {
    if (abs(this.v - this.lMG) < 0.05) {
      stroke("#5A441A");
      line(xPos + frstX, yPos, xPos + frstX, yPos + 10);
    }
    if (abs(this.v - this.lMG) > 0.02) {
      // fill(col,100);
      // triangle(xPos-5,yPos+10,xPos,yPos-10,xPos+5,yPos+10);
      stroke(col);
      line(xPos + frstX, yPos - frstH, xPos - frstW + frstX, yPos + frstH);
      line(xPos + frstX, yPos - frstH, xPos + frstW + frstX, yPos + frstH);
			line(xPos + frstX, yPos - frstH-5, xPos - frstW + frstX, yPos + frstH-5);
      line(xPos + frstX, yPos - frstH-5, xPos + frstW + frstX, yPos + frstH-5);
    }
  }

  desertSoil(xPos, yPos, variance) {
    let dMG = noise(this.u * 10 + panMG, this.v * 100) * 10;

    // Desert Soil
    stroke(lerpColor(desertPalette[0], desertPalette[1], variance));
    line(xPos - dMG, yPos - 5, xPos + dMG + 5, yPos + 5);
    // line(xPos - 5, yPos + 5, xPos + 5, yPos - 5);
  }
  farm(xPos, yPos, variance) {
    let dMG = noise(this.u * 10 + panMG, this.v * 100) * 10;

    stroke(lerpColor(farmPalette[0], farmPalette[1], variance));
    line(xPos - dMG / 2, yPos - 5, xPos + dMG / 2, yPos + 5);
    line(xPos - dMG / 2, yPos + 5, xPos + dMG / 2, yPos - 5);
  }

  lake(xPos, yPos, variance) {
    var nLake1 = noise((this.u + panMG + 2) * nFrqLake, this.v * nFrqLake);
    stroke(lerpColor(seaPalette[0], seaPalette[1], variance));
    line(xPos - 4, yPos, xPos + 4, yPos);
    line(
      xPos - 4 + this.r[0] * 10,
      yPos - 4,
      xPos + 4 + this.r[0] * 10,
      yPos - 4
    );
  }

  grass(xPos, yPos, variance) {
    noiseDetail(gLodMG, gFalloffMG);
    let grassTurb =
      noise((this.u + panMG) * gFrqMG, this.v * gFrqMG, panMG * 6) * gAmpMG;

    var grassScale = grassSize * (this.normMF + 0.5) * 2;
    // Grass
    stroke(lerpColor(grassPalette[0], grassPalette[1], variance));
    if (abs(this.v - this.lMG) < 0.025) {
      line(xPos, yPos + grassScale, xPos - grassTurb / 2, yPos);
    }
    line(
      xPos,
      yPos + grassScale / 2,
      xPos - grassTurb / 2,
      yPos - grassScale / 2
    );
    line(
      xPos + 5,
      yPos + grassScale / 2 + this.r[2] * 5,
      xPos - grassTurb / 2 + 5,
      yPos - grassScale / 2 + this.r[2] * 5
    );
  }

  plants(xPos, yPos, variance) {

    let turb = variance * nAmpPlants;
    var plantScale = plantSize * (this.normMF + 0.5) * variance;

    if (idMG == 3) {
      stroke(lerpColor(plantsPalette[0], plantsPalette[1], variance));
    } else {
      stroke(lerpColor(plantsPalette[2], plantsPalette[3], variance));
    }
    let y0 = yPos - plantScale / 2;
    let y1 = yPos + plantScale / 2;

    line(xPos, y1, xPos + turb, y0);
    line(xPos, y1, xPos - turb, y0);
    line(xPos, y1, xPos, y0);

    // Flower
    let hasFlower = random(1);
    if (hasFlower > 0.5 && idMG > 1) {
      var flowerScale = flowerSize * this.normMF;

      stroke(flowerPalette[idFlower]);
      line(
        xPos - flowerScale / 2 + this.r[0],
        y0 - flowerScale / 2,
        xPos + flowerScale / 2 + this.r[0],
        y0 + flowerScale / 2
      );
      line(
        xPos - flowerScale / 2 + this.r[1],
        y0 + flowerScale / 2,
        xPos + flowerScale / 2 + this.r[1],
        y0 - flowerScale / 2
      );
      line(xPos - flowerScale / 2, y0, xPos + flowerScale / 2, y0);
      line(xPos, y0 - flowerScale / 2, xPos, y0 + flowerScale / 2);
    }
  }

  foreground(xPos, yPos) {
		stroke(fgPalette[idFG]);
    line(xPos, yPos - 10, xPos, yPos + 10);
    line(xPos - 5, yPos - 10, xPos - 5, yPos + 10);
  }

  windowV(xPos,yPos)
  {
    stroke(160);
    line(xPos,yPos-10,xPos,yPos+10);
    line(xPos-5,yPos-10,xPos-5,yPos+10);
    line(xPos+5,yPos-10,xPos+5,yPos+10);
  }

  windowH(xPos,yPos){
    stroke(160);
    line(xPos-10,yPos,xPos+10,yPos);
    line(xPos-10,yPos-5,xPos+10,yPos-5);
    line(xPos-10,yPos+5,xPos+10,yPos+5);
  }

  render() {
    this.r[0] = random(-1, 1);
    this.r[1] = random(-1, 1);
    this.r[2] = random(0, 1);
    this.r[3] = random(-1, 1);

    let xPos = this.x + random(-wiggle, wiggle);
    let yPos = this.y + random(-wiggle, wiggle);

    noiseDetail(4, .5);
    let windowX = noise(millis())*5;
    let windowY = noise(millis() + 1)*5;
    // noiseDetail(4,.5);

    noiseDetail(nLodBG, nDecayBG);
    let nBG = noise(this.u * nFrqBG + panBG, this.v);
    noiseDetail(nLodMG, nDecayMG);
    let nMG = noise(this.u * nFrqMG + panMG, this.v + 1);
    noiseDetail(nLodFG, nDecayFG);
    let nFG = noise(this.u * nFrqFG + panFG, this.v + 2);

    this.lBG = nBG * nAmpBG + nAddBG;
    this.lMG = nMG * nAmpMG + nAddMG;
    this.lFG = nFG * nAmpFG + nAddFG;

    this.wBG = sin((this.u + panMG * 0.5) * wFrqBG) * wAmpBG;
    this.normMF = constrain(map(this.v, this.lMG, this.lFG, 0, 1), 0, 1);
    this.centerMF = sin(this.normMF * PI);
    this.centerMF *= this.centerMF * this.centerMF;

    noiseDetail(8, 0.5);
    let variance = noise(this.u * nFrqBG + panBG, this.v * nFrqBG);

    noFill();

     if (this.u < 0.025 || this.u > .975) {
        this.windowV(xPos+windowX,yPos+windowY);
      }else if (this.v < 0.05 || this.v > .95) {
        this.windowH(xPos+windowX,yPos+windowY);
      }else if(this.v > 0.15 && this.v < .175)
        {
          this.windowH(xPos+windowX,yPos+windowY);
       }else if(this.v > 0.135 && this.v < .175 && this.u>.45 && this.u<.55)
        {
          this.windowH(xPos+windowX,yPos+windowY);
          this.windowV(xPos+windowX,yPos+windowY);
        }
    else {

      if (this.v < this.lBG) {
        // SKY
        this.sky(xPos, yPos);

      } else if (this.v >= this.lBG && this.v < this.lMG) {
        if (idBG == 0) {
          this.sea(xPos, yPos, variance);
        } else if (idBG == 1) {
          this.hill(xPos, yPos, variance);
        } else if (idBG == 2) {
          this.mountain(xPos, yPos, variance);
        } else {
          this.forest(xPos, yPos, variance);
        }
      } else if (this.v >= this.lMG && this.v < this.lFG) {
        // Lake Check
        let norm = this.centerMF;
        noiseDetail(nLodLake, nDecayLake);
        let nLake0 = noise((this.u + panMG) * nFrqLake,this.v * nFrqLake * 5,0.33);

        if (nDecayLake != 0 && nLake0 * norm > 0.33) {
          this.lake(xPos, yPos, nLake0);
        } else {
          if (idMG == 0) {
            this.seashore(xPos, yPos, variance);
          } else if (idMG == 1) {
            this.desertSoil(xPos, yPos, variance);
          } else if (idMG == 2) {
            this.farm(xPos, yPos, variance);
          } else {
            this.grass(xPos, yPos, variance);
          }

          noiseDetail(nLodPlants, nDecayPlants);
          let nPlants0 = noise(
            (this.u + panMG) * nFrqPlants,
            this.v * nFrqPlants * 5,
            0.5
          );

          if (nPlants0 > 0.5) {
            this.plants(xPos, yPos, nPlants0);
          }
        }
      } else {
        // Foreground
        this.foreground(xPos, yPos);
      }

      if (sin((this.u + panFG) * QUARTER_PI) > 0.99975) {
        stroke(color("#5F4631"));
        line(xPos, yPos - 10, xPos, yPos + 10);
        line(xPos - 2.5, yPos - 10, xPos - 2.5, yPos + 10);
        line(xPos + 2.5, yPos - 10, xPos + 2.5, yPos + 10);
        line(xPos - 5, yPos - 10, xPos - 5, yPos + 10);
        line(xPos + 5, yPos - 10, xPos + 5, yPos + 10);
      }
    }
  }
}

function initColors(in_cols) {
  for (var c = 0; c < in_cols.length; c++) {
    var test = color(in_cols[c]);
    in_cols[c] = test;
  }
}
