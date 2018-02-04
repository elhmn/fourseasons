var canvas;
var bckg;
var enterBox = [65, 200, 265, 100];
var mapX = 25;
var mapY = 25;
var mapWidth = 350;
var mapHeight = 350;
var caseWidth = 35;
var caseHeight = 35;

function setBackground ()
{
	if (canvas.getContext)
	{
		var ctx = canvas.getContext ('2d');
		ctx.fillStyle = '#3A3A3A';
		ctx.fillRect (0, 0, 400, 400);

		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect (mapX, mapY, mapWidth, mapHeight);

		ctx.strokeStyle = '#E2E2E2';
		ctx.beginPath ();
		ctx.moveTo (mapX, mapY);
		for (var i = mapX; i < mapWidth + mapX; i += caseWidth)
			for (var j = mapY; j < mapHeight + mapY; j += caseHeight)
				ctx.strokeRect (i, j, caseWidth, caseHeight);

		bckg = ctx.getImageData (0, 0, canvas.width, canvas.height);
		console.log ("OK setBackground");
	}
	else
	{
		console.log ("KO setBackground");
	}
}

function reloadBackground ()
{
	if (canvas.getContext)
	{
		var ctx = canvas.getContext ('2d');
		ctx.clearRect (0, 0, 400, 400);
		ctx.putImageData (bckg, 0, 0);
		console.log ("OK reloadBackground");
	}
	else
	{
		console.log ("KO reloadBackground");
	}
}

var playButton = new Image ();
var elemParticle = new Image ();
var fire = new Image ();
var water = new Image ();
var earth = new Image ();
var air = new Image ();

function loadImages ()
{
	playButton.src = '../img/enter.png';
	elemParticle.src = '../img/elementary_particle.png';
	fire.src = '../img/fire.png';
	water.src = '../img/water.png';
	earth.src = '../img/earth.png';
	air.src = '../img/air.png';
}

function setPlayButton ()
{
	if (canvas.getContext)
	{
		var ctx = canvas.getContext ('2d');
		ctx.fillStyle = '#999999';
		ctx.fillRect (enterBox [0], enterBox [1], enterBox [2], enterBox [3])
		ctx.drawImage (playButton, 60, 110, 280, 280);
		console.log ("OK setPlayButton");
	}
	else
	{
		console.log ("KO setPlayButton");
	}
}

function mouseHandlerMain (event)
{
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;

	console.log ("x = " + x + " | y = " + y);
	if ((enterBox [0] <= x && x <= enterBox [0] + enterBox [2]) &&
		(enterBox [1] <= y && y <= enterBox [1] + enterBox [3]))
	{
		console.log ("I'm on it");
		canvas.removeEventListener ('click', mouseHandlerMain);
		document.removeEventListener ('keyup', keyHandlerMain, true);
		run_game ();
	}
}

function keyHandlerMain (event)
{
	console.log ("key Press = " + event.key);
	switch (event.key)
	{
		case "Enter":
			canvas.removeEventListener ('click', mouseHandlerMain);
			document.removeEventListener ('keyup', keyHandlerMain, true);
			run_game ();
			break;
		case "Backspace":
			reloadBackground ();
			break;
		case "1":
			tests ();
			break;
		default:
			break;
	}
}

function mainMenu ()
{
	canvas = document.getElementById ('mainMenu');

	setBackground ();
	setPlayButton ();

	var js = document.createElement("script");

	js.type = "text/javascript";
	js.src = "js/game.js";
	document.body.appendChild(js);

	var jsTest = document.createElement("script");

	jsTest.type = "text/javascript";
	jsTest.src = "js/renderGame.js";
	document.body.appendChild(jsTest);

	canvas.addEventListener ('click', mouseHandlerMain);
	document.addEventListener ('keyup', keyHandlerMain, true);
}

function reloadMenu ()
{
	reloadBackground ();
	setPlayButton ();

	canvas.addEventListener ('click', mouseHandlerMain);
	document.addEventListener ('keyup', keyHandlerMain, true);
}

loadImages ();