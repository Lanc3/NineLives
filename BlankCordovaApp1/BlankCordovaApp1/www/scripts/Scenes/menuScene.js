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
        this.menuState = {playing: false, multiplayer: false, options: false, quit: false };
        this.buttonWidth = Renderer.physicalScreenWidth / 2;
        this.yPosition = Renderer.physicalScreenHeight / 6;
        this.height = 80;
        this.playButton = new menuButton("PlayButton", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition, this.buttonWidth, this.height);
        this.multiplayerButton = new menuButton("multiplayerButton", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 2, this.buttonWidth, this.height);
        this.optionsButton = new menuButton("optionsButton", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 3, this.buttonWidth, this.height);
        this.quitButton = new menuButton("QuitButton", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 4, this.buttonWidth, this.height);
    } 
    /**
    * This is the render loop for rendering the scene
    */
    draw()
    {
        var tex2 = assetMan.getAsset("jungleBackground");
        Renderer.drawImage(tex2.texture, tex2.width, tex2.height, 0, 0, tex2.width, tex2.height, 0, 0, Renderer.physicalScreenWidth, Renderer.physicalScreenHeight);
        this.playButton.draw();
        this.multiplayerButton.draw();
        this.optionsButton.draw();
        this.quitButton.draw();
        super.draw();
    }
    update(dt)
    {
        if (this.playButton.contains(this.inputController.getIntupInfo().position))
        {
            this.menuState = { playing: true, multiplayer: false, options: false, quit: false };
        }
        else if (this.multiplayerButton.contains(this.inputController.getIntupInfo().position))
        {
            this.menuState = { playing: false, multiplayer: true, options: false, quit: false };
        }
        else if (this.optionsButton.contains(this.inputController.getIntupInfo().position))
        {
            this.menuState = { playing: false, multiplayer: false, options: true, quit: false };
        }
        else if (this.quitButton.contains(this.inputController.getIntupInfo().position))
        {
            this.menuState = { playing: false, multiplayer: false, options: false, quit: true };
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
        super.stop();
    }
}