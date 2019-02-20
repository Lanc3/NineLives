/**
 * This is the consctuctor of the input manager class 
 * @constructor
 */
class InputManager
{
    constructor()
    {
        if ('ontouchstart' in window)
        {
            console.log("touchable Device")
            this.touchable = true;
        }
        else
        {
            console.log("Not touchable")
            this.touchable = false;
        }
        /**
        * the vector position of the position on the canvas for a touch event
        * @type {vector} 
        */
        this.touchCanvasPosition = new vector(0,0);

        /**
        * this is a boolean is true if touching
        * @type {boolean} 
        */
        this.touching = false;
        
        /**
        * these are the ongoing touches we store
        * @type {array} 
        */
        this.ongoingTouches = [];

        /**
        * this is the list of all the start points we test against for swipes
        * @type {array} 
        */
        this.startTouchList = [];

        /**
        * this is the store of all the info 
        * @type {inputInfo} 
        */
        this.inputInfo;
        

        /**
        * the time from touch start
        * @type {number} 
        */
        this.startTouchTime;

        /**
        * the min distance for a swipe
        * @type {number} 
        */
        this.swipeMinDistance = 200;

        /**
        * the max time allowed for a swipe
        * @type {number} 
        */
        this.swipeMaxTime = 200;
        this.left = false;
        this.right = false;
        this.tap = false;

        this.setupTouchDevice(this);
    }

    /**
    * this is the setup Touch device method responsible for the creation
    * of the event listeners
    * @param {this} self passing the self object to access this object variables because of scope 
    * 
    */
    setupTouchDevice(self)
    {
        if(this.touchable) 
	    {
		    document.addEventListener('touchstart', passRight(this.onTouchStart, self), {passive:false});
		    document.addEventListener('touchmove', passRight(this.onTouchMove, self), {passive:false});
		    document.addEventListener('touchend', passRight(this.onTouchEnd, self), {passive:false});
		    window.onorientationchange = this.resetCanvas;  
		    window.onresize = this.resetCanvas;  
        } 
    }
    /**
    *this resets the canvas
    */
    resetCanvas()
    {
        //todo reset logic if needed
    }
    /**
     * this is the ontouch start event. it is called when the touch start event fires, 
     * @param {event} e this is the event passed through
     * @param {this} self this is the self object for scope
     */
    onTouchStart(e,self)
    {
        e.preventDefault();
        var touches = e.changedTouches; 
       
        for(var index = 0;index < touches.length;index++)
        {
            if(touches[index] !== 'undefined' || touches[index] !== null )
            {
                self.ongoingTouches.push(self.copyTouch(touches[index]));
                self.startTouchList.push(self.copyTouch(touches[index]));
                if (self.startTouchList.length > 1)
                {
                    this.last = self.startTouchList[self.startTouchList.length - 1].timeStamp;
                    this.secondLast = self.startTouchList[self.startTouchList.length - 2].timeStamp;
                    this.timeBetween = this.last - this.secondLast;
                    //console.log(self.startTouchList[self.startTouchList.length - 1].timeStamp, self.startTouchList[self.startTouchList.length - 2].timeStamp, this.timeBetween);
                    if (this.timeBetween < 500)
                    {
                        self.tap = true;
                    }
                    else
                    {
                        self.tap = false;
                    }
                }
            }
        }
        self.touchCanvasPosition.x  = touches[0].pageX;
        self.touchCanvasPosition.y = touches[0].pageY;
        if (touches[0].pageX > Renderer.physicalScreenWidth / 2)
        {
            self.right = true;
            self.left = false;
        }
        if (touches[0].pageX < Renderer.physicalScreenWidth / 2)
        {
            self.right = false;
            self.left = true;
        }

        self.touching = true;
    }
    /**
     * this is the on touch end function, it fires whent he touch end event is called
     * @param {*} e this is the event passed through
     * @param {*} self this is the self object for scope
     */
    onTouchEnd(e,self)
    {
        e.preventDefault();
        var touches = e.changedTouches; 
       
        for(var index = 0;index < touches.length;index++)
        {
            var idx = self.ongoingTouchIndexById(touches[index].identifier);
            if (idx >= 0) 
            {
                this.currentTime = Date.now();
                this.length = Math.sqrt(Math.pow(Math.abs(touches[index].pageY - self.startTouchList[idx].pageY),2) + Math.pow(Math.abs(touches[index].pageX - self.startTouchList[idx].pageX),2));
                this.time = self.copyTouch(touches[index]).timeStamp - self.startTouchList[idx].timeStamp;
                //console.log(this.length + " : " + this.time)
                if(this.length > self.swipeMinDistance && this.time < self.swipeMaxTime)
                {
                    this.centerPoint = new vector((touches[index].pageX + self.startTouchList[idx].pageX)/2,(touches[index].pageY + self.startTouchList[idx].pageY)/2);
                    this.deltaY = touches[index].pageY - self.startTouchList[idx].pageY;
                    this.deltaX = touches[index].pageX - self.startTouchList[idx].pageX;
                    this.angle = Math.atan2(this.deltaY,this.deltaX);
                    
                    console.log("Swipe Detected. length : " + this.length+ " time : " + this.time)
                }
                
                self.ongoingTouches.splice(idx, 1);  // remove it; we're done
               // self.startTouchList.splice(idx, 1);
                self.touchCanvasPosition.x = -10;
                self.touchCanvasPosition.y = - 10;
                self.isTouching = false;
                self.right = false;
                self.left = false;
            }
            else 
            {      
                console.log("can't figure out which touch to end");
            }
        }
    }
    /**
     * this wraps the angle around the 360 mark
     * @param {number} angle 
     */
    angleTruncate(angle)
    {
        if(angle < 0)
        {
            angle+= Math.PI * 2;
        }
    }
    /**
     * this gets the angle between two points
     * @param {number} firstX 
     * @param {number} firstY 
     * @param {number} secondX 
     * @param {number} secondY 
     */
    angleBetweenTwoPoints(firstX,firstY,secondX,secondY)
    {
        this.deltaY = secondY - firstY;
        this.deltaX = secondX - firstX;
        return Math.atan2(this.deltaY,this.deltaX);
    }
    /**
     * this is the on touch move 
     * @param {event} e 
     * @param {this} self 
     */
    onTouchMove(e,self)
    {
        e.preventDefault();
        var touches = e.changedTouches; 
        for(var index = 0;index < touches.length;index++)
        {
            var color = "#FF0000"
            var idx = self.ongoingTouchIndexById(touches[index].identifier);
            if (idx >= 0) 
            {
                
                self.ongoingTouches.splice(idx, 1, self.copyTouch(touches[index]));
                
               // swap in the new touch record
                //console.log(e.changedTouches);
            }
            else 
            {
                console.log("can't figure out which touch to continue");
            }
            if (touches[0].pageX > Renderer.physicalScreenWidth / 2) {
                self.right = true;
                self.left = false;
            }
            if (touches[0].pageX < Renderer.physicalScreenWidth / 2) {
                self.right = false;
                self.left = true;
            }
        }
    }
    /**
     * this returns the information for the touch events
     */
    getIntupInfo()
    {
        this.inputInfo = {};
        this.vector = new vector(this.touchCanvasPosition.x, this.touchCanvasPosition.y);
        this.inputInfo = { position: this.vector, isTouching: this.touching, onGoingTouch: this.ongoingTouches };
        return this.inputInfo;
    }
    /**
     * this packages the touch events information into an dict
     * @param {touch} touch 
     */
    copyTouch(touch)
    {
        return {identifier: 0, pageX: touch.pageX, pageY: touch.pageY, timeStamp: Date.now()};    
    }
    /**
     * this copies the color for the object, not used at the moments
     * @param {touch} touch 
     */
    colorForTouch(touch)
    {
        var r = touch.identifier % 16;
        var g = Math.floor(touch.identifier / 3) % 16;
        var b = Math.floor(touch.identifier / 7) % 16;
        r = r.toString(16); // make it a hex digit
        g = g.toString(16); // make it a hex digit
        b = b.toString(16); // make it a hex digit
        var color = "#" + r + g + b;
        return color;
    }
    /**
     * this gets the touch index by id
     * @param {number} idToFind 
     */
    ongoingTouchIndexById(idToFind)
    {
        for (var i = 0; i < this.ongoingTouches.length; i++) 
        {
            var id = this.ongoingTouches[i].identifier;
            if (id === idToFind) 
            {
                return i;
            }
          }
          return -1;    // not found
    }
}