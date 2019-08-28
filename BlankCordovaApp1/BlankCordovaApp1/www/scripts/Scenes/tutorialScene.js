/**
 * This is the consctuctor of the playing Scene Scene class 
 * @param {string} title the title is passed to the base class scene
 * @param {color} color the color passed into the scene
 * @extends {scene} this exstends scene
 * @constructor
 */
const TutorialState = {
    START: 'start',
    RIGHT: 'right',
    LEFT: 'left',
    JUMP: 'jump',
    COIN: 'coin',
    GHOST: 'ghost',
    SPIKE: 'spike',
    TIME: 'time',
    SCORE: 'score',
    END:'end'
}
class tutorialScene extends scene
{
    constructor(title, inputController)
    {
        super(title, inputController);
        this.levelmanager = new levelManger();
        this.player = new Player(new vector(175, 100), 50, 50, 0.4, inputController, this.levelmanager);
        this.tutorialHelpText = document.getElementById("ui-speachBubble");
        this.inputController = inputController;
        this.timer = 0;
        this.currentTutorialState = TutorialState.START;
        this.quitButton = new menuButton("QuitButton", (Renderer.physicalScreenWidth / 2) - 50, Renderer.physicalScreenHeight - 50, 100, 50);
        this.isFinished = false;
    }

    update(dt) {
        this.levelmanager.setPlayerCurrentHeight(this.player.position);
        this.levelmanager.setPlayerCurrentPosition(this.player.position);
        this.levelmanager.update(dt);
        this.player.setCollisionObjects(this.levelmanager.arrayOfCells);
        this.player.update(dt);
        this.timer += dt;
        this.helperText();
        
        
        super.update(dt);
    }
    helperText()
    {
        if (this.currentTutorialState === TutorialState.START) {
            if (this.timer >= 1500) {
                this.setTutorialText("Tilt Right")
                this.currentTutorialState = TutorialState.RIGHT;
            }

        }
        if (this.currentTutorialState === TutorialState.RIGHT) {

            if (this.inputController.Pitch > 20) {
                this.setTutorialText("Good... ! Now Left");
                this.currentTutorialState = TutorialState.LEFT;
            }
        }
        if (this.currentTutorialState === TutorialState.LEFT) {
            if (this.inputController.Pitch < -20) {
                this.setTutorialText("Good, swipe up to jump.");
                this.currentTutorialState = TutorialState.JUMP;
            }
        }
        if (this.currentTutorialState === TutorialState.JUMP) {
            if (this.inputController.swipeDirection === 5) {
                this.setTutorialText("Coins collected show left");
                this.tutorialHelpText.className = 'tutorialHelpTop';
                this.currentTutorialState = TutorialState.COIN;
                this.timer = 0;
            }
        }
        if (this.currentTutorialState === TutorialState.COIN) {
            if (this.timer >= 2500) {
                this.setTutorialText("Time between collected coins in the middle")
                this.currentTutorialState = TutorialState.TIME;
                this.timer = 0;
            }
        }
        if (this.currentTutorialState === TutorialState.TIME) {
            if (this.timer >= 2500) {
                this.setTutorialText("The shorter time between coins the higher the score")
                this.currentTutorialState = TutorialState.GHOST;
                this.timer = 0;
            }
        }
        if (this.currentTutorialState === TutorialState.GHOST) {
            if (this.timer >= 2500) {
                this.setTutorialText("Getting hit by the ghost takes 2 coins")
                this.tutorialHelpText.className = 'tutorialHelpLeft';
                this.currentTutorialState = TutorialState.SPIKE;
                this.timer = 0;
            }
        }
        if (this.currentTutorialState === TutorialState.SPIKE) {
            if (this.timer >= 2500) {
                this.setTutorialText("Getting hit by the Spike takes 2 coins")
                this.currentTutorialState = TutorialState.END;
                this.timer = 0;
            }
        }
        if (this.currentTutorialState === TutorialState.END) {
            if (this.timer >= 2500) {
                this.setTutorialText("Now your ready to play")
                this.quitButton.draw();
                if (this.quitButton.contains(this.inputController.getIntupInfo().position))
                {
                    this.isFinished = true;
                }
            }
        }
    }
    setTutorialText(message)
    {
        this.tutorialHelpText.innerText = message;
    }
    /**
    * This is the render loop for rendering the scene
    */
    draw() {
        this.levelmanager.draw();
        this.player.draw();
        
        super.draw();
    }
    /**
    * this is called on scene start
    * uses super to call base scene
    */
    start() {
        this.levelmanager.start();
        this.tutorialHelpText.style.visibility = 'visible';
        this.setTutorialText("Tilt Device to move");
        this.currentTutorialState = TutorialState.START;
        super.start();
    }
    /**
    * This is called on scene stop
    * uses super to call base scene
    */
    stop() {
        this.levelmanager.stop();
        this.tutorialHelpText.style.visibility = 'hidden';
        this.levelmanager = new levelManger();
        this.player = new Player(new vector(175, 100), 50, 50, 0.4, this.inputController, this.levelmanager);
        this.timer = 0;
        this.currentTutorialState = TutorialState.START;
        this.isFinished = false;
        super.stop();
    }
}