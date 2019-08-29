class tutorialLevel extends level
{
    constructor()
    {
        super();
        this.addPlatforms();
    }
    addPlatforms()
    {
        this.firstCell.addPlatform(new vector(this.screenHalfWidth, 210), 100, 50, "platform");
        this.firstCell.addPlatform(new vector(this.screenWidth - 100, 460), 100, 50, "platform");
        this.firstCell.addPlatform(new vector(0, 0), 100, 50, "platform");
        this.firstCell.addPlatform(new vector(-10, this.maxDistance - this.cellHeight), this.screenWidth, this.cellHeight, "platform");
        this.firstCell.addGhost(new vector(200, 500), 50, 60);
        this.firstCell.addSpike(new vector(this.screenWidth - 150, 460), 50, 50);
    }
    setPlayerCoinAmount(amount) {
        super.setPlayerCoinAmount(amount);
    }
    setPlayerCurrentPosition(position) {
        super.setPlayerCurrentPosition(position);
    }
    update(dt)
    {
        super.update(dt);
    }
    draw()
    {
        super.draw();
    }
    start()
    {
        super.start();
    }
    stop()
    {
        super.stop();
    }
}