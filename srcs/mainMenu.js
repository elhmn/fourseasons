var canvas;
var bckg;

function setBackground ()
{
	if (canvas.getContext)
	{
		var ctx = canvas.getContext ('2d');
		ctx.fillStyle = '#3A3A3A';
		ctx.fillRect (0, 0, 400, 400)

		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect (40, 40, 320, 320)

		ctx.strokeStyle = '#E2E2E2';
		ctx.beginPath ();
		ctx.moveTo (40, 40);
		for (var i = 40; i < 360; i += 40)
			for (var j = 40; j < 360; j += 40)
				ctx.strokeRect (i, j, 40, 40);

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

function loadImages ()
{
	playButton.src = 'enter.png';
}

function setPlayButton ()
{
	if (canvas.getContext)
	{
		var ctx = canvas.getContext ('2d');
		ctx.fillStyle = '#999999';
		ctx.fillRect (65, 200, 265, 100)
		ctx.drawImage (playButton, 60, 110, 280, 280);
		console.log ("OK setPlayButton");
	}
	else
	{
		console.log ("KO setPlayButton");
	}
}

function mouseHandler (event)
{
	var offLeft = canvas.offsetLeft;
	var offTop = canvas.offsetTop;

	console.log ("x = " + (event.pageX - offLeft) + " | y = " + (event.pageY - offTop));
}

function keyHandler (event)
{
	console.log ("key Press = " + event.key);
	switch (event.key)
	{
		case "Enter":
			break;
		case "Backspace":
			reloadBackground ();
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

	canvas.addEventListener ('click', mouseHandler);
	document.addEventListener ('keyup', keyHandler, true);
}

loadImages ();