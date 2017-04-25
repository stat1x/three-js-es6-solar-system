class SkyBox {
    constructor(imagePrefix) {
        let directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
        let imageSuffix = ".png";
        let skyGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
        let imageURLs = [];
        let loader = new THREE.CubeTextureLoader();

        for (let i = 0; i < 6; i++) {
            imageURLs.push(imagePrefix + directions[i] + imageSuffix);
        }

        let textureCube = loader.load(imageURLs);
        let shader = THREE.ShaderLib["cube"];
        shader.uniforms["tCube"].value = textureCube;

        let skyMaterial = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        this.mesh = new THREE.Mesh(skyGeometry, skyMaterial);
    }

}

export default SkyBox;
