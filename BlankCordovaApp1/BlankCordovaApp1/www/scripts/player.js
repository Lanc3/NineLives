/**
 * This is the consctuctor of the player class 
 * @param {vector} startPosition this is the starts position of the player
 * @param {number} width this is the widthn of the player
 * @param {number} speed this is the speed of the player
 * @param {color} startColor this is the color of the player
 * @constructor
 */
class player
{
    constructor(startPosition,width,height,speed,startColor)
    {
        this.position = startPosition;
        this.direction = new vector(0,0);
        this.speed = speed;
        this.color = startColor;
        this.shape = new rectangle(startPosition.x,startPosition.y,100,100,this.color);
    }
    /**
    * Function to to update the local position and the rects position
    */
    update()
    {
        this.position.add(this.direction);
        this.shape.setPosition(this.position);
    }
    /**
    * sets the player direction
    * @param {vector} newDirection the new direction of the player
    */
    setDirection(newDirection)
    {
        this.direction = newDirection;
    }
    /**
    * Function that sets a new position for the player
    * @param {vector} newPosition new position for the player
    */
    setPosition(newPosition)
    {
        this.position = newPosition;
    }
    /**
    * Draws the rectangle shape
    */
    draw()
    {
        this.shape.setColor(this.color);
        this.shape.draw();
    }
}