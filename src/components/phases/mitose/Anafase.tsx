'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function Anafase() {
  return (
    <group>
      {/* Cell without visible nucleus */}
      <Cell showNucleus={false} membraneOpacity={0.3} />
      
      {/* Sister chromatids separating and migrating to poles */}
      <Chromosome position={[-1.5, 0.2, 0]} separated={true} color="#ef4444" />
      <Chromosome position={[-1.2, -0.3, 0.3]} separated={true} color="#ef4444" />
      <Chromosome position={[-1.4, 0, -0.2]} separated={true} color="#ef4444" />
      
      <Chromosome position={[1.5, 0.2, 0]} separated={true} color="#ef4444" />
      <Chromosome position={[1.2, -0.3, -0.3]} separated={true} color="#ef4444" />
      <Chromosome position={[1.4, 0, 0.2]} separated={true} color="#ef4444" />
      
      {/* Spindle fibers pulling chromatids to poles */}
      <SpindleFiber from={[-2.5, 0, 0]} to={[-1.5, 0.2, 0]} opacity={0.7} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[-1.2, -0.3, 0.3]} opacity={0.7} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[-1.4, 0, -0.2]} opacity={0.7} />
      
      <SpindleFiber from={[2.5, 0, 0]} to={[1.5, 0.2, 0]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[1.2, -0.3, -0.3]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[1.4, 0, 0.2]} opacity={0.7} />
      
      {/* Portuguese labels */}
      <Label3D position={[0, 2.2, 0]} text="Cromátides Irmãs Separando" visible={true} />
      <Label3D position={[-2, -2.2, 0]} text="Migração para os Polos" visible={true} />
    </group>
  )
}
