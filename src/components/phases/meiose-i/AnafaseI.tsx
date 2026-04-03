'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function AnafaseI() {
  return (
    <group>
      {/* Cell without visible nucleus */}
      <Cell showNucleus={false} membraneOpacity={0.3} />
      
      {/* Homologous chromosomes separating - sister chromatids stay together (separated=false) */}
      {/* Left pole - one set of homologs */}
      <Chromosome position={[-1.5, 0.3, 0]} separated={false} color="#ef4444" />
      <Chromosome position={[-1.3, -0.2, 0.3]} separated={false} color="#ef4444" />
      <Chromosome position={[-1.6, 0, -0.2]} separated={false} color="#ef4444" />
      <Chromosome position={[-1.4, -0.3, 0.1]} separated={false} color="#ef4444" />
      
      {/* Right pole - homologous partners */}
      <Chromosome position={[1.5, 0.3, 0]} separated={false} color="#dc2626" />
      <Chromosome position={[1.3, -0.2, -0.3]} separated={false} color="#dc2626" />
      <Chromosome position={[1.6, 0, 0.2]} separated={false} color="#dc2626" />
      <Chromosome position={[1.4, -0.3, -0.1]} separated={false} color="#dc2626" />
      
      {/* Spindle fibers pulling homologs to poles */}
      <SpindleFiber from={[-2.5, 0, 0]} to={[-1.5, 0.3, 0]} opacity={0.7} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[-1.3, -0.2, 0.3]} opacity={0.7} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[-1.6, 0, -0.2]} opacity={0.7} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[-1.4, -0.3, 0.1]} opacity={0.7} />
      
      <SpindleFiber from={[2.5, 0, 0]} to={[1.5, 0.3, 0]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[1.3, -0.2, -0.3]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[1.6, 0, 0.2]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[1.4, -0.3, -0.1]} opacity={0.7} />
      
      {/* Portuguese labels */}
      <Label3D position={[0, 2.2, 0]} text="Cromossomos Homólogos Separando" visible={true} />
      <Label3D position={[0, -2.5, 0]} text="Cromátides Permanecem Unidas" visible={true} />
    </group>
  )
}
