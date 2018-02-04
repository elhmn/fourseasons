var entities = [[]];

var player = null;

var level = 
[
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0]
    [0, 0, 0, 0, 0, 0, 0, 0]
];


var EntityType = 
{
    BLOCK : 0,
    HERO : 1,
    WATER : 2,
    FIRE : 3,
    EARTH : 4,
    AIR : 5,
    BLACKHOLE : 6
};

//Set object as constant
Object.freeze(Entity);

//Hero There must only be one hero in the game
var Hero = function ()
{
    this.speed = 1;
    this.speedMax = 4;
    this.isPullDown = false;

    this.move = function (keyValue)
    {
        var x = player.pos.x;
        var y = player.pos.y;
        switch (keyValue)
        {
            case "ArrowRight":
                x += player.speed;
                break;
        
            case "ArrowLeft":
                x -= player.speed;
                break;
        
            case "ArrowDown":
                y += player.speed;
                break;

            case "ArrowUp":
                y -= player.speed;
                break;

            default:
            console.log("key unhandled");
            break;
        }
//        if (x && y)
  //      {
//
    //    }
  //      if ()
  //      {
//
  //      }
   //     entities[][] = ;
    };

    console.log("Hero object created");
};

var Block = function ()
{
    console.log("Block object created");
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

var CreateEntity = function (entityType, pos)
{
    var objTmp = null;
    switch (entityType)
    {
        case EntityType.HERO:
            if (player != null)
            {
                console.log("Error : can only have one hero");
                return null;
            }
            player = objTmp = new Hero();
        break;

        case EntityType.BLACKHOLE:
            objTmp = new BlackHole();
        break;

        case EntityType.FIRE:
            objTmp = new Fire();
        break;

        case EntityType.WATER:
            objTmp = new Water();
        break;

        case EntityType.EARTH:
            objTmp = new Earth();
        break;

        case EntityType.AIR:
            objTmp = new Air();
        break;

        case EntityType.BLOCK:
            objTmp = new Block();
        break;

        default:
            console.log("EntityType Undifined");
            return null;
        break;
    }
    return new Entity(objTmp, entityType, pos);
};


var CreateLevel = function (level)
{
    var h = level.length;
    for (var i = 0; i < h; i++)
    {
        var w = level[i].length;
        entities.push([]);
        for (var j = 0; j < w; j++)
        {
            var entity = CreateEntity(level[i][j], new Pos(j, i));
            if (entity === null)
            {
                console.log("Error : unable to create entity");
                return ;
            }
            entities[i].push(entity);
        }
    }
}

ShowEntityList = function ()
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

var canvas = null;
var ctx = null;

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
            break;
    }
}

var run_game = function ()
{
    canvas = document.getElementById('game');
    if (canvas !== null && canvas.getContext)
    {
        CreateLevel(level);
        console.log(entities);//Debug

//      Render and EventSetup
//        ctx = canvas.getContext('2d');
        document.addEventListener('keyup', keyHandler, true);
    }
    else
    {
        console.log("Error : Canvas not Supported");
        return ;
    }
}

window.onload = run_game;

//setInterval(() => { ShowEntityList(); }, 300);
// ShowEntityList();