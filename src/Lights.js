import {
    AmbientLight,
    HemisphereLight,
    DirectionalLight,
    DirectionalLightHelper,
    PointLight,
    PointLightHelper,
    SpotLight,
    SpotLightHelper, MathUtils
} from "three";
import {GUI} from "three/examples/jsm/libs/dat.gui.module";
import Helpers from "./Helpers";

class Lights{

    createAmbientLight(){
        //окружающий равномерный свет, без теней, добавляет яркости в сцену
        const color = 0xFFFFFF;
        const intensity = 1;
        const ambientLight = new AmbientLight(color, intensity);


        const ambientHelper = new Helpers();
        ambientHelper.addColor(ambientLight, "color","color");
        ambientHelper.addIntensity(ambientLight);

        return ambientLight;
    }

    createHemisphereLight(){
        //освещение которое принимает 2 цвета, часто эмулируют цвет неба и земли
        const intensity = 1;
        const color = 0xB1E1FF;
        const groundColor = 0xB97A20;
        const hemisphereLight = new HemisphereLight(color, groundColor, intensity);

        const hemisphereLightHelper = new Helpers();
        hemisphereLightHelper.addColor(hemisphereLight,'color','top color');
        hemisphereLightHelper.addColor(hemisphereLight,'groundColor','bottom color');
        hemisphereLightHelper.addIntensity(hemisphereLight);

        return hemisphereLight;
    }

    createDirectionalLight(scene){
        // используется для создания солнечных лучей
        const color = 0xFFFFFF;
        const intensity = 1;
        const directionalLight = new DirectionalLight(color, intensity);
        directionalLight.position.set(0, 7, 4);
        directionalLight.target.position.set(-5, 0, 0);

        //отобразить позицию источнка
        const helper = new DirectionalLightHelper(directionalLight);
        scene.add(helper);

        const directionalLightHelper = new Helpers();
        directionalLightHelper.addColor(directionalLight, "color", "color");
        directionalLightHelper.addIntensity(directionalLight);

        const updateLight = () => {
            directionalLight.target.updateMatrixWorld();
            helper.update();
        };

        directionalLightHelper.addXYZGUI(directionalLight.position, 'position', updateLight);
        directionalLightHelper.addXYZGUI(directionalLight.target.position, 'target', updateLight);


        return directionalLight;
    }

    createPointLight(scene){
        //свет который излучается из одной точки во всех направлениях
        const color = 0xFFFFFF;
        const intensity = 1;
        const pointLight = new PointLight(color, intensity);
        pointLight.position.set(0, 5, 4);

        const pointLightHelper = new Helpers();
        const helper = new PointLightHelper(pointLight);
        pointLightHelper.addColor(pointLight, "color", "color");
        pointLightHelper.addIntensity(pointLight);
        pointLightHelper.addDistance(pointLight, () => helper.update());
        pointLightHelper.addXYZGUI(pointLight.position, 'position');
        scene.add(helper);
        return pointLight;
    }

    createSpotLight(scene){
        //прожектор
        const color = 0xFFFFFF;
        const intensity = 1;
        const angle = MathUtils.degToRad(12);
        const distance = 25;
        const spotLight = new SpotLight(color, intensity);
        spotLight.angle = angle;
        spotLight.distance = distance;
        spotLight.position.set(1, 10, 10);
        spotLight.target.position.set(0.7, 3, 4);

        const helper = new SpotLightHelper(spotLight);
        const spotLightHelper = new Helpers();
        scene.add(helper);

        const updateLight = () => {
            spotLight.target.updateMatrixWorld();
            helper.update();
        };

        spotLightHelper.addColor(spotLight, "color","color");
        spotLightHelper.addIntensity(spotLight);
        spotLightHelper.addDistance(spotLight, updateLight);

        spotLightHelper.addAngle(spotLight, updateLight);
        spotLightHelper.addPenumbra(spotLight);

        spotLightHelper.addXYZGUI(spotLight.position, 'position', updateLight);
        spotLightHelper.addXYZGUI(spotLight.target.position, 'target', updateLight);

        return spotLight;
    }
}

export default Lights