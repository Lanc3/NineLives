/**
 * This is the consctuctor of the game Over Scene class 
 * @param {string} title the title is passed to the base class scene
 * @param {color} color the color passed into the scene
 * @extends {scene} this exstends scene
 * @constructor
 */
class dificultyScene extends scene {
    constructor(title, inputController) {
        super(title, inputController);
        this.menuState = { easy: false,medium:false,hard:false };
        this.background = assetMan.getAsset("difficultyBackground");
        this.buttonWidth = Renderer.physicalScreenWidth / 2;
        this.yPosition = Renderer.physicalScreenHeight / 6;
        this.height = 80;
        this.easyButton = new menuButton("easy", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition, this.buttonWidth, this.height);
        this.mediumButton = new menuButton("medium", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 2, this.buttonWidth, this.height);
        this.hardButton = new menuButton("hard", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition * 3, this.buttonWidth, this.height);
        this.audioManager = new audioManager();
    }
    /**
    * This is the render loop for rendering the scene
    */
    draw() {
        super.draw();
        Renderer.drawImage(this.background.texture, this.background.width, this.background.height, 0, 0, this.background.width, this.background.height, 0, 0, Renderer.physicalScreenWidth, Renderer.physicalScreenHeight);
        this.easyButton.draw();
        this.mediumButton.draw();
        this.hardButton.draw();
    }
    update(dt)
    {
        if (this.easyButton.contains(this.inputController.getIntupInfo().position)) {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.menuState = { easy: true, medium: false, hard: false };
                this.audioManager.playSound("buttonSound", false);
            }
        }
        else if (this.mediumButton.contains(this.inputController.getIntupInfo().position)) {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.menuState = { easy: false, medium: true, hard: false };
                this.audioManager.playSound("buttonSound", false);
            }
        }
        else if (this.hardButton.contains(this.inputController.getIntupInfo().position)) {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.menuState = { easy: false, medium: false, hard: true };
                this.audioManager.playSound("buttonSound", false);
            }
        }
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
        this.menuState = { easy: false, medium:false, hard:false };
        super.stop();
    }
}