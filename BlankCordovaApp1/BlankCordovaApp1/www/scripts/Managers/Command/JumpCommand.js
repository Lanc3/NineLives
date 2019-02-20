class JumpCommand extends Command
{
    constructor()
    {

    }
    execute(gameEntity)
    {
        gameEntity.jump();
    }
}