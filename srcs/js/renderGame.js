function placeButtons ()
{
	console.log ("begin placeButtons");

	if (canvas.getContext)
	{
		var ctx = canvas.getContext ('2d');
		ctx.drawImage (reloadButton, reloadBox [0], reloadBox [1], reloadBox [2], reloadBox [3]);
		ctx.drawImage (backButton, backBox [0], backBox [1], backBox [2], backBox [3]);
		console.log ("OK placeButtons");
	}
	else
	{
		console.log ("KO setPlayButton");
	}
}

function renderGame ()
{
	console.log ("begin renderGame");
	reloadBackground ();

	var ctx = canvas.getContext ('2d');
	var x,y;
	for (var i = 0; i < entities.length; i++)
	{
		y = mapY + i * caseHeight;
		for (var j = 0; j < entities[i].length; j++)
		{
			x = mapX + j * caseWidth;
			switch (entities[i][j].type)
			{
				case EntityType.BLOCK:
					ctx.fillStyle = '#7f7f7f';
					ctx.fillRect (x, y, caseWidth, caseHeight)
					break;
				case EntityType.BLACKHOLE:
					ctx.fillStyle = '#000000';
					ctx.fillRect (x, y, caseWidth, caseHeight)
					break;
				case EntityType.HERO:
					ctx.drawImage (elemParticle, x, y, caseWidth, caseHeight);
					break;
				case EntityType.FIRE:
					ctx.drawImage (fire, x, y, caseWidth, caseHeight);
					break;
				case EntityType.WATER:
					ctx.drawImage (water, x, y, caseWidth, caseHeight);
					break;
				case EntityType.EARTH:
					ctx.drawImage (earth, x, y, caseWidth, caseHeight);
					break;
				case EntityType.AIR:
					ctx.drawImage (air, x, y, caseWidth, caseHeight);
					break;
				case EntityType.END:
					ctx.drawImage (end, x, y, caseWidth, caseHeight);
					break;
				default:
					break;
			}
		}
	}
}