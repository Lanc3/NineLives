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
        this.levelmanager = new levelManger();
        this.player = new Player(new vector(175, 100), 50, 50, 0.4, inputController, this.levelmanager);

        this.gameIsFinished = false;
    }
  
    update(dt)
    {
      
        this.levelmanager.setPlayerCurrentHeight(this.player.position);
        this.levelmanager.setPlayerCurrentPosition(this.player.position);
        this.levelmanager.update(dt);
        this.player.setCollisionObjects(this.levelmanager.arrayOfCells);
        this.player.update(dt);
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

        super.draw();
    }
    /**
    * this is called on scene start
    * uses super to call base scene
    */
    start()
    {
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