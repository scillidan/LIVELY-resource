let seedNum;
let noiseImg;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noiseImg = createGraphics(width, height);
	noiseImg.noStroke();
	noiseImg.fill(0);
	for(let i = 0; i < width * height * 0.3; i++)
	{
		let x = random(width);
		let y = random(height);
		let d = noise(0.01 * x , 0.01 * y) * 0.5 + 1;
		noiseImg.ellipse(x, y, d, d);
	}
	
	ellipseMode(CENTER);
	seedNum = int(random(10000));
}

function draw() {
	if(frameCount % 120 == 0){
		randomSeed();
		//seedNum = int(random(10000));
	} 
	randomSeed(seedNum);
	background(0);
	noStroke();
	fill(255);
	cloud(-random(1000),height /2 - height * 0.1, height * 0.2);
	image(noiseImg, 0, - height * 0.05);
	image(noiseImg, 0, - height * 0.1);
	cloud(0, height /2,height * 0.225);
	image(noiseImg, 0, 0);
	cloud(-random(1000),height /2 + height * 0.1,height * 0.25);
	
	fill(0);
	rect (0, height/2, width, height);
	
	fill(255);
	let frameRatio = frameCount % 100 / 100;
	for(let y = height/2 + 5; y < height; y += map(y , height/2, height, 5, 25))
	{
		let span = map(y , height/2, height, 10, 50);
		fill(0);
		if(random() < 0.15)ellipse(random(width), y , span * random(5, 10), span * random(2, 6));
		fill(255);
		for(let x = noise(y, frameCount * 0.005) * -20 - frameRatio * span ; x < width; x += span)
		{
			rect(x, y, span * 0.5, 1);
		}
	}
	
}

function cloud(noiseOff, baseY, maxOff)
{
	let x = -maxOff;
	beginShape();
	while(x < width + maxOff)
	{
			let yOffset = noise(x * 0.01 + frameCount /1000 + noiseOff, baseY) * maxOff;
			let y = baseY - yOffset;
			let dia = (noise(x * 0.01, baseY * 0.01)  + 0.1)* (maxOff);
			ellipse(x, y, dia, dia);
			vertex(x, y);
			x += dia * 0.35;
	}
	vertex(width, baseY);
	vertex(width, height);
	vertex(0, height);
	vertex(0, baseY);
	endShape(CLOSE);

}


////////////////////////

const URL = "https://coolors.co/ef476f-ffd166-06d6a0-118ab2-073b4c";
const COLS = createCols(URL);

function randSelFromArr(arr, num)
{
	if(arr.length < num) return arr;
	let cloneArr = arr.slice();
	let outArr = [];
	for(let i = 0; i < num; i++)
	{
		let ri = int(random(cloneArr.length));
		let sn = cloneArr[ri];
		outArr. push(sn);
		cloneArr.splice(ri, 1);
	}
	return outArr;
}

//coolorsのurlからカラーコードの配列を生成する
function createCols(url)
{
	let slaIndex = url.lastIndexOf(url);
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++) colArr[i] = "#" + colArr[i];
	return colArr;
}