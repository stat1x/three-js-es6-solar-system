import System from "./Model/System";
import SkyBox from "./Model/SkyBox";
import * as Constants from "./Constants";
// import * as THREE from "three";

let FlyControls = require("three-fly-controls")(THREE);

class Graphics {
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
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 10000);
        this.camera.position.set(-0.2, 0.2, 0);
        this.camera.lookAt(new THREE.Vector3(200, 0, 0));
    }

    createRenderer(w, h) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(w, h);
        this.renderer.setClearColor(0x000000);
    }

    createControls() {
        this.controls = new THREE.FlyControls(this.camera, this.renderer.domElement);
        this.controls.movementSpeed = 0.001;
        this.controls.rollSpeed = 0.0025;
        this.controls.autoForward = false;
        this.controls.dragToLook = false;
    }

    addObjects() {
        this.solarSystem = new System(this.scene);
        this.solarSystem.addPlanet(57910000, 88, 58.6, 2440, 'images/planets/mercurymap.jpg'); // mercury
        this.solarSystem.addPlanet(108200000, 224.65, 243, 6052, 'images/planets/venusmap.jpg'); // venus
        this.solarSystem.addPlanet(149600000, 365, 1, 6371, 'images/planets/land_ocean_ice_cloud_2048.jpg'); // earth
        this.solarSystem.addPlanet(227939100, 686, 1.03, 3389, 'images/planets/mars_1k_color.jpg'); // mars
        this.solarSystem.addPlanet(778500000, 4332, 0.4139, 69911, 'images/planets/jupitermap.jpg'); // jupiter
        this.solarSystem.addPlanet(1433000000, 10759, 0.44375, 58232, 'images/planets/saturnmap.jpg'); // saturn
        this.solarSystem.addPlanet(2877000000, 30685, 0.718056, 25362, 'images/planets/uranusmap.jpg'); // uranus
        this.solarSystem.addPlanet(4503000000, 60188, 0.6713, 24622, 'images/planets/neptunemap.jpg'); // neptune
        this.solarSystem.addPlanet(5906380000, 90616, 6.39, 1137, 'images/planets/plutomap1k.jpg'); // pluto

        let sky = new THREE.Sky();

        this.scene.add(sky.mesh);

        let sunSphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(2440 * Constants.PLANET_SIZE_SCALE, 32, 32),
            new THREE.MeshBasicMaterial({color: 0xffffff})
        );

        this.scene.add(sunSphere);

        // let uniforms = sky.uniforms;
        // uniforms.turbidity.value = 10;
        // uniforms.rayleigh.value = 2;
        // uniforms.luminance.value = 1.1;
        // uniforms.mieCoefficient.value = 0.005;
        // uniforms.mieDirectionalG.value = 0.8;
        // sky.uniforms.sunPosition.value.copy(sunSphere.position);

        // this.axes = new THREE.AxisHelper(2000);
        // this.scene.add(this.axes);

        this.skybox = new SkyBox('images/nebula-');
        this.scene.add(this.skybox.mesh);

        let ambientLight = new THREE.AmbientLight(0x383838);
        let light = new THREE.PointLight(0xffffff);
        light.position.set(0, 0, 0);

        this.scene.add(light);
        this.scene.add(ambientLight);
    }

    update(d) {
        if (!this.pause) {
            this.solarSystem.update(d, this.rotationSpeed, this.orbitSpeed);
        }
        this.solarSystem.updateOrbits(this.showOrbits);
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}

export default Graphics;
