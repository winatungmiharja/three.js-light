import ColorGUIHelper from "../ColorGUIHelper.js";
import DegRadHelper from "../DegRadHelper.js";
import { makeXYZGUI } from "../global.js";

function main() {
  //#region  //*=========== General ===========
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");
  //#endregion  //*======== General ===========

  //#region  //*=========== Inisialisai Objek 3D dan lingkungan ===========
  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://r105.threejsfundamentals.org/threejs/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }
  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshStandardMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereBufferGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshStandardMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }
  //#endregion  //*======== Inisialisai Objek 3D dan lingkungan ===========

  {
    /**
     * Menamabahkan ReactAreaLight
     */
    const color = 0xffffff;
    const intensity = 5;
    const width = 12;
    const height = 4;
    const light = new THREE.RectAreaLight(color, intensity, width, height);
    light.position.set(0, 10, 0);
    light.rotation.x = THREE.Math.degToRad(-90);
    scene.add(light);

    /**
     * Menambahkan helper untuk visualisasi sumber cahaya Rectangle
     */
    const helper = new THREE.RectAreaLightHelper(light);
    light.add(helper);

    function updateLight() {
      helper.update();
    }

    /**
     * Menambahkan GUI
     */
    const gui = new dat.GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 10, 0.01);
    gui.add(light, "width", 0, 20).onChange(updateLight);
    gui.add(light, "height", 0, 20).onChange(updateLight);
    gui
      .add(new DegRadHelper(light.rotation, "x"), "value", -180, 180)
      .name("x rotation")
      .onChange(updateLight);
    gui
      .add(new DegRadHelper(light.rotation, "y"), "value", -180, 180)
      .name("y rotation")
      .onChange(updateLight);
    gui
      .add(new DegRadHelper(light.rotation, "z"), "value", -180, 180)
      .name("z rotation")
      .onChange(updateLight);

    makeXYZGUI(gui, light.position, "position", updateLight);
  }

  //#region  //*=========== Render ===========
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  //#endregion  //*======== Render ===========
}

main();
