var numberOfRows; //determine the number of rows we want
var numberOfColumns; //determine the number of columns we want

var xStep; //determine the size of the gap between two points on the x axis
var yStep; //determine the size of the gap between two points on the y axis

var positions = []; //an array of positions where we will store each of our Vectors

var codecharmap = [];

var landColor, waterColor, t1Color, t2Color;
var count;
let gold_bool = false;
var img;

function setup(){
	clear();
	noStroke();
	img = loadImage('1.png');
	numberOfColumns = + (document.getElementById("sizeRange").value);  
	numberOfRows = numberOfColumns;
	let myCanvas = createCanvas(numberOfRows * 30, numberOfColumns * 30);
	myCanvas.parent("mainDiv");
  	xStep = width / numberOfColumns;
	yStep = height / numberOfRows;
	codecharmap = [];
	positions = [];

	//Init Colors
	landColor = document.getElementById("land").value;
	waterColor = document.getElementById("water").value;
	t1Color = document.getElementById("t1").value;
	t2Color = document.getElementById("t2").value;
  
  	for(var x = xStep / 2 ; x < width; x += xStep) { 
    	for(var y = yStep / 2; y < height; y += yStep) {
      		var p = createVector(x, y); //we create a vector at this location
      		positions.push(p); // and then we put the vector into the array
    	}
	}
	rectMode(CENTER);
	count = 0;
	for (var i = 0; i < numberOfRows; ++i) {
		let mapRow = [];
		for (var j = 0; j < numberOfColumns; ++j) {
			mapRow.push(1);
		}
		codecharmap.push(mapRow);
	}
	console.log(codecharmap);

	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[i][j] == 2 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 2) {
				fill(waterColor);
				codecharmap[i][j] = 2;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 2;
			}
			else if (codecharmap[i][j] == 1 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 1) {
				fill(landColor);
				codecharmap[i][j] = 1;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 1;
			}
			else if (codecharmap[i][j] == 0 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 0) {
				fill(t1Color);
				codecharmap[i][j] = 0;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 0;
			}
			rect(positions[count].x, positions[count].y, xStep, yStep);
			count++;
    	}
	}

}

function mouseClicked() {
	let xIndex = int(mouseX / xStep);
	let yIndex = int(mouseY / yStep);
	codecharmap[xIndex][yIndex] = document.getElementById("terrain").value;
	if (codecharmap[xIndex][yIndex] == 1 || codecharmap[xIndex][yIndex] == 2)
		codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = codecharmap[xIndex][yIndex];
	drawMap();
}

function mouseDragged() {
	let xIndex = int(mouseX / xStep);
	let yIndex = int(mouseY / yStep);
	codecharmap[xIndex][yIndex] = document.getElementById("terrain").value;
	if (codecharmap[xIndex][yIndex] == 1 || codecharmap[xIndex][yIndex] == 2)
		codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = codecharmap[xIndex][yIndex];
	drawMap();
	return false;
}

function drawMap() {
	landColor = document.getElementById("land").value;
	waterColor = document.getElementById("water").value;
	t1Color = document.getElementById("t1").value;
	t2Color = document.getElementById("t2").value;
	background(landColor);
	count = 0;
	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[i][j] == 2) {
				fill(landColor);
				rect(positions[count].x, positions[count].y, xStep - 10, yStep - 10);
				fill(waterColor);
				if(random() > 0)
					rect(positions[count].x, positions[count].y, xStep - 10, yStep - 10);
			}
			else if (codecharmap[i][j] == 1) {
				fill('white');
				rect(positions[count].x, positions[count].y, xStep - 10, yStep - 10);
				fill(landColor);
				rect(positions[count].x, positions[count].y, xStep - 10, yStep - 10);
			}
			else if (codecharmap[i][j] == 0) {
				fill(t1Color);
				rect(positions[count].x, positions[count].y, xStep - 10, yStep - 10);
				//image(img, positions[count].x - 25, positions[count].y - 25, (xStep - 10), (yStep - 10));
			} else if (codecharmap[i][j] == 3) {
				fill(t2Color);
				rect(positions[count].x, positions[count].y, xStep - 10, yStep - 10);
				//image(img, positions[count].x, positions[count].y, xStep - 10, yStep - 10);
			}
			count++;
    	}
	}
	//filter(POSTERIZE, 3);
}

function downloadMap() {
	currentMap = "";
	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[j][i] == 2) {
				currentMap = currentMap + 'W ';
			}
			else if (codecharmap[j][i] == 1) {
				currentMap = currentMap + 'L ';
			}
			else if (codecharmap[j][i] == 0 || codecharmap[j][i] == 3) {
				currentMap = currentMap + 'F ';
			}
		}
		currentMap += '\n';
	}
	let file = new Blob([currentMap], {type : "text/plain;charset=utf-8"});
	var a = document.createElement("a"), url = URL.createObjectURL(file);
	a.href = url;
	a.download = "example.txt";
	document.body.appendChild(a);
	a.click();
	setTimeout(function() {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);  
	}, 0);
}

function setSize(event) {
	document.getElementById("sizeText").innerHTML = event.target.value;
	setup();
}

function noGold(event) {
	if (gold_bool) {
		document.getElementById("boolGold").checked = false;
		gold_bool = false;
	} else {
		gold_bool = true;
		document.getElementById("boolGold").checked = true;
	}
}
