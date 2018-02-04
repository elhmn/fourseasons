var canvas = null;
var bckg;
var enterBox = [100, 300, 300, 100];
var reloadBox = [396, 8, 34, 34];
var backBox = [440, 8, 34, 34];
var mapX = 50;
var mapY = 50;
var mapWidth = 400;
var mapHeight = 400;
var caseWidth = 40;
var caseHeight = 40;

function setBackground ()
{
    if (canvas !== null && canvas.getContext)
    {
		var ctx = canvas.getContext ("2d");
		ctx.fillStyle = '#3A3A3A';
		ctx.fillRect (0, 0, canvas.width, canvas.height);

		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect (mapX, mapY, mapWidth, mapHeight);

		ctx.strokeStyle = '#E2E2E2';
		ctx.beginPath ();
		ctx.moveTo (mapX, mapY);
		for (var i = mapX; i < mapWidth + mapX; i += caseWidth)
			for (var j = mapY; j < mapHeight + mapY; j += caseHeight)
				ctx.strokeRect (i, j, caseWidth, caseHeight);

		bckg = ctx.getImageData (0, 0, canvas.width, canvas.height);
	}
    else
        console.log ("Error : Canvas not Supported");
}

function reloadBackground ()
{
    if (canvas !== null && canvas.getContext)
    {
		var ctx = canvas.getContext ("2d");
		ctx.clearRect (0, 0, canvas.width, canvas.height);
		ctx.putImageData (bckg, 0, 0);
	}
    else
        console.log ("Error : Canvas not Supported");
}

var playButton = new Image ();
var reloadButton = new Image ();
var backButton = new Image ();
var elemParticle = new Image ();
var fire = new Image ();
var water = new Image ();
var earth = new Image ();
var air = new Image ();
var end = new Image ();

function loadImages ()
{
	playButton.src = '../img/enter.png';
	reloadButton.src = '../img/reload.png';
	backButton.src = '../img/back.png';
	elemParticle.src = '../img/elementary_particle.png';
	fire.src = '../img/fire.png';
	water.src = '../img/water.png';
	earth.src = '../img/earth.png';
	air.src = '../img/air.png';
	end.src = '../img/end.png';
}

function setPlayButton ()
{
    if (canvas !== null && canvas.getContext)
    {
		var ctx = canvas.getContext ("2d");
		ctx.fillStyle = '#999999';
		ctx.fillRect (enterBox [0], enterBox [1], enterBox [2], enterBox [3])
		ctx.drawImage (playButton, enterBox [0] + 15, enterBox [1] + 10, enterBox [2] - 30, enterBox [3] - 20);
	}
    else
        console.log ("Error : Canvas not Supported");
}

function checkZone (Box, x, y)
{
	if ((Box [0] <= x && x <= Box [0] + Box [2]) &&
		(Box [1] <= y && y <= Box [1] + Box [3]))
		return true;
	return false;
}

function mouseHandlerMain (event)
{
    if (canvas !== null && canvas.getContext)
    {
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;

		if (checkZone (enterBox, x, y))
		{
			canvas.removeEventListener ('click', mouseHandlerMain);
			document.removeEventListener ('keyup', keyHandlerMain, true);
			run_game ();
		}
	}
    else
        console.log ("Error : Canvas not Supported");
}

function keyHandlerMain (event)
{
    if (canvas !== null && canvas.getContext)
    {
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
			default:
				break;
		}
	    }
    else
        console.log ("Error : Canvas not Supported");
}

function mainMenu ()
{
	canvas = document.getElementById ('mainMenu');
    if (canvas !== null && canvas.getContext)
    {
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
    else
        console.log ("Error : Canvas not Supported");

}

function backToMenu ()
{
    if (canvas !== null && canvas.getContext)
    {
		reloadBackground ();
		setPlayButton ();

		canvas.addEventListener ('click', mouseHandlerMain);
		document.addEventListener ('keyup', keyHandlerMain, true);
    }
    else
        console.log ("Error : Canvas not Supported");
}

loadImages ();