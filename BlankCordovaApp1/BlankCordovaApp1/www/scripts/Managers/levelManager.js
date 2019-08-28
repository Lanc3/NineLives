class levelManger
{
    constructor()
    {
        this.resetPositionValue = -Renderer.physicalScreenHeight * 2;
        this.maxDistance = Renderer.physicalScreenHeight;
        this.screenHalfWidth = Renderer.physicalScreenWidth / 2;
        this.screenWidth = Renderer.physicalScreenWidth;
        this.screenPlatformWidth = this.screenWidth / 5;
        this.cellHeight = this.maxDistance / 14;
        this.cellWidth = this.screenWidth / 5;
        this.firstCell = new cell("skyLoop", new vector(0, 0));
        this.otherCell = new cell("skyLoop", new vector(0, this.resetPositionValue / 2));
        this.finalCell = new cell("skyLoop", new vector(0, this.resetPositionValue));
        this.arrayOfCells = [];
        this.arrayOfCells.push(this.firstCell);
        this.arrayOfCells.push(this.otherCell);
        this.arrayOfCells.push(this.finalCell);
        this.speed = 0.2;
        this.playerCurrentPosition;
        this.playerCurrentHeight = 0;

        this.timer = 0;
        this.gameUserInterface = document.getElementById("ui-container");
        this.gameUserInterface.style.width = Renderer.physicalScreenWidth + "px";
        this.coinsUI = document.getElementById("coins");
        this.coinsUI.style.width = (Renderer.physicalScreenWidth / 3) + "px";
        this.timeUI = document.getElementById("time");
        this.timeUI.style.width = ((Renderer.physicalScreenWidth / 3)-20) + "px";
        this.timeUI.style.left = (Renderer.physicalScreenWidth / 3) + "px";
        this.scoreUI = document.getElementById("score");
        this.scoreUI.style.width = (Renderer.physicalScreenWidth / 3) + "px";
        this.scoreUI.style.left = ((Renderer.physicalScreenWidth - (Renderer.physicalScreenWidth / 3)-20)) + "px";
        this.scoreAmount = 10;
        this.totalScore = 0;
        this.coinIcon = new coin(new vector(10, 10), 30, 30);
        this.coinAmount = 0;
        this.coinsUI.innerText = "= " + this.coinAmount;
        this.clockIcon = new Animation("clock", new vector(((Renderer.physicalScreenWidth / 3) + 15), 10), 10, 30, 30);
        this.clockIcon.setCurrentAnimation("clock");
        this.addstarterPlatforms();
    }
    
    addstarterPlatforms()
    {
        this.firstCell.addPlatform(new vector(this.screenHalfWidth, 210), 100, 50, "platform");
        this.firstCell.addPlatform(new vector(this.screenWidth-100, 460), 100, 50, "platform");
        this.firstCell.addPlatform(new vector(0, 0), 100, 50, "platform");
        this.firstCell.addPlatform(new vector(-10, this.maxDistance - this.cellHeight), this.screenWidth, this.cellHeight, "platform");
        this.firstCell.addGhost(new vector(200, 500), 50, 60);
        this.firstCell.addSpike(new vector(this.screenWidth - 150, 460), 50, 50);
    }
    setPlayerCurrentHeight(playerPosition)
    {
        this.playerCurrentHeight = playerPosition.y;
    }
    setPlayerCoinAmount(amount)
    {
        this.coinAmount = amount;
        this.coinsUI.innerText = "= " + this.coinAmount;
        this.timer = 0;
        this.totalScore += Math.floor(this.scoreAmount);
        this.scoreUI.innerText =  this.totalScore;
    }
    setPlayerCurrentPosition(position)
    {
        this.arrayOfCells.forEach(function (cells){
            cells.setPlayerCurrentPosition(position);
        });

    }
    update(dt)
    {
        this.timer += dt;
        this.timeUI.innerText = Math.floor(this.timer / 1000);
        if (this.timer >= 10000)
        {
            this.scoreAmount = 1;
        }
        else
        {
            this.scoreAmount = 10 - (this.timer / 1000);
        }
        var that = this;
        this.arrayOfCells.forEach(function (element) {
            //element.position.y += that.speed * dt;
            element.update(dt);
            if (element.position.y > that.maxDistance) {
                element.position.y = that.resetPositionValue;
                element.changeBackground("skyLoop");
               
            }
        });
        
    }
    draw()
    {
        this.arrayOfCells.forEach(function (element) {
            element.draw();
        });
        this.coinIcon.draw();
        this.clockIcon.draw();
    }
    start() {
        this.gameUserInterface.style.visibility = 'visible';
    }
    stop()
    {
        this.gameUserInterface.style.visibility = 'hidden';
    }
}