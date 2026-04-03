'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function Metafase() {
  return (
    <group>
      {/* Cell without visible nucleus */}
      <Cell showNucleus={false} membraneOpacity={0.3} />
      
      {/* Chromosomes aligned at equatorial plate */}
      <Chromosome position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 4]} color="#ef4444" />
      <Chromosome position={[-0.2, 0, 0.2]} rotation={[0, 0, -Math.PI / 6]} color="#ef4444" />
      <Chromosome position={[0.2, 0, -0.2]} rotation={[0, 0, Math.PI / 3]} color="#ef4444" />
      <Chromosome position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 4]} color="#ef4444" />
      <Chromosome position={[0, 0, 0.4]} rotation={[0, 0, Math.PI / 5]} color="#ef4444" />
      
      {/* Spindle fibers attached to chromosomes */}
      <SpindleFiber from={[-2.5, 0, 0]} to={[-0.6, 0, 0]} opacity={0.6} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[-0.2, 0, 0.2]} opacity={0.6} />
      <SpindleFiber from={[2.5, 0, 0]} to={[0.2, 0, -0.2]} opacity={0.6} />
      <SpindleFiber from={[2.5, 0, 0]} to={[0.6, 0, 0]} opacity={0.6} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[0, 0, 0.4]} opacity={0.5} />
      <SpindleFiber from={[2.5, 0, 0]} to={[0, 0, 0.4]} opacity={0.5} />
      
      {/* Portuguese labels */}
      <Label3D position={[0, 2.2, 0]} text="Placa Equatorial" visible={true} />
      <Label3D position={[0, -2.5, 0]} text="Cromossomos Alinhados" visible={true} />
      <Label3D position={[-2.8, 0.8, 0]} text="Fuso Mitótico" visible={true} />
    </group>
  )
}
