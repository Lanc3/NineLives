/**
   * This is the renderer it holds the .canvas and .ctx.
   * This is the only global variable in the app
   * @type {Object}
   */


var Renderer;
Renderer = new renderer();
var assetMan;

assetMan = new assetManager();
assetMan.queueAssetForDownload("Shader", "Assets/Shaders/fragment.shader","frag",null);
assetMan.queueAssetForDownload("Shader", "Assets/Shaders/vertex.shader", "vert", null);

assetMan.queueAssetForDownload("Texture2D", "Assets/Images/bg_jungle.png", "jungleBackground", null);
assetMan.queueAssetForDownload("Texture2D", "Assets/Images/platform.png", "platform", null);
assetMan.queueAssetForDownload("Texture2D", "Assets/Images/sky.jpg", "skyBackground", null);
assetMan.queueAssetForDownload("Texture2D", "Assets/Images/loadscreen.png", "loadingBackground", null);
assetMan.queueAssetForDownload("Texture2D", "Assets/Images/multiplayerButton.png", "multiplayerButton", null);
assetMan.queueAssetForDownload("Texture2D", "Assets/Images/optionsButton.png", "optionsButton", null);
assetMan.queueAssetForDownload("Texture2D", "Assets/Images/PlayButton.png", "PlayButton", null);
assetMan.queueAssetForDownload("Texture2D", "Assets/Images/QuitButton.png", "QuitButton", null);
assetMan.queueAssetForDownload("Audio", "Assets/Audio/Music.mp3", "music", null);
assetMan.queueAssetForDownload("Animation", "Assets/Animations/playerOne.png", "playerOne", "Assets/Animations/playerOne.json");
assetMan.downloadAssets();

Renderer.createWebGLProgram();
document.body.addEventListener("AssetsLoadedEvent", startGame, false);
/**
 * startPoint is the starting point of the application.
 * @constructor
 */
function startPoint()
{

}
function startGame()
{
    var gameApp = new game();
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