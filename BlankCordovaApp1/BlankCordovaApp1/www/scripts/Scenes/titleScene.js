/**
 * This is the consctuctor of the title Scene class 
 * @param {string} title the title is passed to the base class scene
 * @param {color} color the color passed into the scene
 * @extends {scene} this exstends scene
 * @constructor
 */
class titleScene extends scene
{
    constructor(title,inputController)
    {
        super(title, inputController);
        /**
        * this is the color property
        * @type {color} 
        */
        
    }
    /**
    * This is the render loop for rendering the scene
    */
    draw()
    {
        
        super.draw();
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