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
		ctx.drawImage (playButton, 0, 0);
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
	console.log ("offLeft = " + offLeft);
	var offTop = canvas.offsetTop;
	console.log ("offTop = " + offTop);

	console.log ("x = " + (event.pageX - offLeft) + " | y = " + (event.pageY - offTop));
}

function keyHandler (event)
{
	console.log ("key Press = " + event.key);
}

function mainMenu ()
{
	canvas = document.getElementById ('mainMenu');

	setBackground ();
	setPlayButton ();

	canvas.addEventListener ('click', mouseHandler, false);
	canvas.addEventListener ('keyup', keyHandler, false);
}

loadImages ();