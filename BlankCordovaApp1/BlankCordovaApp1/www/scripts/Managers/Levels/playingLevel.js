class playingLevel extends level {
    constructor() {
        super();
        this.addPlatforms();
        this.playerHeight = 0;
    }
    addPlatforms() {
        this.firstCell.addPlatform(new vector(0, this.maxDistance - this.cellHeight), this.cellWidth, this.cellHeight, "platform");
        this.firstCell.addPlatform(new vector(this.cellWidth, this.maxDistance - this.cellHeight -20), this.cellWidth, this.cellHeight, "platform");
        this.firstCell.addPlatform(new vector(this.cellWidth * 2, this.maxDistance - this.cellHeight - 40), this.cellWidth, this.cellHeight, "platform");
        this.firstCell.addPlatform(new vector(this.screenWidth - this.cellWidth, 460), this.cellWidth, this.cellHeight, "platform");
        this.firstCell.addSpike(new vector(this.screenWidth - this.cellWidth - 50, 460), 50, 50);
        this.firstCell.addPlatform(new vector(0, 300 - this.cellHeight), this.cellWidth, this.cellHeight, "platform");
        this.firstCell.addSpike(new vector(this.cellWidth, 300 - this.cellHeight), 50, 50);
        this.firstCell.addPlatform(new vector(this.screenWidth - this.cellWidth, 0), this.cellWidth, this.cellHeight, "platform");
        this.firstCell.addPlatform(new vector(this.screenWidth - (this.cellWidth * 2), 0), this.cellWidth, this.cellHeight, "platform");
        this.firstCell.addSpike(new vector(this.screenWidth - ((this.cellWidth * 2)+50), 0), 50, 50);
        this.firstCell.addGhost(new vector(200, 200), 50, 60);
        

        this.otherCell.addPlatform(new vector(0, this.maxDistance - this.cellHeight), this.cellWidth, this.cellHeight, "platform");
        this.otherCell.addPlatform(new vector(10, 460), this.cellWidth, this.cellHeight, "wall");
        this.otherCell.addPlatform(new vector(10 + this.cellWidth, 420), this.cellWidth, this.cellHeight, "platform");
        this.otherCell.addPlatform(new vector(10 + (this.cellWidth*2), 380), this.cellWidth, this.cellHeight, "platform");
        this.otherCell.addSpike(new vector(this.cellWidth * 3, 460), 50, 50);
        this.otherCell.addPlatform(new vector(this.cellWidth, 200), this.cellWidth*4, 50, "platform");
        
        this.otherCell.addGhost(new vector(200, 100), 50, 60);
        

        this.finalCell.addPlatform(new vector(this.screenHalfWidth, 210), 100, 50, "platform");
        this.finalCell.addPlatform(new vector(this.screenWidth - 100, 460), 100, 50, "platform");
        this.finalCell.addPlatform(new vector(0, 0), 100, 50, "platform");
        this.finalCell.addPlatform(new vector(-10, this.maxDistance - this.cellHeight), 100, 50, "platform");
        this.finalCell.addGhost(new vector(200, 500), 50, 60);
        this.finalCell.addSpike(new vector(this.screenWidth - 150, 460), 50, 50);
    }
    setPlayerCoinAmount(amount) {
        super.setPlayerCoinAmount(amount);
    }
    setPlayerCurrentPosition(position) {
        super.setPlayerCurrentPosition(position);
        this.playerHeight = position.y;
    }
    update(dt) {
        let that = this;
        if (this.playerHeight <= Renderer.physicalScreenHeight / 2) {
            this.arrayOfCells.forEach(function (element) {
                element.position.y += that.speed * dt;
            });
        }
        super.update(dt);
    }
    draw() {
        super.draw();
    }
    start() {
        super.start();
    }
    stop() {
        super.stop();
    }
}