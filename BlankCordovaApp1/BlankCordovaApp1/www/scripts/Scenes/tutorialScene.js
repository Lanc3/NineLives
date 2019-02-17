/**
 * This is the consctuctor of the playing Scene Scene class 
 * @param {string} title the title is passed to the base class scene
 * @param {color} color the color passed into the scene
 * @extends {scene} this exstends scene
 * @constructor
 */
class tutorialScene extends scene {
    constructor(title, inputController) {
        super(title, inputController);
        this.levelmanager = new levelManger();
        
    }

    update(dt) {
        this.levelmanager.update(dt);
        super.update(dt);
    }
 
    /**
    * This is the render loop for rendering the scene
    */
    draw() {
        this.levelmanager.draw();
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