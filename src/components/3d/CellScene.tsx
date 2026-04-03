'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense, ReactNode } from 'react'
import SceneLoader from '@/components/ui/SceneLoader'

interface CellSceneProps {
  children?: ReactNode
}

export default function CellScene({ children }: CellSceneProps) {
  return (
    <Suspense fallback={<SceneLoader />}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxDistance={8}
          minDistance={1.8}
        />
        {children}
      </Canvas>
    </Suspense>
  )
}
