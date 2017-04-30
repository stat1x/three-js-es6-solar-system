import {
    BoxGeometry,
    ShaderMaterial,
    CubeTextureLoader,
    Mesh,
    ShaderLib,
    BackSide
} from 'three';

class SkyBox {
    constructor(imagePrefix) {
        let directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
        let imageSuffix = ".png";
        let skyGeometry = new BoxGeometry(5000, 5000, 5000);
        let imageURLs = [];
        let loader = new CubeTextureLoader();

        for (let i = 0; i < 6; i++) {
            imageURLs.push(imagePrefix + directions[i] + imageSuffix);
        }

        let textureCube = loader.load(imageURLs);
        let shader = ShaderLib["cube"];
        shader.uniforms["tCube"].value = textureCube;

        let skyMaterial = new ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: BackSide
        });

        this.mesh = new Mesh(skyGeometry, skyMaterial);
    }

}

export default SkyBox;
