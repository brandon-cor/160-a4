// camera class that handles view position and orientation
class Camera {
  constructor() {
    // initialize camera position, look-at point, and up vector
    this.eye = new Vector3([0.0, 0.0, 3.0]);
    this.at = new Vector3([0.0, 0.0, 0.0]);
    this.up = new Vector3([0.0, 1.0, 0.0]);
  }

  // move camera forward along its view direction
  forward() {
    const f = new Vector3(this.at.elements);
    f.sub(this.eye);
    f.normalize();
    this.eye.add(f);
    this.at.add(f);
    return f;
  }

  // move camera backward along its view direction
  back() {
    const f = new Vector3(this.at.elements);
    f.sub(this.eye);
    f.normalize();
    this.eye.sub(f);
    this.at.sub(f);
    return f;
  }

  // move camera left perpendicular to its view direction
  left() {
    const f = new Vector3(this.at.elements);
    f.sub(this.eye);
    f.normalize();
    const s = Vector3.cross(f, this.up);
    s.normalize();
    this.eye.sub(s);
    this.at.sub(s);
    return s;
  }

  // move camera right perpendicular to its view direction
  right() {
    const f = new Vector3(this.at.elements);
    f.sub(this.eye);
    f.normalize();
    const s = Vector3.cross(f, this.up);
    s.normalize();
    this.eye.add(s);
    this.at.add(s);
    return s;
  }

  // rotate camera view direction left around the up vector
  turnLeft() {
    const f = new Vector3(this.at.elements);
    f.sub(this.eye);
    const r = Math.sqrt(f.elements[0] * f.elements[0] + f.elements[2] * f.elements[2]);
    let theta = Math.atan2(f.elements[0], f.elements[2]);
    theta += 0.2;
    f.elements[0] = r * Math.sin(theta);
    f.elements[2] = r * Math.cos(theta);
    f.add(this.eye);
    this.at = f;
  }

  // rotate camera view direction right around the up vector
  turnRight() {
    const f = new Vector3(this.at.elements);
    f.sub(this.eye);
    const r = Math.sqrt(f.elements[0] * f.elements[0] + f.elements[2] * f.elements[2]);
    let theta = Math.atan2(f.elements[0], f.elements[2]);
    theta -= 0.2;
    f.elements[0] = r * Math.sin(theta);
    f.elements[2] = r * Math.cos(theta);
    f.add(this.eye);
    this.at = f;
  }
}