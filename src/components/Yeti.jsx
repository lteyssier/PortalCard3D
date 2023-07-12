/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 public/models/Yeti.gltf -o src/components/Yeti.jsx -r Public
*/

import { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Yeti({hovered,...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Yeti.gltf')
  const { actions } = useAnimations(animations, group)
  console.log(actions)

  useEffect(()=>{
    const anim = hovered ? "Wave" : "Idle"
    actions[anim].reset().fadeIn(0.2).play()
    return ()=> actions[anim].fadeOut(0.2)
  },[hovered])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Yeti">
            <skinnedMesh name="Cube059" geometry={nodes.Cube059.geometry} material={materials.Yeti_Main} skeleton={nodes.Cube059.skeleton} />
            <skinnedMesh name="Cube059_1" geometry={nodes.Cube059_1.geometry} material={materials.Yeti_Secondary} skeleton={nodes.Cube059_1.skeleton} />
            <skinnedMesh name="Cube059_2" geometry={nodes.Cube059_2.geometry} material={materials.Eye_Black} skeleton={nodes.Cube059_2.skeleton} />
            <skinnedMesh name="Cube059_3" geometry={nodes.Cube059_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube059_3.skeleton} />
            <skinnedMesh name="Cube059_4" geometry={nodes.Cube059_4.geometry} material={materials.Yeti_Teeth} skeleton={nodes.Cube059_4.skeleton} />
            <skinnedMesh name="Cube059_5" geometry={nodes.Cube059_5.geometry} material={materials.Tongue} skeleton={nodes.Cube059_5.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Yeti.gltf')
