function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
}

function draw() {
	circle(mouseX, mouseY, 20);
}let overAllTexture;
let size = 600,
  ratio = 1;
let x, y, w, h;
let g, t, n;
let rot, vp, vpz;
let shape;
const E = 2.71828;

function setupGraphic() {
  overAllTexture = createGraphics(width, height);
  overAllTexture.loadPixels();
  let d = pixelDensity();
  for (var i = 0; i < width * d; i++) {
    for (var o = 0; o < height * d; o++) {
      overAllTexture.set(
        i,
        o,
        // color(255, noise(i / 3, o / 3, (i * o) / 50) * random([0, 20, 40]))
        color(255, noise(i / 3, o / 3, (i * o) / 50) * random([0, 10, 20]))
      );
    }
  }
  overAllTexture.updatePixels();
}

function updateGraphic() {
  push();
  blendMode(BLEND);
  image(overAllTexture, 0, 0);
  pop();
}

function setup() {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  // size = windowWidth;
  // ratio = windowHeight / windowWidth;
  createCanvas(size, size * ratio);
  g = createGraphics(size, size);
  setupGraphic();
  rot = createVector(0, 0);
  vp = createVector(0, 0);
  vpz = -500;
  shape = new Shape();
  shape.addVert(50, 50, 50);
  shape.addVert(-50, 50, 50);
  shape.addVert(-50, -50, 50);
  shape.addVert(50, -50, 50);
  shape.addVert(50, 50, -50);
  shape.addVert(-50, 50, -50);
  shape.addVert(-50, -50, -50);
  shape.addVert(50, -50, -50);
  shape.addEdge(0, 1);
  shape.addEdge(1, 2);
  shape.addEdge(2, 3);
  shape.addEdge(3, 0);

  shape.addEdge(4, 5);
  shape.addEdge(5, 6);
  shape.addEdge(6, 7);
  shape.addEdge(7, 4);

  shape.addEdge(0, 4);
  shape.addEdge(1, 5);
  shape.addEdge(2, 6);
  shape.addEdge(3, 7);
  console.log(shape);
}

function draw() {
  background(50, 50);
  noStroke();
  fill(255);
  translate(width / 2, height / 2);
  for (let i = 0; i < shape.getVertN(); i++) {
    vt = shape.getVert(i);
    pv = persp(vt);
    r = persp(createVector(10, 10, vt.z / 2));
    ellipse(pv.x, pv.y, dist(r.x , r.y,0,0)/10+10);
  }
  edges = shape.getEdges();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < edges.length; i++) {
    u = persp(edges[i][0]);
    v = persp(edges[i][1]);
    line(u.x, u.y, v.x, v.y);
  }

  if (mouseIsPressed) {
    mv = createVector(mouseX - pmouseX, mouseY - pmouseY);
    if (mouseButton === LEFT) {
      rot = mv;
    }
    if (mouseButton === RIGHT) {
      vp.sub(mv);
    }
  }
  shape.rotateOnY(rot.x * 0.01);
  shape.rotateOnX(rot.y * 0.01);
  // noLoop();
  noFill();
  stroke(255,50);
  ellipse(vp.x, vp.y, 10);
  // vp.x = sin(frameCount * 0.03) * 200;
  // vp.y = cos(frameCount * 0.05) * 200;
  translate(-width / 2, -height / 2);

  updateGraphic();
}

function keyPressed() {
  if (keyCode == 88) {
    //X
    save("save.png");
  }
  if (keyCode == 71) {
    //G
    saveGif("save.gif", 10);
  }
  //saveGif("save.gif", 10);
}

function mouseWheel(event) {
  vpz = min(vpz - max(min(event.delta,30),-30), -100);

  print(vpz);
}

function persp(vect3) {
  let k = 1;
  let offset = dist(vect3.x, vect3.y, vp.x, vp.y);
  let x = vect3.x;
  x += ((vect3.x - vp.x) / (vect3.z - vpz)) * -vpz * k;
  let y = vect3.y;
  y += ((vect3.y - vp.y) / (vect3.z - vpz)) * -vpz * k;

  return createVector(x, y);
}
