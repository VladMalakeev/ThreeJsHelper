import {
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshToonMaterial,
    MeshStandardMaterial,
    MeshPhysicalMaterial
} from "three";
import Helpers from "./Helpers";

class Materials{
    createBasicMaterial(color){

        const basicMaterial = new MeshBasicMaterial( { color } );
        return basicMaterial;
    }

    createLambertMaterial(color){
        const lambertMaterial = new MeshLambertMaterial( { color } );
        return lambertMaterial;
    }

    createPhongMaterial(color){
        const shininess = 100;
        const phongMaterial = new MeshPhongMaterial( { color, shininess } );

        const phongMaterialHelper = new Helpers();
        phongMaterialHelper.addValue(phongMaterial, "shininess", 0,300);
        return phongMaterial;
    }

    createMeshToonMaterial(color){
        const toonMaterial = new MeshToonMaterial( { color } );
        return toonMaterial;
    }

    createMeshStandardMaterial(color){
        const roughness = 1; //шероховатость
        const metalness = 0;
        const standartMaterial = new MeshStandardMaterial( { color, roughness, metalness } );

        const standartMaterialHelper = new Helpers();
        standartMaterialHelper.addValue(standartMaterial, "roughness", 0,1);
        standartMaterialHelper.addValue(standartMaterial, "metalness", 0,1);
        return standartMaterial;
    }

    createMeshPhysicalMaterial(color){
        const roughness = 1;
        const metalness = 0;
        const clearcoat = 1; //глянцевость
        const clearcoatRoughness = 0;
        const physicalMaterial = new MeshPhysicalMaterial( {
            color,
            roughness,
            metalness,
            clearcoat,
            clearcoatRoughness,
        } );

        const physicalMaterialHelper = new Helpers();
        physicalMaterialHelper.addValue(physicalMaterial, "roughness", 0,1);
        physicalMaterialHelper.addValue(physicalMaterial, "metalness", 0,1);
        physicalMaterialHelper.addValue(physicalMaterial, "clearcoat", 0,1);
        physicalMaterialHelper.addValue(physicalMaterial, "clearcoatRoughness", 0,1);

        return physicalMaterial;
    }
}

export default Materials;