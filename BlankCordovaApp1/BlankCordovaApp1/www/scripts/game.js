/**
 * This is the main application where it handles all game specific code
 * and rendering.
 * @constructor
 */
class game
{
    constructor()
    {
        var elem = document.getElementById("myProgress");
        var back = document.getElementById("myBar");
        elem.style.visibility = 'hidden';
        back.style.visibility = 'hidden';
        this.inputManager = new InputManager();
        this.audioManager = new audioManager();
        this.TitleScene = new titleScene("Title Scene", this.inputManager);
        this.MenuScene = new menuScene("Menu Scene", this.inputManager);
        this.PlayingScene = new playingScene("Playing Scene", this.inputManager);
        this.GameOverScene = new gameOverScene("Game Over Scene", this.inputManager);
        this.tutorialScene = new tutorialScene("Tutorial Scene", this.inputManager);
        this.SceneManager = new sceneManager();
        this.SceneManager.addScene(this.TitleScene);
        this.SceneManager.addScene(this.MenuScene);
        this.SceneManager.addScene(this.PlayingScene);
        this.SceneManager.addScene(this.GameOverScene);
        this.SceneManager.addScene(this.tutorialScene);
        this.SceneManager.goToScene("Menu Scene");
        
       
       
        //document.addEventListener("click", passRight(this.clickHandler,this));
        this.lastUpdate = Date.now();
        this.boundRecursiveUpdate = this.update.bind(this);
        this.boundDraw = this.draw.bind(this);
        this.update();
    }
    
    /**
    * This is the apps update function for all loop related functions
    * @param {number} dt This is the deltaTime variable
    */
    update()
    {
        //call draw
        this.boundDraw();
        //calculate delta time
        this.now = Date.now();
        this.dt = this.now - this.lastUpdate;
        this.lastUpdate = this.now;
        //update scenemanager
        this.SceneManager.update(this.dt);
        if (this.SceneManager.currentScene.title === "Menu Scene")
        {
            if (this.SceneManager.currentScene.menuState.playing)
            {
                this.SceneManager.goToScene("Tutorial Scene");
            }
            else if (this.SceneManager.currentScene.menuState.multiplayer)
            {
                this.SceneManager.goToScene("Game Over Scene");
            }
            else if (this.SceneManager.currentScene.menuState.options)
            {
                this.SceneManager.goToScene("Game Over Scene");
            }
            else if (this.SceneManager.currentScene.menuState.quit)
            {
                this.SceneManager.goToScene("Game Over Scene");
            }
        }
        //loop
        window.requestAnimationFrame(this.boundRecursiveUpdate);
    }
    /**
    * This is the apps draw function for all rendering related functions
    */
    draw()
    {
        Renderer.gl.viewport(0, 0, Renderer.gl.canvas.width, Renderer.gl.canvas.height);
        Renderer.gl.clearColor(0, 0, 0, 0);
        Renderer.gl.clear(Renderer.gl.COLOR_BUFFER_BIT);
        
        this.SceneManager.draw();
    }
    /**
    * This is the helper function to randomly select between two numbers
    * @param {number} f the min value
    * @param {number} s the max value
    * @returns {number} returnts integer value
    */
    randomBetween(firstNumber,lastNumber)
    {
        return Math.floor(Math.random() * lastNumber) + firstNumber;
    }
    /**
    * This is a helper function to get the hex value of a number
    * @param {number} v this is the number passed in
    */
    rgbToHex(rgb)
    {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) 
        {
             hex = "0" + hex;
        }
        return hex;
    }
    /**
    * This function passes in 3 numbers r,g,b representing an RGB color
    * It converts rgb(255,0,0) into hex #FF0000
    * @param {number} r red value passed in
    * @param {number} g green calue passed in
    * @param {number} b blue value passed in
    */   
    fullColorHex(r,g,b)
    {
        var red = this.rgbToHex(r);
        var green = this.rgbToHex(g);
        var blue = this.rgbToHex(b);
        return "#"+red+green+blue;
    }

    clickHandler(e, self)
    {
        self.SceneManager.goToNextScene();
    }
}