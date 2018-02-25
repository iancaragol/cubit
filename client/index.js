import * as S from '../solving';
import * as C from '../solving/constants';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

const COLOUR_TABLE = {
  'B': new THREE.Color('blue'),
  'R': new THREE.Color('red'),
  'Y': new THREE.Color('yellow'),
  'O': new THREE.Color('orange'),
  'W': new THREE.Color('ghostwhite'),
  'G': new THREE.Color('green'),
  'H': new THREE.Color('black')
};

const CUBE_SIZE = 0.94;

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
});

const createCube = (colours, position) => {

  const setFaceColour = (face, coloursIndex) => {
    const ch = colours[coloursIndex];
    face.color = COLOUR_TABLE[ch !== "-" ? ch : "H"];
  };

  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  geometry.faces.forEach(face => {
    face.normal.x === 1 && setFaceColour(face, C.RIGHT);
    face.normal.x === -1 && setFaceColour(face, C.LEFT);
    face.normal.y === 1 && setFaceColour(face, C.TOP);
    face.normal.y === -1 && setFaceColour(face, C.BOTTOM);
    face.normal.z === 1 && setFaceColour(face, C.BACK);
    face.normal.z === -1 && setFaceColour(face, C.FRONT);
  });

  const cube = new THREE.Mesh(geometry, material);

  cube.position.x = position.x;
  cube.position.y = position.y;
  cube.position.z = position.z;

  return cube;
};

const container = document.getElementById('container');
const w = container.offsetWidth;
const h = container.offsetHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, w / h, 1, 100);
camera.position.set(3.45, 7.35, -9.40);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
light1.position.set(0, 0, 10);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
light2.position.set(0, 0, -10);
scene.add(light2);

const light3 = new THREE.DirectionalLight(0xffffff, 0.8);
light3.position.set(0, 10, 0);
scene.add(light3);

const light4 = new THREE.DirectionalLight(0xffffff, 0.4);
light4.position.set(0, -10, 0);
scene.add(light4);

const light5 = new THREE.DirectionalLight(0xffffff, 0.4);
light5.position.set(10, 0, 0);
scene.add(light5);

const light6 = new THREE.DirectionalLight(0xffffff, 0.4);
light6.position.set(-10, 0, 0);
scene.add(light6);

const mainGroup = new THREE.Group();
scene.add(mainGroup);

const controls = new TrackballControls(camera, renderer.domElement);
controls.minDistance = 5.0;
controls.maxDistance = 40.0;
controls.noPan = true;

const render = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
};

window.addEventListener('resize', () => {
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
});

S.solvedCube.forEach(cube => {
  const position = {
    x: cube.x,
    y: cube.y,
    z: cube.z
  };
  mainGroup.add(createCube(cube.colours, position));
});

render();