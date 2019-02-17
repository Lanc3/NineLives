class platform extends rectangle
{
    constructor(position,width,height)
    {
        super(position.x, position.y, width, height);
        this.position = position;
        this.width = width;
        this.height = height;
        
        this.texture = assetMan.getAsset("platform");
        this.speed = 0.2;
    }
    update(dt)
    {
       
    }
    draw()
    {
        Renderer.drawImage(this.texture.texture, this.texture.width, this.texture.height*2, 0, 0,
            this.texture.width, this.texture.height, this.position.x, this.position.y, this.width, this.height);
    }
}