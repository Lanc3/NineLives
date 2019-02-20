/**
 * This is the consctuctor of the playing Scene Scene class 
 * @param {string} title the title is passed to the base class scene
 * @param {color} color the color passed into the scene
 * @extends {scene} this exstends scene
 * @constructor
 */
class tutorialScene extends scene
{
    constructor(title, inputController)
    {
        super(title, inputController);
        this.levelmanager = new levelManger();
        this.player = new Player(new vector(50, 200), 50, 50, 0.5, inputController);
        this.buttonWidth = 50;
        this.jumpButton = new menuButton("QuitButton", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, 700, this.buttonWidth, this.buttonWidth);
        this.rightButton = new menuButton("QuitButton", Renderer.physicalScreenWidth  - this.buttonWidth, 700, this.buttonWidth, this.buttonWidth);
        this.leftButton = new menuButton("QuitButton",0, 700, this.buttonWidth, this.buttonWidth);
    }

    update(dt) {
        this.levelmanager.update(dt);
        this.player.setCollisionObjects(this.levelmanager.arrayOfCells);
        this.player.update(dt);
        if (this.jumpButton.contains(this.inputController.getIntupInfo().position))
        {
            this.player.jump();
        }
        if (this.leftButton.contains(this.inputController.getIntupInfo().position)) {
            this.player.left(dt);
        }
        if (this.rightButton.contains(this.inputController.getIntupInfo().position)) {
            this.player.right(dt);
        }
        super.update(dt);
    }
 
    /**
    * This is the render loop for rendering the scene
    */
    draw() {
        this.levelmanager.draw();
        this.player.draw();
        this.jumpButton.draw();
        this.leftButton.draw();
        this.rightButton.draw();
        super.draw();
    }
    /**
    * this is called on scene start
    * uses super to call base scene
    */
    start() {
        
        super.start();
    }
    /**
    * This is called on scene stop
    * uses super to call base scene
    */
    stop() {

        super.stop();
    }
}