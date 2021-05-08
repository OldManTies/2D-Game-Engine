class Item {
    pos;
    dir;

    constructor(pos, dir) {
        this.pos = pos;
        this.dir = dir;
    }
}

var Canvas = document.getElementById("BackgroundCanvas");
var CanvasContext = Canvas.getContext("2d");

Canvas.height = document.documentElement.clientHeight;
Canvas.width = document.documentElement.clientWidth;

var XN = new Item(new Vector2D(Canvas.width/2, Canvas.height/2), 
    new DirVector2D(270));

Animate();

function Animate() {
    setTimeout(function() {
        Update();
        requestAnimationFrame(Animate);
    }, 1000 / 60);
}

function Update() {
    // draw the vector2d position
    CanvasContext.clearRect(0, 0, Canvas.width, Canvas.height);
    CanvasContext.beginPath();
    CanvasContext.rect(XN.pos.x-20, XN.pos.y-20, 40, 40);
    CanvasContext.fillStyle = "black";
    CanvasContext.fill();

    // draw the direction
    CanvasContext.moveTo(XN.pos.x, XN.pos.y);
    CanvasContext.lineTo(XN.pos.x + XN.dir.x * 100, XN.pos.y + XN.dir.y * 100)
    CanvasContext.strokeStyle = "red";
    CanvasContext.stroke();
}

