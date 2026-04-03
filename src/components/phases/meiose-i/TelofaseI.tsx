'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { Label3D } from '@/components/3d/Label3D'

export default function TelofaseI() {
  return (
    <group>
      {/* Two haploid cells forming side by side */}
      <group position={[-1.5, 0, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.5} membraneOpacity={0.35} />
        
        {/* Chromosomes in left cell - still condensed */}
        <Chromosome position={[-0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 8]} separated={false} color="#ef4444" />
        <Chromosome position={[0.2, -0.1, 0.15]} rotation={[0, 0, -Math.PI / 6]} separated={false} color="#ef4444" />
        <Chromosome position={[0, 0.1, -0.15]} rotation={[0, 0, Math.PI / 10]} separated={false} color="#ef4444" />
        <Chromosome position={[-0.1, -0.2, 0]} rotation={[0, 0, -Math.PI / 12]} separated={false} color="#ef4444" />
      </group>
      
      <group position={[1.5, 0, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.5} membraneOpacity={0.35} />
        
        {/* Chromosomes in right cell - still condensed */}
        <Chromosome position={[-0.2, 0.15, 0]} rotation={[0, 0, -Math.PI / 8]} separated={false} color="#dc2626" />
        <Chromosome position={[0.3, -0.15, -0.15]} rotation={[0, 0, Math.PI / 6]} separated={false} color="#dc2626" />
        <Chromosome position={[0, 0.05, 0.15]} rotation={[0, 0, -Math.PI / 10]} separated={false} color="#dc2626" />
        <Chromosome position={[0.1, -0.25, 0]} rotation={[0, 0, Math.PI / 12]} separated={false} color="#dc2626" />
      </group>
      
      {/* Portuguese labels */}
      <Label3D position={[0, 2.5, 0]} text="Duas Células Haploides" visible={true} />
      <Label3D position={[0, -2.8, 0]} text="Cromossomos Condensados" visible={true} />
    </group>
  )
}
