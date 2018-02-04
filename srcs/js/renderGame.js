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
					console.log ("case BLOCK");
					ctx.fillStyle = '#7f7f7f';
					ctx.fillRect (x, y, caseWidth, caseHeight)
					break;
				case EntityType.BLACKHOLE:
					console.log ("case BLACKHOLE");
					ctx.fillStyle = '#000000';
					ctx.fillRect (x, y, caseWidth, caseHeight)
					break;
				case EntityType.HERO:
					console.log ("case HERO");
					ctx.drawImage (elemParticle, x, y, caseWidth, caseHeight);
					break;
				case EntityType.FIRE:
					console.log ("case FIRE");
					ctx.drawImage (fire, x, y, caseWidth, caseHeight);
					break;
				case EntityType.WATER:
					console.log ("case WATER");
					ctx.drawImage (water, x, y, caseWidth, caseHeight);
					break;
				case EntityType.EARTH:
					console.log ("case EARTH");
					ctx.drawImage (earth, x, y, caseWidth, caseHeight);
					break;
				case EntityType.AIR:
					console.log ("case AIR");
					ctx.drawImage (air, x, y, caseWidth, caseHeight);
				default:
					console.log ("case VOID (default)");
					break;
			}
		}
	}
}