import React, {useEffect, } from "react";

import {
    Scene,
    PerspectiveCamera,
    OrthographicCamera,
    WebGLRenderer,
    BoxGeometry,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    Color,
    GridHelper,
    CameraHelper,
    DoubleSide,
    BackSide
} from "three";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Primitives from "./Primitives";
import Lights from "./Lights";
import Materials from "./Materials";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {AnimationMixer} from "three/src/animation/AnimationMixer";
import {Clock} from "three/src/core/Clock";
import {TextureLoader} from "three/src/loaders/TextureLoader";
import {AxesHelper} from "three/src/helpers/AxesHelper";


function App() {

    const scene = createScene();
    const camera = createPerspectiveCamera();
   // const camera = createOrthographicCamera();
    const renderer = createRenderer();

    //HELPERS
    const axesHelper = new AxesHelper( 5 );
    const gridHelper = new GridHelper( 10, 10 );
    const controls = new OrbitControls( camera, renderer.domElement );

    const primitiveFactory = new Primitives();
    const lightsFactory = new Lights();
    const materialFactory = new Materials();

    const loader = new GLTFLoader();

    let mixer = null;
    const clock = new Clock();


    useEffect(() => {
        //scene.add( axesHelper );
        //scene?.add( gridHelper );

       // addPrimitives();
       //  addGround();
       //  addLights();
       //
       //  loadModel();
       //
       //  animate();
        document.body.appendChild(renderer?.domElement);
    },[])

    function animate() {
        requestAnimationFrame( animate );

        //controls.update();
        renderer.render( scene, camera );

        // const dt = clock.getDelta();
        // if ( mixer ) mixer.update( dt );
    };

    function createScene() {
        const scene = new Scene();
        scene.background = new Color( 0xb0b0b0 );

        return scene;
    };

    function createRenderer() {
        const renderer = new WebGLRenderer();
        renderer?.setSize( window.innerWidth, window.innerHeight );

        return renderer;
    };

    function createPerspectiveCamera(){
        const fov = 75; // field of view, 75deg
        const aspect = window.innerWidth / window.innerHeight; //  2
        const near = 0.1;
        const far = 1000;

        const camera = new PerspectiveCamera( fov, aspect, near, far );
        camera.position.set(0, 5, 5); //x,y,z

        return camera;
    };

    function createOrthographicCamera() {
        const left = -2;
        const right = 2;
        const top = 1.5;
        const bottom = -1.5;
        const near = 0;
        const far = 1000;
        const camera = new OrthographicCamera(left, right, top, bottom, near, far);
        camera.position.set(0, 5, 5);

        return camera;
    };

    function addPrimitives() {
        const material = materialFactory.createBasicMaterial("#FADA71");

         // const loader = new TextureLoader();
         // material.map =  loader.load('/assets/halo.jpg');

        const box = primitiveFactory.createBox(material);
        box.position.set(0, 1, 0);

        const circle = primitiveFactory.createCircle(material);
        circle.position.set(2, 1, 0);

        const cone = primitiveFactory.createCone(material);
        cone.position.set(-2, 1, 0);

        const cylinder = primitiveFactory.createCylinder(material);
        cylinder.position.set(-4, 1, 0);

        const sphere = primitiveFactory.createSphere(material);
        sphere.position.set(4, 1, 0);

        const text = primitiveFactory.createText(material, "Halo Lab");
        text.position.set(-2, 0, 2);

        scene.add( box );
        // scene.add( circle );
        // scene.add( cone );
        // scene.add( cylinder );
        // scene.add( sphere );
        // scene.add( text );
    };

    function addGround() {
        const planeMaterial = materialFactory.createLambertMaterial("#C9E2FA");
        const plane = primitiveFactory.createPlane(planeMaterial);
        plane.rotation.x = Math.PI * -.5;
        scene.add(plane)
    };

    function addLights () {
         const light = lightsFactory.createAmbientLight(); //ambient окружающий равномерный свет, не создает бликов и теней

        // const light = lightsFactory.createHemisphereLight(); //hemi тоже что и ambient только с 2мя цветами

        //const light = lightsFactory.createDirectionalLight(scene); //directional

        // const light = lightsFactory.createPointLight(scene); //pointLight

         //const light = lightsFactory.createSpotLight(scene); //spotLight

        scene.add(light);
    };

    function loadModel () {

        loader.load( "./assets/Duck/scene.gltf", function ( gltf ) {
            const model = gltf.scene;
            scene.add(model);

            const material = materialFactory.createBasicMaterial("#FADA71");
            // const material = materialFactory.createLambertMaterial("#FADA71");
            // const material = materialFactory.createPhongMaterial("#FADA71");
            // const material = materialFactory.createMeshToonMaterial("#FADA71");
            // const material = materialFactory.createMeshStandardMaterial("#FADA71");
            //const material = materialFactory.createMeshPhysicalMaterial("#FADA71");

            //hide custom texture
             [7,9,11,12,13,14].forEach(number =>  model.getObjectByName(`Object_${number}`).material = material)


            // mixer = new AnimationMixer( model );
            // const action = mixer.clipAction( gltf.animations[ 0 ] );
            // action.play();
        } );
    }

    return null;
}



export default App;
