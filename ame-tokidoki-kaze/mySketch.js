let img;

function preload() {
	img = loadImage("./nara.jpeg");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	img.resize(width, height);
	background(100);
}

function draw() {
	let ValY = map(mouseY, 0, height, 0, 255);

	for (let i = 0; i < mouseY; i++) {
		let x = int(random(width));
		let y = int(random(height));
		let col = img.get(x, y);
		let br = brightness(col);
		let h = hue(col);
		let w = map(br, 0, 255, 5, 200);
		let angle = map(h, 0, 255, 0, 90);
		noStroke();
		push();
		translate(x, y);
		if (mouseY > 500) {
			rotate(radians(angle));
		} else {
			rotate(radians(90));
		}
		rectMode(CENTER);
		fill(0, random(30, 50), random(150, 170), random(20, 50));
		rect(random(width), random(height), w, 5);
		fill(red(col), green(col), blue(col), 190);
		rect(0, 0, w, 5);
		pop();
	}
}