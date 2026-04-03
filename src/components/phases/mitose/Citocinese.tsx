'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { Label3D } from '@/components/3d/Label3D'

export default function Citocinese() {
  return (
    <group>
      {/* Two daughter cells side by side with cleavage furrow */}
      <group position={[-1.5, 0, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.8} membraneOpacity={0.35} />
        
        {/* Chromosomes in left daughter cell */}
        <Chromosome position={[-0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 10]} color="#ef4444" />
        <Chromosome position={[0.2, -0.1, 0.15]} rotation={[0, 0, -Math.PI / 8]} color="#ef4444" />
        <Chromosome position={[0, 0, -0.15]} rotation={[0, 0, Math.PI / 12]} color="#ef4444" />
      </group>
      
      <group position={[1.5, 0, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.8} membraneOpacity={0.35} />
        
        {/* Chromosomes in right daughter cell */}
        <Chromosome position={[-0.2, 0.15, 0]} rotation={[0, 0, -Math.PI / 10]} color="#ef4444" />
        <Chromosome position={[0.3, -0.15, -0.15]} rotation={[0, 0, Math.PI / 8]} color="#ef4444" />
        <Chromosome position={[0, 0.05, 0.15]} rotation={[0, 0, -Math.PI / 12]} color="#ef4444" />
      </group>
      
      {/* Portuguese labels */}
      <Label3D position={[0, 2.5, 0]} text="Divisão do Citoplasma" visible={true} />
      <Label3D position={[0, -2.8, 0]} text="Duas Células-Filhas" visible={true} />
    </group>
  )
}
