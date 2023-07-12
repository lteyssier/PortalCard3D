/* eslint-disable react/no-unknown-property */
import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture,Text, CameraControls, useCursor } from "@react-three/drei"
import * as THREE from "three"
import { Demon } from "./Demon"
import { Ninja } from "./Ninja"
import { Yeti } from "./Yeti"
import { useEffect, useRef, useState } from "react"
import { act, useFrame, useThree } from "@react-three/fiber"
import { easing } from "maath"

const Experience = () => {
  const [active,setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  useCursor(hovered)
  const controlsRef = useRef()
  const scene = useThree((state) => state.scene)

  useEffect(()=> {
    if(active){
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(active).getWorldPosition(targetPosition)
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      ) 
    }else{
      controlsRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
        true)
    }
  },[active])

  return (
    <>
    <ambientLight intensity={0.5}/>   
    <Environment preset='sunset'/>
    <CameraControls ref={controlsRef}/>
    <MonsterStage texture={'/textures/anime_cyberpunk.jpeg'} name="Chocobomon" color={"#8a243a"}   active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
       <Demon scale={0.6} position-y={-1} hovered={hovered === "Chocobomon"}/>
    </MonsterStage>
    <MonsterStage texture={'/textures/painting_cyberpunk.jpeg'} name="Ninja" color={"#413a3d"} position-x={-2.5} rotation-y={Math.PI / 8} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
        <Ninja scale={0.6} position-y={-1} hovered={hovered === "Ninja"} />
    </MonsterStage>
    <MonsterStage texture={'/textures/scifi_cyberpunk.jpeg'} name="Yeti" color={"#5794af"} position-x={2.5} rotation-y={-Math.PI / 8} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
          <Yeti scale={0.6} position-y={-1} hovered={hovered === "Yeti"} />
    </MonsterStage>
   
  </>
  )
}

const MonsterStage = ({children, texture,name,color,active, setActive, hovered, setHovered, ...props}) => {
  const map = useTexture(texture)
  const portalMaterial = useRef()

  useFrame((_state, delta)=>{
    const worldOpen = active === name
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1:0, 0.2, delta)
 })

  return <group {...props}>
    
     <Text font="fonts/Roboto-Black.ttf" fontSize={0.3} position={[0,-1.3,0.051]} anchorY={"bottom"}>
       {name}
       <meshBasicMaterial color={color} toneMapped={false}/>
     </Text>
     <RoundedBox 
          name={name} 
          args={[2,3,0.1]} 
          onDoubleClick={() => setActive(active === name ? null: name)}
          onPointerEnter={()=> setHovered(name)}
          onPointerLeave={() => setHovered(null)}    
      >
      <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide} >
        <ambientLight intensity={0.5}/>   
         <Environment preset='sunset'/>
         {children}
            <mesh>
              <sphereGeometry args={[5,64,64]}/>
              <meshStandardMaterial map={map} side={THREE.BackSide}/>
            </mesh>
      </MeshPortalMaterial>
    </RoundedBox>
  </group>
}

export default Experience