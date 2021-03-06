// *************************************************
// File:         Planet.js
// Created:      03.04.17
// Author:       Jérémie Roulin
// *************************************************
import * as Constants from "../Constants";
import {TextureLoader, SphereGeometry, MeshLambertMaterial, LineBasicMaterial, CircleGeometry, Line, Mesh} from "three";

/**
 * Class Planet
 * Represents a Planet of a System.
 *
 * @author <a href="mailto:jeremie.roulin@heig-vd.ch>Jérémie Roulin</a>
 * @version 1.0
 */
class Planet {

    /**
     * Constructor.
     *
     * @param name the name of the planet (used by selected planet select box)
     * @param distanceFromSun the distance from the sun
     * @param orbitTime the orbit time
     * @param rotationTime the rotation time
     * @param radius the radius (size)
     * @param texturePath the path of the texture
     * @param systemCenter the center of the system
     */
    constructor(name, distanceFromSun, orbitTime, rotationTime, radius, texturePath, systemCenter) {
        this.name = name;
        this.distanceFromSun = distanceFromSun;
        this.orbitTime = orbitTime;
        this.rotationTime = rotationTime;
        this.radius = radius;
        this.texturePath = texturePath;
        this.theta = 0;
        this.systemCenter = systemCenter;

        let loader = new TextureLoader();
        let geometry = new SphereGeometry(this.radius * Constants.PLANET_SIZE_SCALE, 128, 128);
        let texture = loader.load(this.texturePath);
        let material = new MeshLambertMaterial({map: texture});
        this.mesh = new Mesh(geometry, material);
        this.mesh.position.set((systemCenter.x + this.distanceFromSun) * Constants.DISTANCE_SCALE, systemCenter.y, systemCenter.z);

        let lineMaterial = new LineBasicMaterial({color: 0xffffff});
        let orbitGeometry = new CircleGeometry((systemCenter.x + this.distanceFromSun) * Constants.DISTANCE_SCALE, 64);
        orbitGeometry.vertices.shift();

        this.orbit = new Line(orbitGeometry, lineMaterial);
        this.orbit.position.set(systemCenter.x, systemCenter.y, systemCenter.z);
    }

    /**
     * @return the position of the planet
     */
    getPosition() {
        return this.mesh.position;
    }

    /**
     * Tells whether the orbit has to be displayed or not
     *
     * @param display true to display the orbit
     */
    updateOrbit(display) {
        this.orbit.visible = display;
    }

    update(d, rotationSpeed, orbitSpeed) {
        this.mesh.rotateZ(rotationSpeed * Constants.ROTATION_SCALE_SPEED * this.rotationTime);
        this.theta += orbitSpeed * Constants.ORBIT_SCALE_SPEED * this.orbitTime;
        if (this.theta == 360) {
            this.theta = 0;
        }
        this.mesh.position.x = (this.systemCenter.x + this.distanceFromSun) * Constants.DISTANCE_SCALE * Math.cos(this.theta);
        this.mesh.position.y = (this.systemCenter.y + this.distanceFromSun) * Constants.DISTANCE_SCALE * Math.sin(this.theta);
    }

}

export default Planet;
