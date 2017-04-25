import * as Constants from "../Constants";

class Planet {
    constructor(distanceFromSun, orbitTime, rotationTime, radius, texturePath) {
        this.distanceFromSun = distanceFromSun;
        this.orbitTime = orbitTime;
        this.rotationTime = rotationTime;
        this.radius = radius;
        this.texturePath = texturePath;
        this.theta = 0;

        let loader = new THREE.TextureLoader();
        let geometry = new THREE.SphereGeometry(this.radius * Constants.PLANET_SIZE_SCALE, 32, 32);
        let texture = loader.load(this.texturePath);
        let material = new THREE.MeshLambertMaterial({map: texture});
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(this.distanceFromSun * Constants.DISTANCE_SCALE, 0, 0);
        this.mesh.rotation.z = Math.PI / 4;

        let segments = 128;
        let lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
        let orbitGeometry = new THREE.CircleGeometry(this.distanceFromSun * Constants.DISTANCE_SCALE, segments);
        orbitGeometry.vertices.shift();

        this.orbit = new THREE.Line(orbitGeometry, lineMaterial);
        this.orbit.position.x = 0;
    }

    getPosition() {
        return this.mesh.position;
    }

    updateOrbit(display) {
        this.orbit.visible = display;
        // console.log(display);
    }

    update(d, rotationSpeed, orbitSpeed) {

        this.mesh.rotateZ(rotationSpeed * Constants.ROTATION_SCALE_SPEED * this.rotationTime);
        this.theta += orbitSpeed * Constants.ORBIT_SCALE_SPEED * this.orbitTime;
        if(this.theta == 360) {
            this.theta = 0;
        }
        this.mesh.position.x = this.distanceFromSun * Constants.DISTANCE_SCALE * Math.cos(this.theta);
        this.mesh.position.y = this.distanceFromSun * Constants.DISTANCE_SCALE * Math.sin(this.theta);
        // this.mesh.translateX(this.distanceFromSun * Constants.DISTANCE_SCALE * Math.sin(theta) * 0.01);
        // this.mesh.translateY(this.distanceFromSun * Constants.DISTANCE_SCALE * Math.cos(theta) * 0.01);
        // let v = new THREE.Vector3(this.distanceFromSun * Constants.DISTANCE_SCALE * Math.cos(theta), this.distanceFromSun * Constants.DISTANCE_SCALE * Math.sin(theta), 0)
        // this.mesh.translateOnAxis(v, 50)
    }

}

export default Planet;
