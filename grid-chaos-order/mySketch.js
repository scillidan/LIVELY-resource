let X = [];
let Y = [];
let sizes = [];
let colormode = false;
let record = [];

let palette = ["#1263ba","#1397d8","#13d3c0","#ffdb5b","#f23d21","#ffffff","#232323"];
let minS = 15;
let corner = 5;
let Seed;
function setup(){
	colorMode(RGB);
  createCanvas(windowWidth, windowHeight);
	Seed = random(9999);
  //noLoop();
	//noCursor();
}

function draw(){
	randomSeed(Seed);
	if(colormode){
	blendMode(BLEND);
	background(245);
	//noStroke();
	blendMode(DODGE );		

	}else{
		noStroke();
		fill(220,90);
		rect(0,0,width,height);	
	}

	//strokeWeight(1);
  //rectRec(0, 0, width, height);
	drawRec();
	
}

function drawRec(){
	let thr = 0;
	stroke(50,80);
	for(let i=0;i<X.length;i++){
		let GAB = dist(mouseX,mouseY,X[i],Y[i]);
		
		let shiftX1=0;
		let shiftX2=0;
		let shiftX3=0;
		let shiftX4=0;
		let shiftY1=0;
		let shiftY2=0;
		let shiftY3=0;
		let shiftY4=0;
		let alpha=0;
		
		let gab;
		if(record[i]<GAB){
			gab = record[i];
		}else{
			record[i] = GAB;
			gab = GAB;
		}
		alpha = map(gab,0,100,0,1);
	  if(gab>thr){
			gab -= 50;
				gab = constrain(gab,0,300);
				gab -= thr;
				gab = gab/8;
			  
				let angle = frameCount*TWO_PI/random(100,300);
				let SIN = sin(angle);
				let COS = cos(angle);

					 shiftX1 = gab * random(-1, 1)+SIN*random(gab/2,gab);
					 shiftY1 = gab * random(-1, 1)-SIN*random(gab/2,gab);
					 shiftX2 = gab * random(-1, 1)+COS*random(gab/2,gab);
					 shiftY2 = gab * random(-1, 1)-COS*random(gab/2,gab);
					 shiftX3 = gab * random(-1, 1)-SIN*random(gab/2,gab);
					 shiftY3 = gab * random(-1, 1)-COS*random(gab/2,gab);
					 shiftX4 = gab * random(-1, 1)+COS*random(gab/2,gab);
					 shiftY4 = gab * random(-1, 1)+SIN*random(gab/2,gab);
				   
		}
		//fill(red(colors[i]),green(colors[i]),blue(colors[i]),alpha);
		//noFill();
		let from = color(random(palette));
		let to = color(220,150);
		fill(lerpColor(from,to,alpha));
		beginShape();
		vertex(X[i]-sizes[i]/2+shiftX1,Y[i]-sizes[i]/2+shiftY1);
		vertex(X[i]+sizes[i]/2+shiftX2,Y[i]-sizes[i]/2+shiftY2);
		vertex(X[i]+sizes[i]/2+shiftX3,Y[i]+sizes[i]/2+shiftY3);
		vertex(X[i]-sizes[i]/2+shiftX4,Y[i]+sizes[i]/2+shiftY4);
		endShape(CLOSE);			
		/**
		fill(colors[i]);
		beginShape();
		vertex(X[i]-sizes[i]/2,Y[i]-sizes[i]/2);
		vertex(X[i]+sizes[i]/2,Y[i]-sizes[i]/2);
		vertex(X[i]+sizes[i]/2,Y[i]+sizes[i]/2);
		vertex(X[i]-sizes[i]/2,Y[i]+sizes[i]/2);
		endShape(CLOSE);	
		**/
		record[i]+= .5;
	}
	
}



function rectRec(x, y, w) {
  let c = int(random(2, 6));
  let sw = w/c;
  let rnd = random(.1);
  let p = map(w, minS, width, 0, 1);
  

  if(rnd < p){
    for(let i=0; i<c; i++){
      for(let j=0; j<c; j++){
          if(sw > minS){
            rectRec(x+i*sw, y+j*sw, sw);
          }
          else{
            X.push(x+i*sw+sw/2);
						Y.push(y+j*sw+sw/2);
						sizes.push(sw);
						record.push(999);
						//colors.push(colors,random(palette));
						//rect(x+i*sw, y+j*sw, sw, sw, corner);
						//count++;
          }
        }
      }
    }else{
      let off = 20;
      let ww = w-off;
      let C = random(palette);			
			//fill(random(palette));
			X.push(x+w/2);
			Y.push(y+w/2);
			sizes.push(w);
			record.push(999);

     // rect(x, y, w, w, corner);
			//count++;
      if(ww > minS){

				X.push(x+off/2+ww/2);
				Y.push(y+off/2+ww/2);
				sizes.push(ww);
				record.push(999);
        //rectRec(x+off/2, y+off/2, ww, ww);
      }
    }
  }

function mouseClicked(){
 X = [];
 Y = [];
 sizes = [];
 record = [];	
rectRec(width/2-height*0.8, height*0.1, height*0.8);
rectRec(width/2, height*0.1, height*0.8);
	
}