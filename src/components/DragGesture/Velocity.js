import { clamp } from "lodash";

class Velocity {
  static calculate(vector) {
    const unitVector = Velocity.normaliseVector(vector);
    const speed = Velocity.calculateSpeed(Velocity.getLength(vector));

    return {
      x: unitVector.x * speed,
      y: unitVector.y * speed
    };
  }

  static normaliseVector(vector) {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return {
      x: vector.x / length,
      y: vector.y / length
    };
  }

  static getLength(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  }

  static calculateSpeed(speed) {
    var accel_threshold = 1000;
    var accel_limit = 2000;
    var accel_factor = 1.5;
    var speed_limit = 2000;

    speed = Math.min(speed, speed_limit);

    var accel_range =
      clamp(speed, accel_threshold, accel_limit) /
      (accel_limit - accel_threshold);
    var accel = accel_range * accel_factor;
    speed = speed * accel;

    return speed;
  }
}

export default Velocity;
