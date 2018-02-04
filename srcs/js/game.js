var entityList = [[]];

var player = null;

var level = 
[
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
];


var EntityType = 
{
    BLOCK : 0,
    HERO : 1,
    INC_P : 2,
    INC_PP : 3,
    INC_M : 4,
    INC_MM : 5,
    BLACKHOLE : 6
};

//Set object as constant
Object.freeze(Entity);

//Hero There must only be one hero in the game
var Hero = function ()
{
    this.speed = 1;
    console.log("Hero object created");
};

var Block = function ()
{
    console.log("Block object created");
};

var IncP = function ()
{
    console.log("IncP object created");
};

var IncPP = function ()
{
    console.log("IncPP object created");
};

var IncM = function ()
{
    console.log("IncM object created");
};

var IncMM = function ()
{
    console.log("IncMM object created");
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

//Interactable objects
var Interactable = function(alter)
{
    this.alter = (typeof alter === 'function') ? alter : null;
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

        case EntityType.INC_P:
            objTmp = new IncP();
        break;

        case EntityType.INC_PP:
            objTmp = new IncPP();
        break;

        case EntityType.INC_M:
            objTmp = new IncM();
        break;

        case EntityType.INC_MM:
            objTmp = new IncMM();
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
        entityList.push([]);
        for (var j = 0; j < w; j++)
        {
            var entity = CreateEntity(level[i][j], new Pos(j, i));
            if (entity === null)
            {
                console.log("Error : unable to create entity");
                return ;
            }
            entityList[i].push(entity);
        }
    }
}

ShowEntityList = function ()
{ 
    var h = entityList.length;
    for (var i = 0; i < h; i++)
    {
        var w = entityList[i].length;
        for (var j = 0; j < w; j++)
        {
            process.stdout.write("[" + entityList[i][j].type + "]");
            if (j != w - 1)
                process.stdout.write(", ");
        }
        process.stdout.write("\n");
    }
};

var canvas = null;
var ctx = null;

var run_game = function ()
{
    canvas = document.getElementById('game');
    if (canvas !== null && canvas.getContext)
    {
        ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);

        CreateLevel(level);
        console.log(entityList);
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