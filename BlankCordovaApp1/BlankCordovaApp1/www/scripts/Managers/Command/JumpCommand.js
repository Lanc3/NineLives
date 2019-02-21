class JumpCommand extends Command
{
    constructor(state)
    {
        super(state);
    }
    execute(receiver)
    {
        receiver.jump();
        this.state = CommandState.FINISHED;
    }
}