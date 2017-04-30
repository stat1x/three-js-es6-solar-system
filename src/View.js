import System from "./Model/System";
import SkyBox from "./Model/SkyBox";
import FlyControls from "./Utility/FlyControls";
import {
    Scene,
    PerspectiveCamera,
    Vector3,
    WebGLRenderer,
    AmbientLight
} from "three";

class View {
    constructor(w, h) {
        this.showOrbits = false;
        this.rotationSpeed = 1;
        this.orbitSpeed = 1;
        this.pause = false;
        this.renderer = null;
        this.camera = null;
        this.scene = null;
        this.solarSystem = null;
        this.skybox = null;
        this.createScene();
        this.createRenderer(w, h);
        this.createControls();
        this.addObjects();
        this.onResize();
        this.update();
    }

    createScene() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 10000);
        this.camera.position.set(-0.2, 0.2, -0.5);
        this.camera.lookAt(new Vector3(0, 0, 0));
    }

    createRenderer(w, h) {
        this.renderer = new WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setSize(w, h);
        this.renderer.setClearColor(0x000000);
    }

    createControls() {
        this.controls = new FlyControls(this.camera, this.renderer.domElement);
        this.controls.movementSpeed = 0.1;
        this.controls.rollSpeed = 0.0025;
        this.controls.autoForward = false;
        this.controls.dragToLook = false;
    }

    addObjects() {
        this.skybox = new SkyBox('images/nebula-');
        this.scene.add(this.skybox.mesh);
        this.initSystems();
        this.initLights();
        this.scene.add(this.spaceShip);
    }

    initSystems() {
        this.solarSystem = new System(this.scene);
        this.solarSystem.addStar(0, 0, 0);
        this.solarSystem.addPlanet(57910000, 88, 58.6, 2440, 'images/planets/mercury.jpg'); // mercury
        this.solarSystem.addPlanet(108200000, 224.65, 243, 6052, 'images/planets/venus.jpg'); // venus
        this.solarSystem.addPlanet(149600000, 365, 1, 6371, 'images/planets/earth.jpg'); // earth
        this.solarSystem.addPlanet(227939100, 686, 1.03, 3389, 'images/planets/mars.jpg'); // mars
        this.solarSystem.addPlanet(778500000, 4332, 0.4139, 69911, 'images/planets/jupiter.jpg'); // jupiter
        this.solarSystem.addPlanet(1433000000, 10759, 0.44375, 58232, 'images/planets/saturn.jpg'); // saturn
        this.solarSystem.addPlanet(2877000000, 30685, 0.718056, 25362, 'images/planets/uranus.jpg'); // uranus
        this.solarSystem.addPlanet(4503000000, 60188, 0.6713, 24622, 'images/planets/neptune.jpg'); // neptune
        this.solarSystem.addPlanet(5906380000, 90616, 6.39, 1137, 'images/planets/pluto.jpg'); // pluto
        this.solarSystem.addAsteroidBelt(3, 4, 30000000);

        // this.solarSystem2 = new System(this.scene);
        // this.solarSystem2.addStar(2, 2, 2);
        // this.solarSystem2.addPlanet(34234234, 30685, 1, 3333, 'images/planets/land_ocean_ice_cloud_2048.jpg'); // earth
        // this.solarSystem2.addPlanet(4354325, 686, 1.03, 3389, 'images/planets/mars_1k_color.jpg'); // mars
        // this.solarSystem2.addPlanet(423534253, 34, 0.4139, 69911, 'images/planets/jupitermap.jpg'); // jupiter
        // this.solarSystem2.addPlanet(764678676, 5325, 0.44375, 58232, 'images/planets/saturnmap.jpg'); // saturn
        // this.solarSystem2.addPlanet(532525253, 30685, 0.718056, 25362, 'images/planets/uranusmap.jpg'); // uranus
        // this.solarSystem2.addAsteroidBelt(1, 2, 30000000);
    }

    update(d) {
        if (!this.pause) {
            this.solarSystem.update(d, this.rotationSpeed, this.orbitSpeed);
            // this.solarSystem2.update(d, this.rotationSpeed, this.orbitSpeed);
        }
        this.solarSystem.updateOrbits(this.showOrbits);
        // this.solarSystem2.updateOrbits(this.showOrbits);
        this.renderer.render(this.scene, this.camera);
        this.controls.update(d);
    }

    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    initLights() {
        let ambientLight = new AmbientLight(0x383838);
        this.scene.add(ambientLight);
    }
}

export default View;
