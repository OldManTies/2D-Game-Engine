var Vector2D = /** @class */ (function () {
    // set the coordinates
    function Vector2D(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
        return this;
    }
    // move the vector base on the specified coordinates
    Vector2D.prototype.translate = function (transX, transY) {
        this.x += transX;
        this.y += transY;
    };
    // returns the distance to the target (from Vector2D)
    Vector2D.prototype.distanceToVector = function (target) {
        var offsX = this.x - target.x;
        var offsY = this.y - target.y;
        return Math.sqrt(offsX * offsX + offsY * offsY);
    };
    // returns the distance to the target (from xy)
    Vector2D.prototype.distanceToPos = function (targetX, targetY) {
        var offsX = this.x - targetX;
        var offsY = this.y - targetY;
        return Math.sqrt(offsX * offsX + offsY * offsY);
    };
    // returns difference in both coordinates for Vector2D
    Vector2D.prototype.deltaToVector = function (target) {
        var dX = this.x - target.x;
        var dY = this.y - target.y;
        return [dX, dY];
    };
    // returns difference in both coordinates for Vector2D
    Vector2D.prototype.deltaToPos = function (targetX, targetY) {
        var dX = this.x - targetX;
        var dY = this.y - targetY;
        return [dX, dY];
    };
    return Vector2D;
}());
var DirVector2D = /** @class */ (function () {
    // creates vector with initial direction
    function DirVector2D(angle, autoNormalize) {
        if (autoNormalize === void 0) { autoNormalize = false; }
        this.autoNormalize = autoNormalize;
        this.origin = new Vector2D(0, 1);
        // calculate the position for the set angle here
        this.setAngle(angle);
        // if autonormalize is true, normalize the vector
        if (this.autoNormalize)
            this.normalize();
    }
    // get an set the magnitude
    DirVector2D.prototype.mag = function () {
        this.magnitude = calcMagnitude(this.x, this.y);
        return this.magnitude;
    };
    DirVector2D.prototype.setmag = function (value) {
        var nX = value / this.magnitude * this.x;
        var nY = value / this.magnitude * this.y;
        this.x = nX;
        this.y = nY;
        this.magnitude = value;
    };
    // rotates towards a vector object
    DirVector2D.prototype.lookAtVector = function (target) {
    };
    // rotatest towards xy coords
    DirVector2D.prototype.lookAtPos = function (targetX, targetY) {
    };
    // normalizes the vector
    DirVector2D.prototype.normalize = function () {
    };
    // rotates the vector around origin 
    DirVector2D.prototype.rotate = function (angle) {
        // convert degree angle to smallest positive rad
        var wa = smallestPositiveRad(angle);
        /*
                // rotational basecases
                if (wa === deg2rad(180)) {
                    this.invert();
                }
                else if (wa === deg2rad(90)) {
                    let newX : number = this.y;
                    let newY : number = this.x * -1;
                    this.x = newX;
                    this.y = newY;
                }
                else if (wa === deg2rad(270)) {
                    let newX : number = this.y * -1;
                    let newY : number = this.x;
                    this.x = newX;
                    this.y = newY;
                }
                else {
                    let sin: number = Math.sin(wa);
                    let cos: number = Math.cos(wa);
                    let newX: number = this.x * cos - this.y * sin;
                    let newY: number = this.y * cos - this.x * sin;
                    this.x = newX;
                    this.y = newY;
        
                    if (this.autoNormalize) this.normalize();
                    this.calcAngle();
                }
        */
        var sin = Math.sin(wa);
        var cos = Math.cos(wa);
        var newX = this.x * cos - this.y * sin;
        var newY = this.y * cos - this.x * sin;
        this.x = newX;
        this.y = newY;
        if (this.autoNormalize)
            this.normalize();
        this.calcAngle();
    };
    // calculate the angle from origin
    DirVector2D.prototype.calcAngle = function () {
        var num = this.origin.x * this.x + this.origin.y * this.y;
        var den = calcMagnitude(this.x, this.y) +
            calcMagnitude(this.origin.x, this.origin.y);
        this.angle = Math.acos(num / den);
    };
    // forces the angle to given angle
    DirVector2D.prototype.setAngle = function (angle) {
        this.x = this.origin.x;
        this.y = this.origin.y;
        this.rotate(angle);
    };
    // inverts this vector
    DirVector2D.prototype.invert = function () {
        this.x = this.x * -1;
        this.y = this.y * -1;
        return this;
    };
    return DirVector2D;
}());
/*
Helper functions for general math solutions
*/
function deg2rad(angle) {
    return angle * Math.PI / 180;
}
function rad2deg(angle) {
    return angle / Math.PI / 180;
}
// takes a degree angle
function smallestPositiveRad(angle) {
    var temp = angle % 360;
    return deg2rad((temp < 0) ? temp + 360 : temp);
}
function calcMagnitude(posX, posY) {
    return Math.sqrt(posX * posX + posX * posX);
}
