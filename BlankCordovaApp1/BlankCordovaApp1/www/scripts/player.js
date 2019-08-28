/**
 * This is the consctuctor of the player class 
 * @param {vector} startPosition this is the starts position of the player
 * @param {number} width this is the widthn of the player
 * @param {number} speed this is the speed of the player
 * @param {color} startColor this is the color of the player
 * @constructor
 */
const playerState = {
    IDLE: 'idle',
    JUMPING: 'jumping',
    FALLING: 'falling',
    LEFT: 'left',
    RIGHT: 'right'
}
class Player extends rectangle
{
    constructor(startPosition, width, height, speed, inputController,levelManager)
    {
        super(startPosition.x, startPosition.y, width, height, collisionType.PLAYER);
        this.position = startPosition;
        this.feet = new vector(this.position.x + 25, this.position.y + 48);
        this.direction = new vector(0,0);
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.inputControlller = inputController;
        this.spriteSheet = new Animation("playerOne",this.position, 10, width, height);
        this.spriteSheet.setCurrentAnimation("Idle");
        this.levelManager = levelManager;
        this.collisionManager = new CollisionManager();
        this.collisionObjects = this.levelManager.arrayOfCells;
        this.self = this;
        this.currentPlayerState = playerState.IDLE;
        this.gravity = 0.5;
        this.standing = false;
        this.jumpHeight = 0;
        this.jumpSpeed = 1;
        this.audioManager = new audioManager();
        this.coinsCollectedAmount = 0;
        
        this.coinAmount = 0;
        this.collisionType = Object.freeze({ "PLAYER": 1, "COIN": 2, "PLATFORM": 3, "SPIKE": 4, "GHOST": 5 });
    }
    /**
    * Function to to update the local position and the rects position
    */
    update(dt)
    {
        this.handleInput(dt);
        this.feet = new vector(this.position.x + 25, this.position.y + 45);

        this.jumpHeight -= 0.006 *dt;
        if (this.jumpHeight <= 0)
        {
            this.jumpHeight = 0;
        }
        this.position.y += (this.gravity - this.jumpHeight) * dt;
        
        
        this.spriteSheet.position = this.position;
        super.setPosition(this.position)
        this.wrapPlayerInScreen();

        this.calculateCollisions();
       
        //document.getElementById("gyro").innerHTML = " Y: " + this.inputControlller.speed.y;
        this.position.x += this.inputControlller.Pitch / 40 * dt;
        if (this.inputControlller.Pitch > 20)
        {
            this.currentPlayerState = playerState.RIGHT;
            this.spriteSheet.setCurrentAnimation("Right");
        }
        else if (this.inputControlller.Pitch < 20)
        {
            this.currentPlayerState = playerState.LEFT;
            this.spriteSheet.setCurrentAnimation("Left");
        }
        else
        {
            this.currentPlayerState = playerState.IDLE;
            this.spriteSheet.setCurrentAnimation("Idle");
        }

    }
    jump()
    {
        
        if (this.standing) {
            this.standing = false;
            this.jumpHeight = 2.5;
            if (this.spriteSheet.currentAnimationName !== "Jump") {
                //this.spriteSheet.setCurrentAnimation("Jump");
                //this.spriteSheet.setAnimationSpeed(5);
            }
        }
    }
    moveTo(speed,dt)
    {
       
   
    }
    calculateCollisions()
    {
        let that = this;
        
        if (this.collisionObjects !== 'undefined' || this.collisionObjects !== null) {
           

            this.collisionObjects.forEach(function (element) {
                let listOfCollidableObjects = element.listOfCollidableObjects;
                
                listOfCollidableObjects.forEach(function (object) {
                    if (object.type === collisionType.PLATFORM) {
                        
                        if (that.intersects(object)) {

                            var offsetX = that.collisionManager.getHorizontalIntersectionDepth(that, object);
                            var offsetY = that.collisionManager.getVirticalIntersectionDepth(that, object);

                            if (Math.abs(offsetX) > Math.abs(offsetY)) {
                                that.position.y += offsetY;
                                that.standing = true;

                            }
                            else {
                                that.position.x += offsetX;
                            }
                        }
                        else {
                            that.standing = false;
                        }
                    }
                    else if (object.type === collisionType.COIN)
                    {
                        if (that.inbetween(object)) {
                            if (!object.isCollected) {
                                object.collect();
                                that.coinAmount++;
                                that.levelManager.setPlayerCoinAmount(that.coinAmount);
                                that.audioManager.playSound("coinPickUp", false);
                            }
                        }
                    }

                });
            });
            
        }
    }
    getCollectedCoins()
    {
        return this.coinsCollectedAmount;
    }
    wrapPlayerInScreen()
    {
        if (this.position.x >= Renderer.physicalScreenWidth)
        {
            this.position.x = 5;
        }
        else if (this.position.x <= -this.width)
        {
            this.position.x = Renderer.physicalScreenWidth;
        }

        if (this.position.y >= Renderer.physicalScreenHeight)
        {
            this.reset();
        }
    }
    reset()
    {
        this.position = new vector(200, 50);
    }

    handleInput(dt)
    {
        let command = this.inputControlller.handleInput(dt);
        if (command)
        {
            command.execute(this);
        }
       
    }
    setCollisionObjects(objectList)
    {
       // this.collisionObjects = objectList;
    }
    
    intersects(object)
    {
        return super.intersects(object);
    }

    /**
    * Function that sets a new position for the player
    * @param {vector} newPosition new position for the player
    */
    setPosition(newPosition)
    {
        this.position = newPosition;
    }
    /**
    * Draws the rectangle shape
    */
    draw()
    {
        this.spriteSheet.draw();
        super.draw();
    }
}