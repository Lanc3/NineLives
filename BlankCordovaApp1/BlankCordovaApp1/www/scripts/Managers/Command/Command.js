var CommandState = Object.freeze({ "CREATED": 1, "FINISHED": 2 });
class Command
{
    constructor(state)
    {
        this.state = state;
    }
    execute(GameEntity)
    {

    }
    undo()
    {

    }
}