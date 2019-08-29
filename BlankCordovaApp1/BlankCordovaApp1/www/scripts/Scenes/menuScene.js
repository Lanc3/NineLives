/**
 * This is the consctuctor of the menu Scene class 
 * @param {string} title the title is passed to the base class scene
 * @param {color} color the color passed into the scene
 * @extends {scene} this exstends scene
 * @constructor
 */
class menuScene extends scene
{
    constructor(title, inputController)
    {
        super(title, inputController);
        /**
        * this is the color property
        * @type {color} 
        */
        this.menuState = {playing: false,tutorial: false, multiplayer: false, options: false, quit: false };
        this.buttonWidth = Renderer.physicalScreenWidth / 2;
        this.yPosition = Renderer.physicalScreenHeight / 7;
        this.height = 80;
        this.playButton = new menuButton("play", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition, this.buttonWidth, this.height);
        this.tutorialButton = new menuButton("tutorial", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 2, this.buttonWidth, this.height);
        this.multiplayerButton = new menuButton("multiplayer", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 3, this.buttonWidth, this.height);
        this.optionsButton = new menuButton("options", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 4, this.buttonWidth, this.height);
        this.quitButton = new menuButton("quit", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 5, this.buttonWidth, this.height);
        //audio
        this.audioManager = new audioManager();
        //this.audioManager.playSound("buttonSound", false);
        this.background = assetMan.getAsset("menuBackground");
    } 
    /**
    * This is the render loop for rendering the scene
    */
    draw()
    {
        
        Renderer.drawImage(this.background.texture, this.background.width, this.background.height, 0, 0, this.background.width, this.background.height, 0, 0, Renderer.physicalScreenWidth, Renderer.physicalScreenHeight);
        this.playButton.draw();
        this.tutorialButton.draw();
        this.multiplayerButton.draw();
        this.optionsButton.draw();
        this.quitButton.draw();
        
        super.draw();
    }
    update(dt)
    {
       
        if (this.playButton.contains(this.inputController.getIntupInfo().position))
        {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.audioManager.playSound("buttonSound", false);
                this.menuState = { playing: true, tutorial: false, multiplayer: false, options: false, quit: false };
            }
            
        }
        else if (this.tutorialButton.contains(this.inputController.getIntupInfo().position))
        {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.audioManager.playSound("buttonSound", false);
                this.menuState = { playing: false, tutorial: true, multiplayer: false, options: false, quit: false };
            }
            
        }
        else if (this.multiplayerButton.contains(this.inputController.getIntupInfo().position))
        {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.audioManager.playSound("buttonSound", false);
                this.menuState = { playing: false, tutorial: false, multiplayer: true, options: false, quit: false };
            }
            
        }
        else if (this.optionsButton.contains(this.inputController.getIntupInfo().position))
        {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.audioManager.playSound("buttonSound", false);
                this.menuState = { playing: false, tutorial: false, multiplayer: false, options: true, quit: false };
            }
            
        }
        else if (this.quitButton.contains(this.inputController.getIntupInfo().position))
        {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.audioManager.playSound("buttonSound", false);
                this.menuState = { playing: false, tutorial: false, multiplayer: false, options: false, quit: true };
            }
            
        }
        
    }
    /**
    * this is called on scene start
    * uses super to call base scene
    */
    start()
    {
        super.start();
    }
    /**
    * This is called on scene stop
    * uses super to call base scene
    */
    stop()
    {
        this.menuState = { playing: false, tutorial: false ,multiplayer: false, options: false, quit: false };
        this.audioManager.stopSound();
        super.stop();
    }
}