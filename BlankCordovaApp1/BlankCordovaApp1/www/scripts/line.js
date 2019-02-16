/**
 * This is the consctuctor of the line class 
 * @param {vector} start this is the start position of the line
 * @param {vector} end this is the end position of the line
 * @param {number} width this is the width of the line drawn
 * @param {color} color this is the hex value for a color "#FF0000"
 * @constructor
 */
class line
{
    constructor(start,end,width,color)
    {
        this.startPosition = start;
        this.endPosition = end; 
        this.lineWidth = width;
        this.color = color;
    }
    /**
    * This function set a new position for the line star and end points
    * @param {vector} newStart The new position for the start point
    * @param {vector} newEnd the new position for the end point
    */
    setPositions(newStart,newEnd)
    {
        this.startPosition = newStart;
        this.endPosition = newEnd;
    }
    /**
    * This function sets a new color for the line.
    * @param {color} newColor the new color for the line
    */
    setColor(newColor)
    {
        this.color = newColor;
    }
     /**
    * This function sets a new width for the line.
    * @param {color} newColor the new width for the line
    */
    setLineWidth(newWidth)
    {
        this.lineWidth = newWidth;
    }
     /**
    * This finction draws the line with its internal variables
    */
    draw()
    {
        Renderer.ctx.beginPath();
        Renderer.ctx.moveTo(this.startPosition.x, this.startPosition.y);
        Renderer.ctx.lineTo(this.endPosition.x,this.endPosition.y);
        Renderer.ctx.lineWidth=this.lineWidth;
        Renderer.ctx.strokeStyle=this.color;
        Renderer.ctx.stroke(); 
    }
}