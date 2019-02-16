/**
   * This is the renderer it holds the .canvas and .ctx.
   * This is the only global variable in the app
   * @type {Object}
   */


var Renderer;
Renderer = new renderer();
var assetMan;

assetMan = new assetManager();
assetMan.queueShaderDownload("frag", "Assets/Shaders/fragment.shader");
assetMan.queueShaderDownload("vert", "Assets/Shaders/vertex.shader");
assetMan.downloadAllShaders();
Renderer.createWebGLProgram();

assetMan.queueAssetForDownload("Texture2D", "Assets/image.jpg", "test");
assetMan.queueAssetForDownload("Texture2D", "images/bg_jungle.png", "jungleBackground");
assetMan.queueAssetForDownload("Texture2D", "images/loadscreen.png", "loadingBackground");
assetMan.queueAssetForDownload("Texture2D", "images/multiplayerButton.png", "multiplayerButton");
assetMan.queueAssetForDownload("Texture2D", "images/optionsButton.png", "optionsButton");
assetMan.queueAssetForDownload("Texture2D", "images/PlayButton.png", "PlayButton");
assetMan.queueAssetForDownload("Texture2D", "images/QuitButton.png", "QuitButton");
assetMan.downloadAssets();

/**
 * startPoint is the starting point of the application.
 * @constructor
 */
function startPoint()
{
    gameApp = new game();
}

/**
 * This is the update loop called by .tick(), it calls the games update loop.
 * @param {number} dt deltaTime is passed through the update for future game needs
 */
function update(dt)
{
 
}
/**
 * This is the Draw loop called by .tick(), it calls the games draw loop.
 */
function draw()
{
    
}
/**
 * This is the event listener attached to the window
 * here we disable the default functions for the arrow keys
 * @param {Event} e This is the event handler where we test for specific keys presses
 */

window.addEventListener("keydown", function(e) 
{
    // Space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) 
    {
        e.preventDefault();
    }
}, false);

/**
 * This function allows to pass the scope right 
 * this is so we have the right scope for the event handler
 * @param {object} original original object
 */
function passRight( original ) {
    var args = [].slice.call( arguments, 1 );
    return function() {
        return original.apply( this, [].slice.call( arguments ).concat( args ) );
    };
}
/**
 * This function returns a struct builts from a string seperating them with ','
 * @param {string} names original object
 */
function makeStruct(names) {
    var names = names.split(',');
    var count = names.length;
    function constructor() {
      for (var i = 0; i < count; i++) {
        this[names[i]] = arguments[i];
      }
    }
    return constructor;
  }