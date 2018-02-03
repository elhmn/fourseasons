var earth = new Image ();

function loadImages ()
{
	earth.src = 'earth.png';
}

function draw (canvas, ctx)
{
	ctx.fillStyle = 'rgba(0, 255, 0, 1.0)';
	ctx.fillRect (0, 0, 640, 480)

	ctx.fillStyle = '#ff00ff';
	ctx.beginPath ();
	ctx.moveTo (640, 480);
	ctx.lineTo (640, 0)
	ctx.lineTo (0, 480)
	ctx.fill ();

	ctx.drawImage (earth, 0, 0);
	console.log ("OK Draw");
}

function clearCanvas (canvas, ctx)
{
	ctx.clearRect (0, 0, canvas.width, canvas.height);
	console.log ("OK Clear");
}

function mainMenu ()
{
	var opt;
	var canvas = document.getElementById ('mainMenu');
	var offLeft = canvas.offsetLeft;
	console.log ("offLeft = " + offLeft);
	var offTop = canvas.offsetTop;
	console.log ("offTop = " + offTop);

	canvas.addEventListener ('click', function (event) {
		console.log ("x = " + (event.pageX - offLeft) + " | y = " + (event.pageY - offTop));
		}, false);

	if (canvas.getContext)
	{
		var ctx = canvas.getContext ('2d');

		draw (canvas, ctx);
//		clearCanvas (canvas, ctx);
//		draw (ctx);
		console.log ("OK");
	}
	else
	{
		console.log ("KO");
	}
}

loadImages();