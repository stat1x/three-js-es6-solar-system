import dat from "dat-gui";
import raf from "raf";
import Stats from "stats-js";
import {Clock} from "three";
import View from "./View";

class Controller {

    constructor() {
        this.view = null;
        this.gui = null;
        this.clock = new Clock();
        this.DEBUG = true;
        this.SIZE = {
            w: window.innerWidth,
            w2: window.innerWidth / 2,
            h: window.innerHeight,
            h2: window.innerHeight / 2
        };
    }

    start() {
        this.bind();
        this.startWebGL();
        this.startStats();
        this.startGUI();
        this.addEventListener();
        this.update();
    }

    bind() {
        this.update = this.update.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    addEventListener() {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('keyup', this.onKeyUp);
    }

    startStats() {
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = 0;
        this.stats.domElement.style.display = this.DEBUG ? 'block' : 'none';
        this.stats.domElement.style.left = 0;
        this.stats.domElement.style.zIndex = 50;
        document.body.appendChild(this.stats.domElement);
    }

    startGUI() {
        this.gui = new dat.GUI();

        let controlFolder = this.gui.addFolder('Camera');
        controlFolder.add(this.view.controls, 'movementSpeed', 0.001, 0.5);
        controlFolder.add(this.view.controls, 'rollSpeed', 0.001, 0.5);
        controlFolder.open();

        let planetFolder = this.gui.addFolder('Planet');
        planetFolder.add(this.view, 'selectedPlanet', this.view.solarSystem.getPlanetNames());
        planetFolder.add(this.view, 'navigateToSelectedPlanet');

        this.gui.add(this.view, 'showOrbits', true);
        this.gui.add(this.view, 'rotationSpeed', 1, 20);
        this.gui.add(this.view, 'orbitSpeed', 1, 100);
        this.gui.add(this.view, 'pause', false);
    }

    startWebGL() {
        this.view = new View(this.SIZE.w, this.SIZE.h);
        document.body.appendChild(this.view.renderer.domElement);
    }

    update() {
        this.stats.begin();
        let d = this.clock.getDelta();
        this.view.update(d);
        this.stats.end();
        raf(this.update);
    }

    onKeyUp(e) {
        let key = e.which || e.keyCode;
        switch (key) {
            case 80:
                this.view.pause = !this.view.pause;
                break;
        }
    }

    onResize() {
        this.SIZE = {
            w: window.innerWidth,
            w2: window.innerWidth / 2,
            h: window.innerHeight,
            h2: window.innerHeight / 2
        };

        this.view.onResize();
    }
}

export default Controller;
