import dat from "dat-gui";
import raf from "raf";
import Stats from "stats-js";
import * as THREE from "three";
import Graphics from "./Graphics";

class Simulator {

    constructor() {
        this.graphics = null;
        this.gui = null;
        this.clock = new THREE.Clock();
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
        let displayOrbitsFolder = this.gui.addFolder('Afficher l\'orbite des planètes');
        displayOrbitsFolder.add(this.graphics, 'showOrbits', true);
        let rotationSpeedFolder = this.gui.addFolder('Vitesse de rotation des planètes');
        rotationSpeedFolder.add(this.graphics, 'rotationSpeed', 1, 10);
        let orbitSpeedFolder = this.gui.addFolder('Vitesse de l\'orbite des planètes');
        orbitSpeedFolder.add(this.graphics, 'orbitSpeed', 1, 10);
        let pauseFolder = this.gui.addFolder('Pause');
        pauseFolder.add(this.graphics, 'pause', false);
    }

    startWebGL() {
        this.graphics = new Graphics(this.SIZE.w, this.SIZE.h);
        document.body.appendChild(this.graphics.renderer.domElement);
    }

    update() {
        this.stats.begin();
        let d = this.clock.getDelta();
        this.graphics.update(d);
        this.stats.end();
        raf(this.update);
    }

    onKeyUp(e) {
        let key = e.which || e.keyCode;
        switch (key) {
            case 80:
                this.graphics.pause = !this.graphics.pause;
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

        this.graphics.onResize();
    }
}

export default Simulator;
