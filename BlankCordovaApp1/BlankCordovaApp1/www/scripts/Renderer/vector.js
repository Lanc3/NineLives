
/**
 * This is the consctuctor of the vector class 
 * @param {number} x this is the x position of the vector
 * @param {number} y this is the y position of the vector
 * @constructor
 */
class vector
{
  constructor(x,y)
  {
    this.x = x || 0;
    this.y = y || 0;
  }
  /**
  * Function to add two vectors
  * @param {vector} vector adds the two vectors
  */
  add(vector)
  {
    this.x += vector.x;
    this.y += vector.y;
  }
  subtract(v)
  {
      return new vector(this.x - v.x, this.y - v.y);
  };
  /**
  * Function to add two vectors
  * @param {number} number multiply vector by number
  */
  multiply(v)
  {
      return new vector(this.x * v, this.y * v);
  }
  distance(vector)
  {
      var deltaX = this.x - vector.x;
      var deltaY = this.y - vector.y;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
  normalize()
  {
      this.mag = Math.sqrt(this.x * this.x + this.y * this.y);

      if (this.mag === 0)
      {
          this.x = 0;
          this.y = 0;
      } else
      {
          this.x = this.x / this.mag;
          this.y = this.y / this.mag;
      }
  };
  /**
  * direction control deprecated
  * @param {number} number to multply
  */
  multiplyNormalised(number)
  {
    this.newX = (this.x * number)/this.getMagnitude();
    this.newY = (this.y * number)/this.getMagnitude();
    this.x = this.newX;
    this.y = this.newY;
  }
    /**
  * Magnitude of the vector
  * @returns {number} retunrs amagnitude of the vector
  */
  getMagnitude()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
  * Angle of the vector
  * @returns {number} retunrs angle 
  */
  getAngle()
  {
    return Math.atan2(this.y,this.x);
  }
  /**
  * Function  get positon from angle
  * @param {number} angle the angle
  * @param {number} magnitude the mag of a vector
  */
  fromAngle(angle,magnitude)
  {
    return new Vector(magnitude * Math.cos(angle* (180/Math.PI)), magnitude * Math.sin(angle* (180/Math.PI)));
  }
}