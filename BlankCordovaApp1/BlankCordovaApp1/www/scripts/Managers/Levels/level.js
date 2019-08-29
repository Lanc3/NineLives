class level {
    constructor()
    {
        this.resetPositionValue = -Renderer.physicalScreenHeight * 2;
        this.maxDistance = Renderer.physicalScreenHeight;
        this.screenHalfWidth = Renderer.physicalScreenWidth / 2;
        this.screenWidth = Renderer.physicalScreenWidth;
        this.screenPlatformWidth = this.screenWidth / 5;
        this.cellHeight = this.maxDistance / 14;
        this.cellWidth = this.screenWidth / 5;
        this.arrayOfCells = [];  
        this.firstCell = new cell("skyLoop", new vector(0, 0));
        this.otherCell = new cell("skyLoop", new vector(0, this.resetPositionValue / 2));
        this.finalCell = new cell("skyLoop", new vector(0, this.resetPositionValue));
        this.speed = 0.2;
        this.playerCurrentPosition;
        this.playerCurrentHeight = 0;
        this.coinAmount = 0;
        this.arrayOfCells.push(this.firstCell);
        this.arrayOfCells.push(this.otherCell);
        this.arrayOfCells.push(this.finalCell);
        this.timer = 0;
        this.gameUserInterface = document.getElementById("ui-container");
        this.gameUserInterface.style.width = Renderer.physicalScreenWidth + "px";
        this.coinsUI = document.getElementById("coins");
        this.coinsUI.style.width = (Renderer.physicalScreenWidth / 3) + "px";
        this.coinsUI.innerText = "= " + this.coinAmount;
        this.timeUI = document.getElementById("time");
        this.timeUI.style.width = ((Renderer.physicalScreenWidth / 3) - 10) + "px";
        this.timeUI.style.left = ((Renderer.physicalScreenWidth / 3) +10) + "px";
        this.scoreUI = document.getElementById("score");
        this.scoreUI.style.width = (Renderer.physicalScreenWidth / 3) + "px";
        this.scoreUI.style.left = ((Renderer.physicalScreenWidth - (Renderer.physicalScreenWidth / 3) )) + "px";
        this.scoreUI.innerText = 0;
        this.scoreAmount = 10;
        this.totalScore = 0;
        this.coinIcon = new coin(new vector(18, 12), 25, 25);
        
        this.coinsUI.innerText = "= " + this.coinAmount;
        this.clockIcon = new Animation("clock", new vector(((Renderer.physicalScreenWidth / 3) + 15), 12), 10, 25, 25);
        this.clockIcon.setCurrentAnimation("clock");
        this.scoreIcon = assetMan.getAsset("scoreIcon");
        this.UIbackground = assetMan.getAsset("scoreBar");

    }
    update(dt)
    {
        this.timer += dt;
        this.timeUI.innerText = Math.floor(this.timer / 1000);
        if (this.timer >= 10000) {
            this.scoreAmount = 1;
        }
        else {
            this.scoreAmount = 10 - (this.timer / 1000);
        }
        var that = this;
        this.arrayOfCells.forEach(function (element) {
            //element.position.y += that.speed * dt;
            element.update(dt);
            if (element.position.y > that.maxDistance) {
                element.position.y = that.resetPositionValue;
                element.reset();
            }
        });
    }
    setPlayerCoinAmount(amount) {
        this.coinAmount = amount;
        this.coinsUI.innerText = "= " + this.coinAmount;
        this.timer = 0;
        if (amount > 0) {
            this.totalScore += Math.floor(this.scoreAmount);
            this.scoreUI.innerText = this.totalScore;
        }
        
    }
    setPlayerCurrentPosition(position) {
        this.arrayOfCells.forEach(function (cells) {
            cells.setPlayerCurrentPosition(position);
        });

    }
    draw()
    {
        
        this.arrayOfCells.forEach(function (element) {
            element.draw();
        });
        Renderer.drawImage(this.UIbackground.texture, this.UIbackground.width, this.UIbackground.height, 0, 0, this.UIbackground.width, this.UIbackground.height, 0, 0, Renderer.physicalScreenWidth, 50);
        this.coinIcon.draw();
        this.clockIcon.draw();
        Renderer.drawImage(this.scoreIcon.texture, this.scoreIcon.width, this.scoreIcon.height, 0, 0, this.scoreIcon.width, this.scoreIcon.height, Renderer.physicalScreenWidth-115, 12, 25, 25);

    }
    start()
    {
        this.gameUserInterface.style.visibility = 'visible';
    }
    stop()
    {
        this.gameUserInterface.style.visibility = 'hidden';
    }
}