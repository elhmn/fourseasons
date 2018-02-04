var entities = [];

var player = null;

var level1 = 
{
   map : [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 6, 0, 0, 0, 0, 0, 3, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 4, 0, 0],
            [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 7, 0, 0, 0]
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
    this.wasOnEnd = false;

    this.move = function (keyValue)
    {
        //Implement movements
        var old_x = player.pos.x;
        var old_y = player.pos.y;
        var n_x = player.pos.x;
        var n_y = player.pos.y;
        switch (keyValue)
        {
            case "ArrowRight":
                n_x += player.speed;
                break;
        
            case "ArrowLeft":
                n_x -= player.speed;
                break;
        
            case "ArrowDown":
                n_y += player.speed;
                break;

            case "ArrowUp":
                n_y -= player.speed;
                break;

            default:
                console.log("key unhandled");
            break;
        }

        //Check map limits
        var len = entities[0].length;
        if (n_x >= len)
            n_x = len - 1;
        else if (n_x < 0)
            n_x = 0;
        len = entities.length;
        if (n_y >= len)
            n_y = len - 1;
        else if (n_y < 0)
            n_y = 0;

        switch (entities[n_y][n_x].type)
        {
            case EntityType.BLOCK:
                player.object.move(keyValue);
                break;

            case EntityType.EMPTY:
                if (!player.object.isOnBlock && !player.object.isOnAirInfluence)
                {
                    var tmp = entities[n_y][n_x];
                    entities[n_y][n_x] = player;
                    if (player.object.wasOnEnd)
                    {
                        entities[old_y][old_x] = EntityType.END;
                        player.object.wasOnEnd = false;
                    }
                    else
                        entities[old_y][old_x] = tmp;
                }
                break;

            case EntityType.BLACKHOLE:
            if (!player.object.isOnBlock && !player.object.isOnAirInfluence)
            {
                    this.isAlive = false;
                    player.partCount++;
                }
                break;

            case EntityType.END:
                if (player.canEndLevel)
                {
                    
                 //Start next level;
                 console.log("start next level");
                }
                else
                {
                    if (!player.object.isOnBlock && !player.object.isOnAirInfluence)
                    {
                        entities[n_y][n_x] = player;
                        player.object.wasOnEnd = true;
                    }
                }
                break;

            case EntityType.AIR:
                if (player.object.isOnBlock)
                {
                    player.object.isOnBlock = false;
                }
                player.object.isOnAirInfluence = true;
                console.log("AIR on ", n_x, ", ", n_y);
                player.object.move(keyValue);
                player.partCount++;
                break;

            case EntityType.EARTH:
                if (player.object.isOnBlock)
                {
                    player.object.isOnBlock = false;
                }
                if (player.object.isOnAirInfluence)
                {
                    player.object.isOnAirInfluence = false;
                }
                player.isPullDown = true;
                player.partCount++;
                break;

            case EntityType.WATER:
                player.speed--;
                player.partCount++;
                entities[n_y][n_x] = player;
                entities[old_y][old_x] = EntityType.EMPTY;
                break;

            case EntityType.FIRE:
                player.speed++;
                player.partCount++;
                entities[n_y][n_x] = player;
                entities[old_y][old_x] = EntityType.EMPTY;
                break;
        }

        //On Air Element influence
        if (player.object.isOnAirInfluence)
        {
            player.object.move(keyValue);
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
    this.alter = function (player)
    {
        player.speed = (player.speed < 1) ? 1 : player.speed - 1;
    }
};

//Fire speeds player up
var Fire = function ()
{
    console.log("Fire object created");
    this.alter = function (player)
    {
        player.speed = (player.speed > player.speedMax) ? speedMax : player.speed + 1;
    }
};

//Earth pull you down
var Earth = function ()
{
    console.log("Earth object created");
    this.alter = function (player)
    {
        player.isPullDown = true;        
    }
};

//
var Air = function ()
{
    console.log("Air object created");
    this.alter = function (player)
    {
        //DoSomething
    }
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
    if (!player.isAlive)
    {
        //reset level;
        console.log("reset level");
        player.isAlive = true;
    }

    if (player.collected == level1.partCount)
    {
        player.canEndLevel = true;
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
        document.addEventListener('keyup', keyHandler, true);
        reloadBackground();
        renderGame();
    }
    else
    {
        console.log("Error : Canvas not Supported");
        return ;
    }
}

//setInterval(() => { ShowEntityList(); }, 300);
// ShowEntityList();