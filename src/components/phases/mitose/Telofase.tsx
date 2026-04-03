'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function Telofase() {
  return (
    <group>
      {/* Cell with reappearing nuclear membrane */}
      <Cell showNucleus={true} nucleusOpacity={0.6} membraneOpacity={0.3} />
      
      {/* Decondensing chromosomes at poles - smaller and less defined */}
      <Chromosome position={[-1.3, 0.15, 0]} rotation={[0, 0, Math.PI / 8]} color="#ef4444" />
      <Chromosome position={[-1.1, -0.15, 0.2]} rotation={[0, 0, -Math.PI / 10]} color="#ef4444" />
      <Chromosome position={[-1.2, 0, -0.15]} rotation={[0, 0, Math.PI / 12]} color="#ef4444" />
      
      <Chromosome position={[1.3, 0.15, 0]} rotation={[0, 0, -Math.PI / 8]} color="#ef4444" />
      <Chromosome position={[1.1, -0.15, -0.2]} rotation={[0, 0, Math.PI / 10]} color="#ef4444" />
      <Chromosome position={[1.2, 0, 0.15]} rotation={[0, 0, -Math.PI / 12]} color="#ef4444" />
      
      {/* Fading spindle fibers */}
      <SpindleFiber from={[-2.2, 0, 0]} to={[-1.3, 0.15, 0]} opacity={0.3} />
      <SpindleFiber from={[-2.2, 0, 0]} to={[-1.2, 0, -0.15]} opacity={0.2} />
      <SpindleFiber from={[2.2, 0, 0]} to={[1.3, 0.15, 0]} opacity={0.3} />
      <SpindleFiber from={[2.2, 0, 0]} to={[1.2, 0, 0.15]} opacity={0.2} />
      
      {/* Portuguese labels */}
      <Label3D position={[0, 2.2, 0]} text="Membrana Nuclear Reaparecendo" visible={true} />
      <Label3D position={[0, -2.5, 0]} text="Cromossomos Descondensando" visible={true} />
    </group>
  )
}
