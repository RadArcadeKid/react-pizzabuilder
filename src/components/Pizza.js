import React, { useRef, Suspense } from 'react' 
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../index.css';
import { FaCarSide } from 'react-icons/fa';
import { FaPeopleCarry } from 'react-icons/fa';


// import PropTypes from 'prop-types'
import lowpolyza from './lowpolyza.glb'
//here's the thing...I'm quite aware its bad practice to render this from anywhere but the public folder..
//but for WHATEVER REASON this file won't import from anywhere but the current directory 
//and it just shows up as null...

//render the pizza 
function Asset({ props }) {
    const group = useRef(null);
    const { nodes, materials } = useLoader(GLTFLoader, lowpolyza);

    let scale = 0;
    let pos = [0,0.76,0];
    let xrot = 0.6;

    //scale model depending on size selected 
    if(props.includes("Small - 10")){
        scale = 1.32; 
    }
    else if(props.includes("Medium - 12")){
        scale = 1.5; 
        pos = [0, 1.3, 0];
        xrot = 0.7;
    }
    else if(props.includes("Large - 16")){
        scale = 1.58; 
        pos = [0,2,0];
        xrot = 0.8;
    }

    //check for crust (shouldn't display without it)
    if(!props.includes("White") && !props.includes("Wheat") && !props.includes("Gltn Free")){
        scale = 0; 
    }



    //rotate the pizza every frame! 
    useFrame(() => {
        group.current.rotation.x = xrot;
        group.current.rotation.y += 0.003;
    });

    //assume the base material is white crust
    let basemat = materials.ZA_WHITE_CRUST; 

    //update texture 
    if(props.includes("White")) {
        basemat = materials.ZA_WHITE_CRUST; 
        if(props.includes("Marinara")){  basemat = materials.ZA_WHITE_SAUCE; }
        if(props.includes("Mozzarella")){ basemat = materials.ZA_WHITE_SAUCE_MOZ; }
        if(props.includes("Cheddar")){ basemat = materials.ZA_WHITE_SAUCE_CHEDDAR; }
    }

    //account for wheat/gltn-free textures 
    if(props.includes("Wheat") || props.includes("Gltn Free")){
        basemat = materials.ZA_WHEAT_CRUST; 
        if(props.includes("Marinara")){  basemat = materials.ZA_WHEAT_SAUCE; }
        if(props.includes("Mozzarella")){ basemat = materials.ZA_WHEAT_SAUCE_MOZ; }
        if(props.includes("Cheddar")){ basemat = materials.ZA_WHEAT_SAUCE_CHEDDAR; }
    }

    return (
        <group ref={group}>
            <mesh 
                visible 
                position={pos}
                scale={[scale,scale,scale]}
                material={basemat}
                geometry={nodes.basemesh.geometry}>
            </mesh>
            {props.includes("Pepperoni") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.pep_COLOR}
                        geometry={nodes.pepmesh.geometry}>
                    </mesh>

            : null}
            {props.includes("Xtra Pepp.") ? 
                    <mesh 
                        visible 
                        position={pos}
                        rotation={[0,30,0]}
                        scale={[scale,scale,scale]}
                        material={materials.pep_COLOR}
                        geometry={nodes.pepmesh.geometry}>
                    </mesh>

            : null}
            {props.includes("Sausage") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.meatCOLOR}
                        geometry={nodes.beefmesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Bacon") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.bacon}
                        geometry={nodes.baconmesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Ham") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.hamCOLOR}
                        geometry={nodes.hammesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Mushrooms") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.mushroom}
                        geometry={nodes.mushmesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Onions") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.onionCOLOR}
                        geometry={nodes.onion_mesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Jalapeños") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.jalaCOLOR}
                        geometry={nodes.jalamesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Garlic") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.garlicCOLOR}
                        geometry={nodes.garlmesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Pineapple") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.pineCOLOR}
                        geometry={nodes.pinemesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Blk. Olives") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.blkolvCOLOR}
                        geometry={nodes.blkolvmesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Anchovies") ? 
                    <mesh 
                        visible 
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.anchovieCOLOR}
                        geometry={nodes.anchmesh.geometry}>
                    </mesh>
            : null}
            {props.includes("Spinach") ? 
                    <mesh 
                        visible
                        position={pos}
                        scale={[scale,scale,scale]}
                        material={materials.spinchCOLOR}
                        geometry={nodes.spinchmesh.geometry}>
                    </mesh>
            : null}
        </group>
    );
}




//copnverted to functional so hooks don't mess up 
export default function Pizza(props) {

        //flatten the array of props so that they can be passed into the Asset component 
        const flattenedArray = Object.values(props.ingredients).reduce((flattened, ingred) => {
                flattened = [...flattened, ...ingred];
                return flattened;
        }, []);

        let previewicon = null; 
        let previewPhrase = 'Pizza Preview:'; //default, should be previewing the pizza
        let deliverable = true; //default, set to true 


        //edgecases for certain conditions (i.e., no crust, size, etc.)
        if(!flattenedArray.includes("Small - 10") && !flattenedArray.includes("Medium - 12") && !flattenedArray.includes("Large - 16") ){ previewPhrase =`Don't forget to select a size!`; deliverable = false};
        if(!flattenedArray.includes("White") && !flattenedArray.includes("Wheat") && !flattenedArray.includes("Gltn Free") ){ previewPhrase =`Don't forget to select a crust!`; deliverable = false};
        if(!flattenedArray.length){ previewPhrase ='Pick ingredients and watch your pizza get built!'; deliverable = false}
        if(deliverable && flattenedArray.includes("Delivery")){ previewPhrase ='Ready to go - Delivery';  previewicon = <FaCarSide className='icon' /> }
        if(deliverable && flattenedArray.includes("Pickup")){ previewPhrase ='Ready to go - Pickup'; previewicon = <FaPeopleCarry className='icon' /> }


        return(
            <React.Fragment>
                <h3 className='noselect iconlabel'>   
                    {previewPhrase}
                    {previewicon}
                </h3>             
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10,10,10]} />
                    <Suspense fallback={null}>
                        <Asset props={flattenedArray} />
                    </Suspense>
                </Canvas>
            </React.Fragment>
        );
}
