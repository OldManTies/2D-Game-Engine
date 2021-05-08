class Vector2D {
    x: number;
    y: number;

    // set the coordinates
    constructor(xPos: number, yPos: number) {
        this.x = xPos;
        this.y = yPos;
        return this;
    }

    // move the vector base on the specified coordinates
    translate(transX: number, transY: number) : void {
        this.x += transX;
        this.y += transY;
    }

    // returns the distance to the target (from Vector2D)
    distanceToVector(target: Vector2D) : number {
        let offsX: number = this.x - target.x;
        let offsY: number = this.y - target.y;
        return Math.sqrt(offsX*offsX + offsY*offsY);
    }

    // returns the distance to the target (from xy)
    distanceToPos(targetX: number, targetY: number) : number {
        let offsX: number = this.x - targetX;
        let offsY: number = this.y - targetY;
        return Math.sqrt(offsX*offsX + offsY*offsY);
    }

    // returns difference in both coordinates for Vector2D
    deltaToVector(target: Vector2D) : number[] {
        let dX : number = this.x - target.x;
        let dY : number = this.y - target.y;
        return [dX, dY];
    }

    // returns difference in both coordinates for Vector2D
    deltaToPos(targetX:number, targetY:number) : number[] {
        let dX : number = this.x - targetX;
        let dY : number = this.y - targetY;
        return [dX, dY];
    }
}

class DirVector2D {
    // all values get recalculated on every action
    private magnitude : number;

    public x: number;
    public y: number;
    protected origin: Vector2D;
    
    // get an set the magnitude
    public mag(): number {
        this.magnitude = calcMagnitude(this.x, this.y);
        return this.magnitude;
    }
    public setmag(value: number) {
        let nX: number = value / this.magnitude * this.x;
        let nY: number = value / this.magnitude * this.y;
        this.x = nX;
        this.y = nY;
        this.magnitude = value;
    }

    public angle: number;

    // determines whether a direction should always be 1 (normalized)
    autoNormalize: boolean;

    // creates vector with initial direction
    constructor(angle: number, autoNormalize : boolean = false) {
        this.autoNormalize = autoNormalize;
        this.origin = new Vector2D(0,1);

        // calculate the position for the set angle here
        this.setAngle(angle);

        // if autonormalize is true, normalize the vector
        if (this.autoNormalize) this.normalize();
    }

    // rotates towards a vector object
    public lookAtVector(target: Vector2D) : void {
        
    }

    // rotatest towards xy coords
    public lookAtPos(targetX:number, targetY:number) : void {
        console.log("Looking at: (" + targetX + ", " + targetY + ")");
    }

    // normalizes the vector
    public normalize() : void {

    }

    // rotates the vector around origin 
    public rotate(angle: number) : void {
        // convert degree angle to smallest positive rad
        let wa:number = smallestPositiveRad(angle);

        let sin: number = Math.sin(wa);
        let cos: number = Math.cos(wa);
        let newX: number = this.x * cos - this.y * sin;
        let newY: number = this.y * cos - this.x * sin;
        this.x = newX;
        this.y = newY;

        if (this.autoNormalize) this.normalize();
        this.calcAngle();
    }

    // calculate the angle from origin
    protected calcAngle() : void {
        let num : number = this.origin.x * this.x + this.origin.y * this.y;
        let den : number = calcMagnitude(this.x, this.y) + 
            calcMagnitude(this.origin.x, this.origin.y);
        this.angle = Math.acos(num/den)
    }

    // forces the angle to given angle
    protected setAngle(angle: number) : void {
        this.x = this.origin.x;
        this.y = this.origin.y;
        this.rotate(angle);
    }

    // inverts this vector
    protected invert() : DirVector2D {
        this.x = this.x*-1;
        this.y = this.y*-1;
        return this;
    }
}

/*
Helper functions for general math solutions
*/

function deg2rad(angle: number) : number{
    return angle * Math.PI / 180;
}

function rad2deg(angle: number) : number{
    return angle / Math.PI / 180;
}

// takes a degree angle
function smallestPositiveRad(angle: number) : number {
    let temp: number = angle % 360;
    return deg2rad((temp < 0) ? temp+360 : temp);
}

function calcMagnitude(posX:number, posY: number) : number {
    return Math.sqrt(posX*posX + posX*posX);
}