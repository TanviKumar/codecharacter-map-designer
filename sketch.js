var numberOfRows; //determine the number of rows we want
var numberOfColumns; //determine the number of columns we want

var xStep; //determine the size of the gap between two points on the x axis
var yStep; //determine the size of the gap between two points on the y axis

var positions = []; //an array of positions where we will store each of our Vectors

var codecharmap = [];

var landColor, waterColor, t1Color, t2Color, flagColor;
var count;
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

	//Init Land Color
	landColor = document.getElementById("land").value;
  
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
			fill(landColor);
			rect(positions[count].x, positions[count].y, xStep, yStep);
			count++;
    	}
	}

}

function mouseClicked() {
	let xIndex = int(mouseX / xStep);
	let yIndex = int(mouseY / yStep);
	codecharmap[xIndex][yIndex] = document.getElementById("terrain").value;
	if (codecharmap[xIndex][yIndex] == 1 || codecharmap[xIndex][yIndex] == 2 || codecharmap[xIndex][yIndex] == 4)
		codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = codecharmap[xIndex][yIndex];
	if (codecharmap[xIndex][yIndex] == 0) {
		codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = 3;
	}
	if (codecharmap[xIndex][yIndex] == 3) {
		codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = 0;
	}
	drawMap();
}

function mouseDragged() {
	let xIndex = int(mouseX / xStep);
	let yIndex = int(mouseY / yStep);
	codecharmap[xIndex][yIndex] = document.getElementById("terrain").value;
	if (codecharmap[xIndex][yIndex] == 1 || codecharmap[xIndex][yIndex] == 2 || codecharmap[xIndex][yIndex] == 4)
		codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = codecharmap[xIndex][yIndex];
	if (codecharmap[xIndex][yIndex] == 0) {
		codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = 3;
	}
	if (codecharmap[xIndex][yIndex] == 3) {
		codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = 0;
	}
	drawMap();
	return false;
}

function drawMap() {
	landColor = document.getElementById("land").value;
	waterColor = document.getElementById("water").value;
	t1Color = document.getElementById("t1").value;
	t2Color = document.getElementById("t2").value;
	flagColor = document.getElementById("f").value;
	background(landColor);
	count = 0;
	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[i][j] == 2) {
				fill(waterColor);
			} else if (codecharmap[i][j] == 1) {
				fill(landColor);
			} else if (codecharmap[i][j] == 0) {
				fill(t1Color);
			} else if (codecharmap[i][j] == 3) {
				fill(t2Color);
			} else if (codecharmap[i][j] == 4) {
				fill(flagColor);
			}
			rect(positions[count].x, positions[count].y, xStep - 10, yStep - 10);
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
			else if (codecharmap[j][i] == 0) {
				currentMap = currentMap + '1 ';
			}
			else if (codecharmap[j][i] == 3) {
				currentMap = currentMap + '2 ';
			}
			else if (codecharmap[j][i] == 4) {
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
