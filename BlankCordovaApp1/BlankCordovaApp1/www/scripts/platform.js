class platform extends rectangle
{
    constructor(position,width,height,texture)
    {
        super(position.x, position.y, width, height, collisionType.PLATFORM);
        this.position = position;
        this.startPosition = new vector(position.x,position.y);
        this.width = width;
        this.height = height; 
        this.texture = assetMan.getAsset(texture);
    }
    setPosition(position)
    {

        this.position.y = position.y + this.startPosition.y;
        super.setPosition(this.position);
    }
    update(dt)
    {
       
    }
  
    draw()
    {
        Renderer.drawImage(this.texture.texture, this.texture.width, this.texture.height*2, 0, 0,
            this.texture.width, this.texture.height, this.position.x, this.position.y, this.width, this.height);
        super.draw();
    }
}