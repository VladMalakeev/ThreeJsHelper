import {
    BoxGeometry,
    CircleGeometry,
    Mesh,
    TextGeometry,
    SphereGeometry,
    CylinderGeometry,
    ConeGeometry,
    PlaneGeometry,
    DoubleSide,
    FontLoader
} from "three";

import HelvetikerBold from "three/examples/fonts/helvetiker_bold.typeface";

class Primitives{

    createBox(material){
        const width = 2;
        const height = 2;
        const depth = 2;

        const boxGeometry = new BoxGeometry(width, height, depth);
        const box = new Mesh( boxGeometry, material );
        return box;
    }

    createCircle(material){
        const radius = 1;
        const segments = 20;
        const circleGeometry = new CircleGeometry(radius, segments);
        const circle = new Mesh( circleGeometry, material );
        circle.material.side = DoubleSide;

        return circle;
    }

    createCone(material){
        const radius =  1;
        const height = 2;
        const radialSegments = 50;
        const heightSegments =  3;
        const openEnded = false;
        const thetaStart = Math.PI * 2; //0-2
        const thetaLength = Math.PI * 2; //0-2

        const coneGeometry = new ConeGeometry(
            radius, height,
            radialSegments, heightSegments,
            openEnded,
            thetaStart, thetaLength
        );
        const cone = new Mesh( coneGeometry, material );

        return cone;
    }

    createCylinder(material){
        const radiusTop = 1;
        const radiusBottom = 1;
        const height = 2;
        const radialSegments = 12;
        const cylinderGeometry = new CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        const cylinder = new Mesh( cylinderGeometry, material );

        return cylinder;
    }

    createSphere(material){
        const radius = 1;
        const widthSegments = 30;
        const heightSegments = 30;
        const sphereGeometry = new SphereGeometry(radius, widthSegments, heightSegments);
        const circle = new Mesh( sphereGeometry, material );
        return circle;
    }

     createText(material, text){
        const loader = new FontLoader();
        let font = loader.parse(HelvetikerBold);
        const textGeometry = new TextGeometry(text, {
            font:font,
            size:  1,
            height:  0.5,
            width:0.5,
            curveSegments:  8,
            bevelEnabled: true,
            bevelThickness: 0.10,
            bevelSize: 0.0,
            bevelSegments: 8,
        });

        const textMesh = new Mesh( textGeometry, material );
        return textMesh;
    }

    createPlane(material){
        const width = 10;
        const height = 10;
        const planeGeometry = new PlaneGeometry(width,height);
        const plane = new Mesh( planeGeometry, material );
        return plane;
    }
}

export default Primitives;