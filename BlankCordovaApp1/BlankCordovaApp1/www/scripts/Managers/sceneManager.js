/**
 * This is the scene manager class this will manage scene transition ,render and update of scenes
 * @constructor
 */
class sceneManager
{
    constructor(inputController)
    {
        this.scenes = {};
        this.currentScene = null;
        this.sceneTitlesList = [];
        this.sceneIndex = -1;
        this.inputController = inputController;
    }
    /**
    *  add scene to the scene managers dict
    * @param {scene} newScene new scene to add
    */
    addScene(newScene)
    {
        this.scenes[newScene.title] = newScene;
        this.sceneTitlesList.push(newScene.title);
        if(this.currentScene === null)
        {
            this.currentScene = this.scenes[newScene.title];
            this.sceneIndex = 0;
        }
        
    }
    /**
    * This function if the this.scene is not null then stop the current scene
    * and sets the current scene to the requested
    * @param {string} title this is the title of the scene you want to go to
    */
    goToScene(title)
    {
        if(this.currentScene !== null)
        {
            this.currentScene.stop();
            this.currentScene = this.scenes[title];
            this.currentScene.start();
        }
    }
    /**
    * The goTONextScene function checks if the current scene is null
    * if not then stop the current scene, get the index of the current scene
    * add to the index, then change to the new scene and start
    */
    goToNextScene()
    {
        if(this.currentScene !== null)
        {
            this.currentScene.stop();
            this.sceneIndex = this.sceneTitlesList.indexOf(this.currentScene.title);
            if(this.sceneIndex === this.sceneTitlesList.length-1)
            {
                this.sceneIndex = 0;
            }
            else
            {
                this.sceneIndex++;
            }
            this.currentScene = this.scenes[this.sceneTitlesList[this.sceneIndex]];
            this.currentScene.start();
        }
        
    }
    update(dt)
    {
        if(this.currentScene !== null)
        {
            this.currentScene.update(dt);
        }
    }
    draw()
    {
        if(this.currentScene !== null)
        {
            this.currentScene.draw();
        }
    }
}