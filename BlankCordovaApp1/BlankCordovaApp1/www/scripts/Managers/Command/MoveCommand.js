class MoveCommand extends Command
{
    constructor(state,point,deltaTime)
    {
        super(state);
        this.point = point;
        this.deltaTime = deltaTime;
    }
    execute(receiver)
    {
        receiver.moveTo(this.point, this.deltaTime);
        this.state = CommandState.FINISHED;
    }
}