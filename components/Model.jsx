import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { useFrame } from "react-three-fiber"

useGLTF.preload('/robot_playground.glb')

const Model = () => {
    const group = useRef(null)
    const {nodes, materials, animations, scene} = useGLTF('/robot_playground.glb')
    
    const { actions, clips} = useAnimations(animations, scene)
    const scroll = useScroll()

useEffect(() => {
    console.log(actions)
  actions['Experiment'].play().paused = true
}, []);
    useFrame(() => 
        (actions['Experiment'].time = (actions['Experiment'].getClip().duration * scroll.offset) / 3
    ))
  return (
    <group ref={group} scale={[1.2,1.2,1.2]} position={[0,0,0]}>
        <primitive object={scene} />
    </group>
  )
}

export default Model