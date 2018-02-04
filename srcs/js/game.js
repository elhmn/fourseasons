'use strict';

var entities = [];

var player = null;

var level1 = 
{
   map : [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 4, 1],
            [0, 0, 4, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 4, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
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
    this.speedMax = 4;
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

        switch(keyValue)
        {
            case "ArrowRight":
                n_x += mvt_speed;
                break;
        
            case "ArrowLeft":
                n_x -= mvt_speed;
                break;
        
            case "ArrowDown":
                n_y += mvt_speed;
                break;

            case "ArrowUp":
                n_y -= mvt_speed;
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

        if (entities[n_y][n_x].type == EntityType.BLOCK)
        {
            switch(keyValue)
            {
                case "ArrowRight":
                    while (old_x < n_x - 1)
                    {
                        if (entities[n_y][old_x] == EntityType.EARTH
                            && entities[n_y][old_x] == EntityType.WATER
                            && entities[n_y][old_x] == EntityType.BLOCK)
                        {
                            n_x = old_x;
                            break;
                        }
                        old_x++;
                    }
                break;

                case "ArrowLeft":
                    while (old_x > n_x + 1)
                    {
                        if (entities[n_y][old_x] == EntityType.EARTH
                            && entities[n_y][old_x] == EntityType.WATER
                            && entities[n_y][old_x] == EntityType.BLOCK)
                        {
                            n_x = old_x;
                            break;
                        }
                        old_x--;
                    }
                break;
                
                case "ArrowDown":
                    while (old_y < n_y - 1)
                    {
                        if (entities[old_y][n_x] == EntityType.EARTH
                            && entities[old_y][n_x] == EntityType.WATER
                            && entities[old_y][n_x] == EntityType.BLOCK)
                        {
                            n_y = old_y;
                            break;
                        }
                        old_y++;
                    }
                break;

                case "ArrowUp":
                    while (old_y > n_y + 1)
                    {
                        if (entities[old_y][n_x] == EntityType.EARTH
                            && entities[old_y][n_x] == EntityType.WATER
                            && entities[old_y][n_x] == EntityType.BLOCK)
                        {
                            n_y = old_y;
                            break;
                        }
                        old_y--;
                    }
                break;
                default:
                        console.log("key unhandled");
                break;
            }
        }

        switch (entities[n_y][n_x].type)
        {
            case EntityType.BLOCK:
                console.log("I am a Block");
                break;

            case EntityType.EMPTY:
                    var tmp = entities[n_y][n_x];
                    entities[n_y][n_x] = player;
                    player.pos = new Pos(n_x, n_y);
                    if (player.object.wasOnEnd)
                    {
                        entities[old_y][old_x] = EntityType.END;
                        player.object.wasOnEnd = false;
                    }
                    else
                        entities[old_y][old_x] = tmp;
                break;

            case EntityType.BLACKHOLE:
                    player.object.isAlive = false;
                    player.object.partCount++;
                break;

            case EntityType.END:
                if (player.object.canEndLevel)
                {

                 //Start next level;
                 console.log("start next level");
                }
                else
                {
                        player.object.wasReplaced = true;
                        player.object.repObject = entities[n_y][n_x];
                        entities[n_y][n_x] = player;
                        player.pos = new Pos(n_x, n_y);
                        player.object.wasOnEnd = true;//tmp
                }
                break;

            case EntityType.AIR:
                player.object.isOnAirInfluence = true;
                console.log("AIR on ", n_x, ", ", n_y);
                player.object.move(keyValue);
                player.partCount++;
                break;

            case EntityType.EARTH:
                player.object.isPullDown = true;
                player.object.partCount++;
                break;

            case EntityType.WATER:
                player.object.speed = (player.object.speed - 1 <= 0) ? 1 : player.object.speed - 1;
                player.object.partCount++;
                entities[n_y][n_x] = player;
                player.pos = new Pos(n_x, n_y);
                entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
                break;

            case EntityType.FIRE:
                player.object.speed = (player.object.speed + 1 > player.object.speedMax) ? player.object.speedMax : player.object.speed + 1;
                player.object.partCount++;
                entities[n_y][n_x] = player;
                player.pos = new Pos(n_x, n_y);
                entities[old_y][old_x] = CreateEntity(EntityType.EMPTY, new Pos(old_x, old_y));
                break;
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

var keyHandler = function (event)
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

//      Render and EventSetup
//        ctx = canvas.getContext('2d');
        document.addEventListener('keyup', keyHandler, false);
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