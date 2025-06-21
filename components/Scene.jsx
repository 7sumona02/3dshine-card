'use client'
import {Canvas, useThree} from 'react-three-fiber'
import Model from './Model'
import { Suspense } from 'react'
import { Html, ScrollControls, useProgress } from '@react-three/drei'

function Loader() {
    const {progress, active} = useProgress()

    return <Html center>{progress.toFixed(1)}% loaded</Html>
}

export default function Scene () {
    return (
        <Canvas gl={{antialias: true}} dpr={[1,1.5]} className='relative h-full'>
            <directionalLight position={[-5,-5,5]} intensity={4} />
            {/* model */}
            <Suspense fallback={<Loader />}>
                <ScrollControls damping={0.2} pages={2}>
                    <Model />
                </ScrollControls>
            </Suspense>
        </Canvas>
    )
}