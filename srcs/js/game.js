'use strict';

var entities = [];

var player = null;

var levelList = 
[
        //LEVEL 1
    [[4,7,0,0,7,7,0,7,7,7],
    [0,7,0,0,7,7,0,7,7,7],
    [0,7,0,0,7,7,3,7,7,7],
    [0,7,0,0,7,7,0,7,7,7],
    [0,7,0,0,7,7,0,7,7,7],
    [0,7,0,0,7,7,0,7,0,7],
    [0,7,0,0,7,7,1,7,0,3],
    [0,7,4,0,7,7,7,7,3,0],
    [2,7,0,0,7,7,7,7,0,0],
    [1,7,0,0,7,7,7,7,0,8]],

    //LEVEL 2
    [[1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,7,7,0,0,0,1],
    [1,3,3,4,7,7,0,0,4,1],
    [1,7,0,7,0,0,0,0,0,1],
    [1,0,7,7,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1],
    [1,0,7,0,7,0,7,0,8,1],
    [1,1,1,1,1,1,1,1,1,1]],

    //LEVEL 3
    [[4,5,0,5,0,5,7,7,5,7],
    [0,1,7,7,7,7,7,7,7,7],
    [0,1,7,7,7,7,7,7,7,7],
    [0,1,7,0,7,5,7,7,5,7],
    [0,1,7,1,7,7,7,7,7,7],
    [4,1,7,7,7,7,7,7,7,7],
    [0,1,7,7,7,7,7,7,7,7],
    [4,1,7,7,7,7,7,7,0,0],
    [0,1,7,7,7,7,7,7,0,0],
    [2,1,7,7,7,7,7,7,0,8]],

    //LEVEL 4
    [[1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,8,0,0,1,1],
    [1,1,0,1,0,1,0,0,0,1],
    [1,0,0,0,0,5,0,4,1,1],
    [1,7,7,7,7,7,7,7,0,1],
    [1,0,0,0,0,0,0,7,1,1],
    [1,0,0,4,1,0,0,0,1,1],
    [1,5,0,0,0,0,0,0,1,1],
    [1,2,5,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1]],

    //LEVEL 5
    [[8,0,0,7,7,1,0,7,0,4],
    [0,0,7,4,5,1,4,0,0,1],
    [0,0,7,0,0,1,6,1,0,0],
    [7,7,7,7,7,7,0,7,7,7],
    [7,7,7,7,7,7,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7],
    [1,0,6,0,6,0,0,0,1,0],
    [1,0,0,5,0,7,0,3,1,6],
    [1,0,0,0,0,0,0,3,1,2]],

    //LEVEL6 
    [[1,4,1,0,5,4,0,0,3,1],
    [1,7,7,0,0,8,0,0,7,1],
    [0,7,7,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,5,1],
    [0,3,1,7,7,0,7,7,7,1],
    [0,6,7,7,7,0,7,7,7,0],
    [0,0,1,1,1,1,1,1,1,1],
    [0,0,0,7,0,0,4,0,0,1],
    [0,0,1,4,0,0,0,0,0,1],
    [0,1,0,0,0,0,0,0,2,1]]
];

var game = 
{
    levels : levelList,
    currentLevel : 0,
    partCount : 0,
	posXEnd : 0,
	posYEnd : 0
}


var EntityType =
{
	EMPTY : 0,
	BLOCK : 1,
	HERO : 2,
	WATER : 3,
	FIRE : 4,
	EARTH : 5,
	AIR : 6,
	BLACKHOLE : 7,
	END : 8
};

//Set object as constant
Object.freeze(Entity);

var Pos = function (x, y)
{
    this.x = x;
    this.y = y;
}

//Base game object class
var Entity = function (object, entityType, pos)
{
    this.type = entityType;
    this.object = object;
    this.pos = pos;
};

var EntityType =
{
	EMPTY : 0,
	BLOCK : 1,
	HERO : 2,
	WATER : 3,
	FIRE : 4,
	EARTH : 5,
	AIR : 6,
	BLACKHOLE : 7,
	END : 8
};

//Set object as constant
Object.freeze(Entity);

var Pos = function (x, y)
{
    this.x = x;
    this.y = y;
};

//Base game object class
var Entity = function (object, entityType, pos)
{
    this.type = entityType;
    this.object = object;
    this.pos = pos;
};

//Hero There must only be one hero in the game
var Hero = function ()
{
    this.won = false;
    this.speed = 1;
    this.speedMax = 10;
    this.isAlive = true;
    this.collected = 0;
	this.imOnEnd = false;

    this.move = function (keyValue)
    {
        //Implement movements
        var old_x = player.pos.x;
        var old_y = player.pos.y;
        var n_x = player.pos.x;
        var n_y = player.pos.y;
        var mvt_speed = player.object.speed;
		var xAxis;
		var mvt;

		console.log ("Player Particule Current Count = " + player.object.collected + " | Total Particules on Level = " + game.partCount);

        switch(keyValue)
        {
            case "ArrowRight":
                n_x += mvt_speed;
				xAxis = true;
				mvt = 1;
                break;

            case "ArrowLeft":
                n_x -= mvt_speed;
				xAxis = true;
				mvt = -1;
                break;

            case "ArrowDown":
                n_y += mvt_speed;
				xAxis = false;
				mvt = 1;
                break;

            case "ArrowUp":
                n_y -= mvt_speed;
				xAxis = false;
				mvt = -1;
                break;

            default:
                console.log("key unhandled");
            break;
        }

        //Check map limits
        var w = entities[0].length;
        if (n_x >= w)
            n_x = w - 1;
        else if (n_x < 0)
            n_x = 0;
        var h = entities.length;
        if (n_y >= h)
            n_y = h - 1;
        else if (n_y < 0)
            n_y = 0;

		var blockIsNext = false;
		var moveOver = false;
		if (xAxis)
		{
			var max = n_x + mvt;
			for (var tmp_x = old_x + mvt; tmp_x != max; tmp_x += mvt)
			{
				console.log ("tmp_x = " + tmp_x + " | old_x = " + old_x + " | n_x = " + n_x + " | mvt = " + mvt + " | Over = " + moveOver + " | blockIsNext = " + blockIsNext);
				switch (entities[n_y][tmp_x].type)
				{
					case EntityType.EMPTY:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_x == max - mvt)
						{
							var tmp = entities[n_y][tmp_x];
							entities[n_y][tmp_x] = player;
							player.pos = new Pos(tmp_x, n_y);
							entities[old_y][old_x] = tmp;
						}
						break;
					case EntityType.BLOCK:
						if (! blockIsNext)
						{
							blockIsNext = true;
							tmp_x -= 2 * mvt;
						}
						else
							moveOver = true;
						break;
					case EntityType.BLACKHOLE:
						if (moveOver || tmp_x == max - mvt)
							player.object.isAlive = false;
						break;
					case EntityType.FIRE:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_x == max - mvt)
						{
							player.object.speed = (player.object.speed + 1 > player.object.speedMax) ? player.object.speedMax : player.object.speed + 1;
							player.object.collected++;
							entities[n_y][tmp_x] = player;
							player.pos = new Pos(tmp_x, n_y);
							entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						}
						break;
					case EntityType.WATER:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_x == max - mvt)
						{
							player.object.speed = (player.object.speed - 1 <= 0) ? 1 : player.object.speed - 1;
							player.object.collected++;
							entities[n_y][tmp_x] = player;
							player.pos = new Pos(tmp_x, n_y);
							entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						}
						break;
					case EntityType.EARTH:
						moveOver = true;
						player.object.collected++;
						entities[n_y][tmp_x] = player;
						player.pos = new Pos(tmp_x, n_y);
						entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						break;
					case EntityType.AIR:
						max = (mvt > 0) ? w : -1;
						player.object.collected++;
						entities[n_y][tmp_x] = CreateEntity(EntityType.EMPTY, new Pos(tmp_x, n_y));
						break;
					case EntityType.END:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_x == max - mvt)
						{
							if (player.object.collected == game.partCount)
								player.object.won = true;
							entities[n_y][tmp_x] = player;
							player.pos = new Pos(tmp_x, n_y);
							entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
							player.object.imOnEnd = true;
						}
						break;
					default:
						break;
				}

				if (moveOver)
					break;
			}
		}
		else
		{
			var max = n_y + mvt;
			for (var tmp_y = old_y + mvt; tmp_y != max; tmp_y += mvt)
			{
				console.log ("tmp_y = " + tmp_y + " | old_y = " + old_y + " | n_y = " + n_y + " | mvt = " + mvt + " | Over = " + moveOver + " | blockIsNext = " + blockIsNext);
				switch (entities[tmp_y][n_x].type)
				{
					case EntityType.EMPTY:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_y == max - mvt)
						{
							var tmp = entities[tmp_y][n_x];
							entities[tmp_y][n_x] = player;
							player.pos = new Pos(n_x, tmp_y);
							entities[old_y][old_x] = tmp;
						}
						break;
					case EntityType.BLOCK:
						if (! blockIsNext)
						{
							blockIsNext = true;
							tmp_y -= 2 * mvt;
						}
						else
							moveOver = true;
						break;
					case EntityType.BLACKHOLE:
						if (moveOver || tmp_y == max - mvt)
							player.object.isAlive = false;
						break;
					case EntityType.FIRE:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_y == max - mvt)
						{
							player.object.speed = (player.object.speed + 1 > player.object.speedMax) ? player.object.speedMax : player.object.speed + 1;
							player.object.collected++;
							entities[tmp_y][n_x] = player;
							player.pos = new Pos(n_x, tmp_y);
							entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						}
						break;
					case EntityType.WATER:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_y == max - mvt)
						{
							player.object.speed = (player.object.speed - 1 <= 0) ? 1 : player.object.speed - 1;
							player.object.collected++;
							entities[tmp_y][n_x] = player;
							player.pos = new Pos(n_x, tmp_y);
							entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						}
						break;
					case EntityType.EARTH:
						moveOver = true;
						player.object.collected++;
						entities[tmp_y][n_x] = player;
						player.pos = new Pos(n_x, tmp_y);
						entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						break;
					case EntityType.AIR:
						max = (mvt > 0) ? h : -1;
						player.object.collected++;
						entities[tmp_y][n_x] = CreateEntity(EntityType.EMPTY, new Pos(n_x, tmp_y));
						break;
					case EntityType.END:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_y == max - mvt)
						{
							if (player.object.collected == game.partCount)
								player.object.won = true;
							entities[tmp_y][n_x] = player;
							player.pos = new Pos(n_x, tmp_y);
							entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
							player.object.imOnEnd = true;
						}
						break;
					default:
						break;
				}

				if (moveOver)
					break;
			}
		}

		if (player.object.imOnEnd)
			 player.object.restoreEnd ();
    };

	this.restoreEnd = function ()
    {
		if (player.pos.x == game.posXEnd && player.pos.y == game.posYEnd)
			return;
		else
		{
			entities[game.posYEnd][game.posXEnd] = CreateEntity(EntityType.END, new Pos(game.posXEnd, game.posYEnd));
			player.object.imOnEnd = false;
		}
	};

    console.log("Hero object created");
};

var Block = function ()
{
    console.log("Block object created");
};

var Empty = function ()
{
    console.log("Empty object created");
};

//Water slows player down
var Water = function ()
{
    console.log("Water object created");
};

//Fire speeds player up
var Fire = function ()
{
    console.log("Fire object created");
};

//Earth pull you down
var Earth = function ()
{
    console.log("Earth object created");
};

//
var Air = function ()
{
    console.log("Air object created");
};

var BlackHole = function ()
{
    console.log("BlackHole object created");
}

var End = function ()
{
    console.log("End object created");
}
var CreateEntity = function (entityType, pos)
{
    var objTmp = null;
    switch (entityType)
    {
        case EntityType.HERO:
            if (player !== null)
            {
                console.log("Error : can only have one hero");
                return null;
            }
            objTmp = new Hero();
        break;

        case EntityType.BLACKHOLE:
            objTmp = new BlackHole();
        break;

        case EntityType.FIRE:
            objTmp = new Fire();
            game.partCount++;
        break;

        case EntityType.WATER:
            objTmp = new Water();
            game.partCount++;
        break;

        case EntityType.EARTH:
            objTmp = new Earth();
            game.partCount++;
        break;

        case EntityType.AIR:
            objTmp = new Air();
            game.partCount++;
        break;

        case EntityType.BLOCK:
            objTmp = new Block();
        break;

        case EntityType.EMPTY:
            objTmp = new Empty();
        break;

        case EntityType.END:
            objTmp = new End();
			game.posXEnd = pos.x;
			game.posYEnd = pos.y;
        break;

        default:
            console.log("EntityType Undifined : ", entityType);
            return null;
        break;
    }
    var tmp = new Entity(objTmp, entityType, pos);
    if (entityType == EntityType.HERO)
        player = tmp;
    return tmp;
};


var CreateLevel = function ()
{
    if (game.currentLevel == levelList.length)
    {
        canvas.removeEventListener ('click', mouseHandlerGame);
        document.removeEventListener ('keyup', keyHandlerGame, true);
        backToMenu ();
    }
    var map = game.levels[game.currentLevel];
    var h = map.length;
    game.partCount = 0;
    player = null;
    entities = [];
    for (var i = 0; i < h; i++)
    {
        var w = map[i].length;
        entities.push([]);
        for (var j = 0; j < w; j++)
        {
            var entity = CreateEntity(map[i][j], new Pos(j, i));
            if (entity === null)
            {
                console.log("Error : unable to create entity");
                return ;
            }
            entities[i].push(entity);
        }
    }
    console.log(entities);//Debug
}

/*
var ShowEntityList = function ()
{
    var h = entities.length;
    for (var i = 0; i < h; i++)
    {
        var w = entities[i].length;
        for (var j = 0; j < w; j++)
        {
            process.stdout.write("[" + entities[i][j].type + "]");
            if (j != w - 1)
                process.stdout.write(", ");
        }
        process.stdout.write("\n");
    }
};
*/

var check_game_state = function ()
{
    if (! player.object.isAlive)
    {
        CreateLevel();
        //reset level;
    }

    if (player.object.won)
    {
        console.log("he won");
        if (game.currentLevel < game.levels.length)
        {
            game.currentLevel++;
            CreateLevel();
        }
    }
}

var mouseHandlerGame = function (event)
{
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;

	console.log ("x = " + x + " | y = " + y);

	if (checkZone (reloadBox, x, y))
	{
        CreateLevel();
        reloadBackground();
        renderGame();
        placeButtons ();
        console.log ("Reload");
	}

	if (checkZone (backBox, x, y))
	{
		console.log ("I'm out");
		canvas.removeEventListener ('click', mouseHandlerGame);
		document.removeEventListener ('keyup', keyHandlerGame, true);
		backToMenu ();
    }

    if (checkZone (leftBox, x, y))
    {
        player.object.move("ArrowLeft");
        check_game_state();
        renderGame();
    }
    else if (checkZone (rightBox, x, y))
    {
        player.object.move("ArrowRight");
        check_game_state();
        renderGame();
    }
    else if (checkZone (topBox, x, y))
    {
        player.object.move("ArrowUp");
        check_game_state();
        renderGame();
    }
    else if (checkZone (bottomBox, x, y))
    {
        player.object.move("ArrowDown");
        check_game_state();
        renderGame();
    }
}

var keyHandlerGame = function (event)
{
    var code = event.key;
    console.log(code);
    switch (code)
    {
        case "b":
            canvas.removeEventListener ('click', mouseHandlerGame);
            document.removeEventListener ('keyup', keyHandlerGame, true);
            backToMenu ()
            return;

        case "r":
            CreateLevel();
            reloadBackground();
            renderGame();
            placeButtons ();
            return;

        case "ArrowRight":
            break;

        case "ArrowLeft":
            break;

        case "ArrowDown":
            break;

        case "ArrowUp":
            break;

        default:
            console.log("key unhandled");
            return ;

    }

    //
    player.object.move(code);
    check_game_state();
    renderGame();
}

var run_game = function ()
{
    if (canvas !== null && canvas.getContext)
    {
        game.currentLevel = 0;
        CreateLevel();

		canvas.addEventListener ('click', mouseHandlerGame);
        document.addEventListener('keyup', keyHandlerGame, false);
        reloadBackground();
        renderGame();
        placeButtons ();
    }
    else
        console.log("Error : Canvas not Supported");
}