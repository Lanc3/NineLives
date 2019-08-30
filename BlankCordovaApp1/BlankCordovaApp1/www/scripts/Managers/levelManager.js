
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
        this.totalScore = 0;
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
        this.totalScore = this.currentLevel.totalScore;
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
        this.totalScore = 0;
        this.currentLevel.stop();
    }
}