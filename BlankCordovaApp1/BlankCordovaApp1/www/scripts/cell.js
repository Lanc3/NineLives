class cell {
    constructor(image, position) {
        this.backgroundImage = assetMan.getAsset(image);
        this.position = position;
        this.screenHalfWidth = Renderer.physicalScreenWidth / 2;
        this.playerPosition;
        
        this.listOfCollidableObjects = [];
    }
   
    addPlatform(position, width, height,image)
    {
        this.listOfCollidableObjects.push(new platform(position, width, height, image));
        if (image === "platform") {
            this.listOfCollidableObjects.push(new coin(new vector(position.x + ((width - 20) / 2), position.y - 25), 20, 20));
        }
       
    }
    addGhost(position,width,height)
    {
        this.listOfCollidableObjects.push(new ghost(position,width,height));
    }
    addSpike(position, width, height)
    {
        this.listOfCollidableObjects.push(new spike(position, width, height));
    }
    setPlayerCurrentPosition(position)
    {
        this.playerPosition = position;
    }
    
    update(dt)
    {
        var that = this;
        this.listOfCollidableObjects.forEach(function (object) {
            if (object.type === collisionType.PLATFORM) {
                object.setPosition(that.position);
            }
            else if (object.type === collisionType.COIN) {
                    object.setPosition(that.position) 
            }
            else if (object.type === collisionType.GHOST) {
                object.setPosition(that.position);
                if (that.position.y >= -200) {
                    
                    object.moveTo(that.playerPosition);
                    
                }
                object.update(dt);
            }
            else if (object.type === collisionType.SPIKE) {
                object.setPosition(that.position);
            }
        });

    }
    reset()
    {
        this.listOfCollidableObjects.forEach(function (object) {
            if (object.type === collisionType.COIN) {
                object.reset();
            }
            else if (object.type === collisionType.GHOST) {
                object.reset();
            }
        });
    }
    draw() {

        Renderer.drawImage(this.backgroundImage.texture, this.backgroundImage.width, this.backgroundImage.height, 0, 0,
            this.backgroundImage.width, this.backgroundImage.height, this.position.x, this.position.y, Renderer.physicalScreenWidth, Renderer.physicalScreenHeight);

        this.listOfCollidableObjects.forEach(function (object) {
            if (object.type === collisionType.PLATFORM) {
                object.draw(); 
            }
            else if (object.type === collisionType.COIN) {
                object.draw(); 
            }
            else if (object.type === collisionType.GHOST) {
                object.draw(); 
            }
            else if (object.type === collisionType.SPIKE) {
                object.draw();
            }
        });
    }
    changeBackground(image)
    {
        this.backgroundImage = assetMan.getAsset(image);
    }
}