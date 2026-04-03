'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function ProfaseI() {
  return (
    <group>
      {/* Cell with disappearing nuclear membrane */}
      <Cell showNucleus={true} nucleusOpacity={0.3} membraneOpacity={0.3} />
      
      {/* Homologous pairs - positioned close together for synapsis */}
      {/* Pair 1: Top-left */}
      <Chromosome position={[-0.5, 0.4, 0]} rotation={[0, 0, Math.PI / 6]} color="#ef4444" />
      <Chromosome position={[-0.3, 0.4, 0]} rotation={[0, 0, Math.PI / 6]} color="#dc2626" />
      
      {/* Pair 2: Top-right with crossing-over indication */}
      <Chromosome position={[0.3, 0.3, 0.2]} rotation={[0, 0, -Math.PI / 4]} color="#ef4444" />
      <Chromosome position={[0.5, 0.3, 0.2]} rotation={[0, 0, -Math.PI / 4]} color="#dc2626" />
      
      {/* Pair 3: Bottom-left */}
      <Chromosome position={[-0.4, -0.3, -0.1]} rotation={[0, 0, Math.PI / 3]} color="#ef4444" />
      <Chromosome position={[-0.2, -0.3, -0.1]} rotation={[0, 0, Math.PI / 3]} color="#dc2626" />
      
      {/* Pair 4: Bottom-right */}
      <Chromosome position={[0.4, -0.2, 0.1]} rotation={[0, 0, -Math.PI / 5]} color="#ef4444" />
      <Chromosome position={[0.6, -0.2, 0.1]} rotation={[0, 0, -Math.PI / 5]} color="#dc2626" />
      
      {/* Spindle fibers forming from poles */}
      <SpindleFiber from={[-2.2, 0, 0]} to={[-0.5, 0.4, 0]} opacity={0.4} />
      <SpindleFiber from={[-2.2, 0, 0]} to={[0.3, 0.3, 0.2]} opacity={0.3} />
      <SpindleFiber from={[2.2, 0, 0]} to={[-0.4, -0.3, -0.1]} opacity={0.4} />
      <SpindleFiber from={[2.2, 0, 0]} to={[0.4, -0.2, 0.1]} opacity={0.3} />
      
      {/* Portuguese labels */}
      <Label3D position={[0, 2.2, 0]} text="Pareamento dos Homólogos" visible={true} />
      <Label3D position={[1.8, 0.8, 0]} text="Crossing-Over (Quiasmas)" visible={true} />
      <Label3D position={[-2.5, -2.2, 0]} text="Fuso Mitótico Formando" visible={true} />
    </group>
  )
}
