/**
 * This is the consctuctor of the line class 
 * @param {number} x this is the x position of the rectangle
 * @param {number} y this is the y position of the rectangle
 * @param {number} w this is the width
 * @param {number} h this is the height
 * @param {color} color this is the hex value for a color "#FF0000"
 * @constructor
 */
class rectangle
{
    constructor(x,y,w,h)
    {
        this.x = x;
        this.y = y;
        this.botomRightX = x + w;
        this.bottomRightY = y + h;
	    this.width = w;
        this.height = h;
        this.self = this;
    }
    /**
    * This directly sets the position of the rectangle
    * @param {vector} newPosition new position for the rectangle
    */
    setPosition(newPosition)
    {
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
    /**
    * This fuinction moves the position of the rectangle
    * @param {vector} newPosition The new position to move the rectangle to
    */
    move(newPosition)
    {
        this.x += newPosition.x;
        this.y += newPosition.y;
    }
    /**
    * This test to see if another rectangle intersects with another
    * @param {rectangle} b the other rectangle to test against
    * @returns {true} if the are intersecting
    * @returns {false} if the are not intersecting
    */
    intersects(b)
    {
        if (this.x - (this.width/2) < b.x + (b.width/2) &&
			this.x + (this.width/2) > b.x - (b.width/2) &&
			this.y - (this.height/2) < b.y + (b.height/2) &&
			this.y + (this.height/2) > b.y - (b.height/2))
		{
            return true;
		}
		return false;
    }
    contains(point)
    {
        if (this.x <= point.x && point.x <= this.botomRightX && this.y <= point.y && point.y <= this.bottomRightY)
        {
            return true;
        }
        return false;
    }
    /**
    * the draw function, draws four line to make a recangle
    */
    draw()
    {

    }
}