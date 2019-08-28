class spike extends rectangle {
    constructor(startPosition, width, height) {
        super(startPosition.x, startPosition.y, width, height, collisionType.SPIKE);
        super.setPosition(startPosition);
        this.position = startPosition;
        this.startPosition = new vector(startPosition.x, startPosition.y);
        this.coinLoss = 2;
        this.width = width;
        this.height = height; 
        this.texture = assetMan.getAsset("spike");
        this.isAlive = true;
    }
   
    setPosition(position) {

        this.position.y = position.y + this.startPosition.y;
        super.setPosition(this.position);
    }
    update(dt) {
       
    }
    draw() {
        if (this.isAlive) {
            Renderer.drawImage(this.texture.texture, this.texture.width, this.texture.height, 0, 0,
                this.texture.width, this.texture.height, this.position.x, this.position.y, this.width, this.height);
        }
    }
}