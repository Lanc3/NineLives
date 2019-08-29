class coin extends rectangle
{
    constructor(startPosition,width,height)
    {
        super(startPosition.x, startPosition.y, width, height, collisionType.COIN);
        //super.setPosition(startPosition);
        this.position = startPosition;
        this.startPosition = new vector(startPosition.x, startPosition.y);
        this.isAlive = true;
        this.isCollected = false;
        this.spriteSheet = new Animation("coin", this.position, 10, width, height);
        this.spriteSheet.setCurrentAnimation("coin");
        this.speed = 1;
        this.distance;
        this.direction;
    }
   
    setPosition(position) {
        
            this.position.y = position.y + this.startPosition.y;
            super.setPosition(this.position);
        
   }
   update(dt)
   {
       
    }
   reset()
   {
       //this.position = this.startPosition;
       this.isAlive = true;
       this.isCollected = false;
       this.speed = 1;
       this.distance;
       this.direction;
   }
   
   collect()
   {
       this.isCollected = true;
       this.isAlive = false;
       //this.moveTo(new vector(10, 10));
   }
   moveTo(position)
   {
       this.distance = this.position.distance(position);
       this.direction = position.subtract(this.position);
       this.direction.normalize();
   }
   draw()
   {
        if(this.isAlive)
        {
            this.spriteSheet.draw();
            super.draw();
        }
   }
}