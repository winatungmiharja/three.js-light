import ColorGUIHelper from "../ColorGUIHelper.js";
import { makeXYZGUI } from "../global.js";
import DegRadHelper from "../DegRadHelper.js";

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
    const planeMat = new THREE.MeshPhongMaterial({
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
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
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
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }
  //#endregion  //*======== Inisialisai Objek 3D dan lingkungan ===========

  {
    /**
     * Menambahkan Directional Light
     */
    const color = 0xff0000;
    const intensity = 0.95;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(4, 6, 10);
    light.target.position.set(-10, 0, 0);
    scene.add(light);
    scene.add(light.target);

    /**
     * Menambahkan helper untuk visualisasi arah (direction)
     */
    const helper = new THREE.DirectionalLightHelper(light);
    scene.add(helper);
    function updateLight() {
      light.target.updateMatrixWorld();
      helper.update();
    }
    updateLight();

    /**
     * Menambahkan GUI
     */
    const gui = new dat.GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 2, 0.01);

    makeXYZGUI(gui, light.position, "position", updateLight);
    makeXYZGUI(gui, light.target.position, "target", updateLight);
  }
  {
    /**
     * Menambahkan ambient light
     */
    const color = 0xdbff00;
    const intensity = 0.23;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);

    /**
     * Menambahkan GUI
     */
    const gui = new dat.GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 2, 0.01);
  }
  {
    /**
     * Menambahkan point light
     */
    const color = 0x0cf215;
    const intensity = 0.71;
    const distance = 12;
    const light = new THREE.PointLight(color, intensity, distance);
    light.position.set(-10, 10, 0);

    scene.add(light);

    /**
     * Menambahkan helper sebagaia visualisai sumber titik cahaya
     */
    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);

    function updateLight() {
      helper.update();
    }

    /**
     * Menambahkan GUI
     */
    const gui = new dat.GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 2, 0.01);
    gui.add(light, "distance", 0, 40).onChange(updateLight);

    makeXYZGUI(gui, light.position, "position");
  }
  {
    /**
     * Menambahkan Hemisphere Light
     */
    const skyColor = 0x0088dd; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
    /**
     * Menambahkan GUI
     */
    const gui = new dat.GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("skyColor");
    gui
      .addColor(new ColorGUIHelper(light, "groundColor"), "value")
      .name("groundColor");
    gui.add(light, "intensity", 0, 2, 0.01);
  }
  {
    /**
     * Menambahkan SpotLight
     */
    const color = 0x3e00ef;
    const intensity = 1.05;
    const distance = 32;
    const angle = Math.PI / 4;
    const penumbra = 0.18;
    const light = new THREE.SpotLight(
      color,
      intensity,
      distance,
      angle,
      penumbra
    );
    light.position.set(-4, 10, -6);
    light.target.position.set(-3.7, 0, 0);
    scene.add(light);
    scene.add(light.target);

    /**
     * Menambahkan helper untuk visualisai sumber cahaya spot
     */
    const helper = new THREE.SpotLightHelper(light);
    scene.add(helper);

    function updateLight() {
      light.target.updateMatrixWorld();
      helper.update();
    }
    updateLight();

    /**
     * Menambahkan GUI
     */
    const gui = new dat.GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 2, 0.01);
    gui.add(light, "distance", 0, 40).onChange(updateLight);
    gui
      .add(new DegRadHelper(light, "angle"), "value", 0, 90)
      .name("angle")
      .onChange(updateLight);
    gui.add(light, "penumbra", 0, 1, 0.01);

    makeXYZGUI(gui, light.position, "position", updateLight);
    makeXYZGUI(gui, light.target.position, "target", updateLight);
  }
  //#region  //*=========== Render 3D ===========
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
  //#endregion  //*======== Render 3D ===========
}

main();
