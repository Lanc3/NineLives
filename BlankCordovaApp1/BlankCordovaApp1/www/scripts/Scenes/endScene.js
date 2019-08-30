/**
 * This is the consctuctor of the menu Scene class 
 * @param {string} title the title is passed to the base class scene
 * @param {color} color the color passed into the scene
 * @extends {scene} this exstends scene
 * @constructor
 */
class endScene extends scene {
    constructor(title, inputController) {
        super(title, inputController);
        /**
        * this is the color property
        * @type {color} 
        */
        this.menuState = { back: false };
        this.buttonWidth = 100;
        this.yPosition = Renderer.physicalScreenHeight - 200;
        this.height = 100;
        this.scoreText = document.getElementById("endScore");

        this.backButton = new menuButton("left", Renderer.physicalScreenWidth / 2 - this.buttonWidth / 2, this.yPosition, this.buttonWidth, this.height);
        //audio
        this.audioManager = new audioManager();
        //this.audioManager.playSound("music", false);
        this.background = assetMan.getAsset("difficultyBackground");
        this.score = 0;
    }
    setScore(score)
    {
        this.score = score;
        //this.scoreText.innerText = this.score;
    }
    /**
    * This is the render loop for rendering the scene
    */
    draw() {

        Renderer.drawImage(this.background.texture, this.background.width, this.background.height, 0, 0, this.background.width, this.background.height, 0, 0, Renderer.physicalScreenWidth, Renderer.physicalScreenHeight);

        this.backButton.draw();

        super.draw();
    }
    update(dt) {
        if (this.backButton.contains(this.inputController.getIntupInfo().position)) {
            if (!this.inputController.getIntupInfo().isTouching) {
                this.menuState = { back: true };
                this.audioManager.playSound("buttonSound", false);
            }
        }
       // this.scoreText.innerText = this.score;

    }
    setScore(amount)
    {

    }
    /**
    * this is called on scene start
    * uses super to call base scene
    */
    start() {
        super.start();
        this.scoreText.style.visibility = 'visible';
    }
    /**
    * This is called on scene stop
    * uses super to call base scene
    */
    stop() {
        this.scoreText.style.visibility = 'hidden';
        this.menuState = { back: false };
        this.audioManager.stopSound();
        super.stop();
    }
}