import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const helper = new THREE.AxesHelper(10);
scene.add(helper);

const loader = new GLTFLoader();
let model = null;
loader.load(
    "./katana.glb",
    function (gltf) {
        model = gltf.scene;
        model.scale.set(3, 3, 3);
        model.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        scene.add(model);
    }
);

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshStandardMaterial({color: 0xaaaaaa}),
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

const pLight = new THREE.PointLight(0xffdead, 100, 100);
pLight.position.set(5, 5, 5);
pLight.castShadow = true;
scene.add(pLight);
const aLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(aLight);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    // 0.1,
    // 100,
);
camera.position.set(10, 10, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight); 
});

const clock = new THREE.Clock();
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    camera.position.x = Math.cos(elapsedTime * 0.25) * 10;
    camera.position.z = Math.sin(elapsedTime * 0.25) * 10;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};
animate();