import Planet from './Planet';

class System {

    constructor(scene) {
        this.planets = [];
        this.scene = scene;
    }

    addPlanet(distanceFromSun, orbitTime, rotationTime, radius, texturePath) {
        let p = new Planet(distanceFromSun, orbitTime, rotationTime, radius, texturePath)
        this.planets.push(p);
        this.scene.add(p.mesh);
        this.scene.add(p.orbit);
    }

    updateOrbits(show) {
        for(let i = 0; i < this.planets.length; i++) {
            this.planets[i].updateOrbit(show);
        }
    }

    update(d, rotationSpeed, orbitSpeed) {
        for(let i = 0; i < this.planets.length; i++) {
            this.planets[i].update(d, rotationSpeed, orbitSpeed);
        }
    }

}

export default System;
