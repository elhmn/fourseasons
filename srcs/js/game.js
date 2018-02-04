'use strict';

var entities = [];

var player = null;

var level1 =
{
  map : [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 4, 1],
            [0, 0, 6, 5, 0, 3, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 4, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 7, 1, 1, 1, 1, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        ],

	partCount : 0
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
}

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
    this.speed = 1;
    this.speedMax = 10;
    this.isPullDown = false;
    this.isAlive = true;
    this.canEndLevel = false;
    this.collected = 0;
    this.isOnBlock = false;
    this.isOnAirInfluence = false;

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
						player.object.isAlive = false;
						moveOver = true;
						break;
					case EntityType.FIRE:
						if (blockIsNext)
							moveOver = true;
						if (moveOver || tmp_x == max - mvt)
						{
							player.object.speed = (player.object.speed + 1 > player.object.speedMax) ? player.object.speedMax : player.object.speed + 1;
							player.object.partCount++;
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
							player.object.partCount++;
							entities[n_y][tmp_x] = player;
							player.pos = new Pos(tmp_x, n_y);
							entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						}
						break;
					case EntityType.EARTH:
						moveOver = true;
						player.object.partCount++;
						entities[n_y][tmp_x] = player;
						player.pos = new Pos(tmp_x, n_y);
						entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						break;
					case EntityType.AIR:
						max = (mvt > 0) ? w : -1;
						console.log("AIR on ", tmp_x, ", ", n_y);
						player.object.partCount++;
						entities[n_y][tmp_x] = CreateEntity(EntityType.EMPTY, new Pos(tmp_x, n_y));
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
						console.log("I am a Block");
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
							player.object.partCount++;
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
							player.object.partCount++;
							entities[tmp_y][n_x] = player;
							player.pos = new Pos(n_x, tmp_y);
							entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						}
						break;
					case EntityType.EARTH:
						moveOver = true;
						player.object.partCount++;
						entities[tmp_y][n_x] = player;
						player.pos = new Pos(n_x, tmp_y);
						entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
						break;
					case EntityType.AIR:
						max = (mvt > 0) ? h : -1;
						console.log("AIR on ", n_x, ", ", tmp_y);
						player.object.partCount++;
						entities[tmp_y][n_x] = CreateEntity(EntityType.EMPTY, new Pos(n_x, tmp_y));
						break;
					default:
						break;
				}

				if (moveOver)
					break;
			}
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
            level1.partCount++;
        break;

        case EntityType.WATER:
            objTmp = new Water();
            level1.partCount++;
        break;

        case EntityType.EARTH:
            objTmp = new Earth();
            level1.partCount++;
        break;

        case EntityType.AIR:
            objTmp = new Air();
            level1.partCount++;
        break;

        case EntityType.BLOCK:
            objTmp = new Block();
        break;

        case EntityType.EMPTY:
            objTmp = new Empty();
        break;

        case EntityType.END:
            objTmp = new End();
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


var CreateLevel = function (map)
{
    var h = map.length;
    level1.partCount = 0;
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
    if (!player.object.isAlive)
    {
        //reset level;
        console.log("reset level");
        player.object.isAlive = true;
    }

    if (player.object.collected == level1.partCount)
    {
        player.object.canEndLevel = true;
        //
    }
}

var mouseHandlerGame = function (event)
{
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;

	console.log ("x = " + x + " | y = " + y);

	if (checkZone (reloadBox, x, y))
	{
		console.log ("Reload");
	}

	if (checkZone (backBox, x, y))
	{
		console.log ("I'm out");
		canvas.removeEventListener ('click', mouseHandlerGame);
		document.removeEventListener ('keyup', keyHandlerGame, true);
		backToMenu ();
	}
}

var keyHandlerGame = function (event)
{
    var code = event.key;
    console.log(code);
    switch (code)
    {
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
        CreateLevel(level1.map);
        console.log(entities);//Debug

		canvas.addEventListener ('click', mouseHandlerGame);
        document.addEventListener('keyup', keyHandlerGame, false);
        reloadBackground();
        renderGame();
        placeButtons ();
    }
    else
    {
        console.log("Error : Canvas not Supported");
        return ;
    }
}

//setInterval(() => { ShowEntityList(); }, 300);
// ShowEntityList();