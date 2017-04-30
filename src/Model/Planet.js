import * as Constants from "../Constants";
import {
    TextureLoader,
    SphereGeometry,
    MeshLambertMaterial,
    LineBasicMaterial,
    CircleGeometry,
    Line,
    Mesh
} from "three";

class Planet {
    constructor(distanceFromSun, orbitTime, rotationTime, radius, texturePath, position) {
        this.distanceFromSun = distanceFromSun;
        this.orbitTime = orbitTime;
        this.rotationTime = rotationTime;
        this.radius = radius;
        this.texturePath = texturePath;
        this.theta = 0;
        this.systemCenter = position;

        let loader = new TextureLoader();
        let geometry = new SphereGeometry(this.radius * Constants.PLANET_SIZE_SCALE, 128, 128);
        let texture = loader.load(this.texturePath);
        let material = new MeshLambertMaterial({map: texture});
        this.mesh = new Mesh(geometry, material);
        this.mesh.position.set((position.x + this.distanceFromSun) * Constants.DISTANCE_SCALE, position.y, position.z);

        let lineMaterial = new LineBasicMaterial({color: 0xffffff});
        let orbitGeometry = new CircleGeometry((position.x + this.distanceFromSun) * Constants.DISTANCE_SCALE, 64);
        orbitGeometry.vertices.shift();

        this.orbit = new Line(orbitGeometry, lineMaterial);
        this.orbit.position.set(position.x, position.y, position.z);
    }

    getPosition() {
        return this.mesh.position;
    }

    updateOrbit(display) {
        this.orbit.visible = display;
    }

    update(d, rotationSpeed, orbitSpeed) {

        this.mesh.rotateZ(rotationSpeed * Constants.ROTATION_SCALE_SPEED * this.rotationTime);
        this.theta += orbitSpeed * Constants.ORBIT_SCALE_SPEED * this.orbitTime;
        if(this.theta == 360) {
            this.theta = 0;
        }
        this.mesh.position.x = (this.systemCenter.x + this.distanceFromSun) * Constants.DISTANCE_SCALE * Math.cos(this.theta);
        this.mesh.position.y = (this.systemCenter.y + this.distanceFromSun) * Constants.DISTANCE_SCALE * Math.sin(this.theta);
    }

}

export default Planet;
