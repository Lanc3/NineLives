/**
 * This is the base scene class the the others will inherit from
 * @constructor
 */
class scene
{
    constructor(title,inputController)
    {
        this.title = title;
        this.inputController = inputController;
    }
    /**
    * This is the update function for this scene
    * @param {number} dt this is the delta time
    */
    update(dt)
    {

    }
    /**
    * This is the render loop for rendering the scene
    */
    draw()
    {
       
        
    }
    /**
    * this is called on scene start
    */
    start()
    {

    }
    /**
    * This is called on scene stop
    */
    stop()
    {

    }
}