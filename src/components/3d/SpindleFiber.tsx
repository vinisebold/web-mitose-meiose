'use client'

import * as THREE from 'three'
import { Line } from '@react-three/drei'

interface SpindleFiberProps {
  from: [number, number, number]
  to: [number, number, number]
  opacity?: number
}

export function SpindleFiber({ from, to, opacity = 0.5 }: SpindleFiberProps) {
  return (
    <group>
      <Line
        points={[from, to]}
        color="#9ca3af"
        lineWidth={1.5}
        transparent
        opacity={opacity}
      />
      <mesh position={new THREE.Vector3(...from)}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#6b7280" transparent opacity={opacity + 0.3} />
      </mesh>
    </group>
  )
}
