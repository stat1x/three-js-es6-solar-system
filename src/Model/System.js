import Planet from "./Planet";
import * as Constants from "../Constants";
import MathUtility from "../Utility/MathUtility";
import {
    Mesh, 
    SphereBufferGeometry, 
    SphereGeometry,
    MeshBasicMaterial,
    PointLight,
    Object3D,
    TextureLoader,
    MeshLambertMaterial
} from "three";

class System {

    constructor(scene) {
        this.planets = [];
        this.scene = scene;
        this.star = null;
        this.asteroidBelt = null;
        this.loader = new TextureLoader();
    }

    addStar(x, y, z) {
        this.star = new Mesh(new SphereBufferGeometry( 0.1, 32, 32 ), new MeshBasicMaterial({color: 0xffffff}));
        this.star.position.set(x, y, z);
        this.scene.add(this.star);

        let light = new PointLight(0xffffff);
        light.position.set(x, y, z);
        this.scene.add(light);
    }

    addPlanet(name, distanceFromSun, orbitTime, rotationTime, radius, texturePath) {
        let p = new Planet(name, distanceFromSun, orbitTime, rotationTime, radius, texturePath, this.star.position);
        this.planets.push(p);
        this.scene.add(p.mesh);
        this.scene.add(p.orbit);
    }

    addAsteroidBelt(beetweenPlanet1, beetweenPlanet2, externalRadius) {
        this.asteroidBelt = new Object3D();
        this.scene.add(this.asteroidBelt);
        let texture = this.loader.load('images/asteroid.jpg');
        let material = new MeshLambertMaterial({map: texture});

        for (let x = 0; x < 3000; x++) {
            let asteroidSize = MathUtility.getRandomArbitrary(0.075, 1),
                asteroidShape1 = MathUtility.getRandomArbitrary(4, 10),
                asteroidShape2 = MathUtility.getRandomArbitrary(4, 10),
                asteroidOrbit = MathUtility.getRandomArbitrary(
                    (this.planets[beetweenPlanet1].distanceFromSun + 57939100) * Constants.DISTANCE_SCALE,
                    (this.planets[beetweenPlanet2].distanceFromSun - 327939100) * Constants.DISTANCE_SCALE
                );

            let asteroid = new Mesh(
                new SphereGeometry(asteroidSize * 0.015, asteroidShape1, asteroidShape2),
                material
            );

            let radians = MathUtility.getRandomArbitrary(0, 360) * Math.PI;
            asteroid.position.x = Math.cos(radians) * asteroidOrbit;
            asteroid.position.y = Math.sin(radians) * asteroidOrbit;
            asteroid.position.z = 0;

            this.asteroidBelt.add(asteroid);
        }
    }

    getPlanetNames() {
        let names = {};
        for (let i = 0; i < this.planets.length; i++) {
            names[this.planets[i].name] = i;
        }

        return names;
    }

    getPlanetPosition(planetIndex) {
        return this.planets[planetIndex].getPosition();
    }

    updateOrbits(show) {
        for (let i = 0; i < this.planets.length; i++) {
            this.planets[i].updateOrbit(show);
        }
    }

    update(d, rotationSpeed, orbitSpeed) {
        for (let i = 0; i < this.planets.length; i++) {
            this.planets[i].update(d, rotationSpeed, orbitSpeed);
        }
    }
}

export default System;
