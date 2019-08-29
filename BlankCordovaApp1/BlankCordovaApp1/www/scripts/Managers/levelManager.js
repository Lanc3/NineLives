
class levelManger
{
    constructor(levelType)
    {
        this.currentLevel;
        this.tutorial = new tutorialLevel();
        this.playing = new playingLevel();
        if (levelType === LevelType.TUTORIAL)
        {
            this.currentLevel = this.tutorial;
        }
        else if (levelType === LevelType.EASY)
        {
            this.currentLevel = this.playing;
        }
        
    }
    
    
    
    setPlayerCoinAmount(amount)
    {
        this.currentLevel.setPlayerCoinAmount(amount);
    }
    setPlayerCurrentPosition(position)
    {
        this.currentLevel.setPlayerCurrentPosition(position);
    }
    update(dt)
    {

        this.currentLevel.update(dt);
    }
    draw()
    {
        this.currentLevel.draw();
    }
    start()
    {
        this.currentLevel.start();
    }
    stop()
    {
        this.currentLevel.stop();
    }
}