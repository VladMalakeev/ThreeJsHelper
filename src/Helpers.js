import {GUI} from "three/examples/jsm/libs/dat.gui.module";
import {MathUtils} from "three";

class ColorGUIHelper {
    constructor(object, prop) {
        this.object = object;
        this.prop = prop;
    }
    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}

class DegRadHelper {
    constructor(obj, prop) {
        this.obj = obj;
        this.prop = prop;
    }
    get value() {
        return MathUtils.radToDeg(this.obj[this.prop]);
    }
    set value(v) {
        this.obj[this.prop] = MathUtils.degToRad(v);
    }
}

class Helpers{
    gui;

    constructor(){
        this.gui = new GUI();
    }

    addColor(light, property, name){
        this.gui.addColor(new ColorGUIHelper(light, property), 'value').name(name);
    }

    addValue(obj, name, min, max){
        this.gui.add(obj, name, min, max, 0.01);
    }

    addIntensity(light){
        this.gui.add(light, 'intensity', 0, 2, 0.01);
    }

    addDistance(light, updateLight){
        this.gui.add(light, 'distance', 0, 40).onChange(updateLight);
    }

    addAngle(light, updateLight){
        this.gui.add(new DegRadHelper(light, 'angle'), 'value', 0, 90).name('angle').onChange(updateLight);
    }

    addPenumbra(light){
        this.gui.add(light, 'penumbra', 0, 1, 0.01);
    }

    //меняем координаты источника света и цели
    addXYZGUI( vector3, name, onUpdate) {
        const folder = this.gui.addFolder(name);
        folder.add(vector3, 'x', -10, 10).onChange(onUpdate);
        folder.add(vector3, 'y', 0, 10).onChange(onUpdate);
        folder.add(vector3, 'z', -10, 10).onChange(onUpdate);
        folder.open();
    }

    //обновляет изменения на экране

}

export default Helpers;