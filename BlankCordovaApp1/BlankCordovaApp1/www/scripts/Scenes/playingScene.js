/**
 * This is the consctuctor of the playing Scene Scene class 
 * @param {string} title the title is passed to the base class scene
 * @param {color} color the color passed into the scene
 * @extends {scene} this exstends scene
 * @constructor
 */
class playingScene extends scene
{
    constructor(title, inputController)
    {
        super(title, inputController);
        this.levelmanager = new levelManger(LevelType.EASY);
        this.player = new Player(new vector(25, 500), 50, 50, 0.4, inputController, this.levelmanager);
        this.isPaused = false;
        this.gameIsFinished = false;
        this.pauseButton = new menuButton("pauseButton", 0, Renderer.physicalScreenHeight - 80, 80, 80);
        //audio
        this.audioManager = new audioManager();
        //this.audioManager.playSound("music", false);
        this.background = assetMan.getAsset("paused");
    }
  
    update(dt)
    {
      
        //this.levelmanager.setPlayerCurrentHeight(this.player.position);
        if (!this.isPaused) {
            this.levelmanager.setPlayerCurrentPosition(this.player.position);
            this.levelmanager.update(dt);
            this.player.setCollisionObjects(this.levelmanager.currentLevel.arrayOfCells);
            this.player.update(dt);
        }
        if (this.pauseButton.contains(this.inputController.getIntupInfo().position)) {
            if (!this.inputController.getIntupInfo().isTouching) {
                //this.isPaused = !this.isPaused;
               // this.audioManager.playSound("buttonSound", false);
            }
        }
        super.update(dt);
    }
    /**
    * This resets all the playing scene objects to there original values to reset the game
    */
    reset()
    {
        this.gameIsFinished = false;
    }
    /**
    * This is the render loop for rendering the scene
    */
    draw()
    {
        this.levelmanager.draw();
        this.player.draw();
       // this.pauseButton.draw();
        if (this.isPaused)
        {
            Renderer.drawImage(this.background.texture, this.background.width, this.background.height, 0, 0, this.background.width, this.background.height, 0, 0, Renderer.physicalScreenWidth, Renderer.physicalScreenHeight);
        }
        super.draw();
    }
    /**
    * this is called on scene start
    * uses super to call base scene
    */
    start()
    {
        this.audioManager.playSound("race", true);

        this.levelmanager.start();
        super.start();
    }
    /**
    * This is called on scene stop
    * uses super to call base scene
    */
    stop()
    {
        this.levelmanager.stop();
        this.levelmanager = new levelManger();
        this.player = new Player(new vector(175, 100), 50, 50, 0.4, this.inputController, this.levelmanager);

        super.stop();
    }
}