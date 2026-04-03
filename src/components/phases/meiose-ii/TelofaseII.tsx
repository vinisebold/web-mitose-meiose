'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { Label3D } from '@/components/3d/Label3D'

export default function TelofaseII() {
  return (
    <group>
      <group position={[-1.8, 0.9, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.8} membraneOpacity={0.35} />
        
        <Chromosome position={[-0.15, 0.1, 0]} rotation={[0, 0, Math.PI / 10]} color="#ef4444" />
        <Chromosome position={[0.1, -0.1, 0.1]} rotation={[0, 0, -Math.PI / 8]} color="#ef4444" />
      </group>
      
      <group position={[1.8, 0.9, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.8} membraneOpacity={0.35} />
        
        <Chromosome position={[-0.1, 0.05, 0]} rotation={[0, 0, -Math.PI / 10]} color="#ef4444" />
        <Chromosome position={[0.15, -0.05, -0.1]} rotation={[0, 0, Math.PI / 8]} color="#ef4444" />
      </group>
      
      <group position={[-1.8, -0.9, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.8} membraneOpacity={0.35} />
        
        <Chromosome position={[-0.1, 0.1, 0]} rotation={[0, 0, Math.PI / 12]} color="#dc2626" />
        <Chromosome position={[0.15, -0.1, 0.1]} rotation={[0, 0, -Math.PI / 9]} color="#dc2626" />
      </group>
      
      <group position={[1.8, -0.9, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.8} membraneOpacity={0.35} />
        
        <Chromosome position={[-0.15, 0.05, 0]} rotation={[0, 0, -Math.PI / 12]} color="#dc2626" />
        <Chromosome position={[0.1, -0.05, -0.1]} rotation={[0, 0, Math.PI / 9]} color="#dc2626" />
      </group>
      
      <Label3D position={[0, 2.8, 0]} text="Quatro Células Haploides" visible={true} />
      <Label3D position={[0, -3.0, 0]} text="Geneticamente Diferentes" visible={true} />
    </group>
  )
}
