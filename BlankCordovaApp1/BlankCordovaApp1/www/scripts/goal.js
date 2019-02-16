class goal extends rectangle
{
    constructor(startPosition,width,height,color)
    {
        super(startPosition.x,startPosition.y,width,height,color);
        super.setPosition(startPosition)
        this.isAlive = true;
    }
    /**
    * This test to see if another rectangle intersects with another
    * @param {rectangle} b the other rectangle to test against
    * @returns {true} if the are intersecting
    * @returns {false} if the are not intersecting
    */
   intersects(b)
   {
       if(this.isAlive)
       {
            return super.intersects(b);
       }
      return false;
   }
   update()
   {

   }
   draw()
   {
        if(this.isAlive)
        {
            super.draw();
        }
   }
}