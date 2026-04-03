'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function ProfaseII() {
  return (
    <group>
      <group position={[-1.5, 0, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.3} membraneOpacity={0.3} />
        
        <Chromosome position={[-0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 6]} separated={false} color="#ef4444" />
        <Chromosome position={[0.2, -0.1, 0.15]} rotation={[0, 0, -Math.PI / 4]} separated={false} color="#ef4444" />
        
        <SpindleFiber from={[-2.7, 0, 0]} to={[-1.8, 0.2, 0]} opacity={0.4} />
        <SpindleFiber from={[-0.3, 0, 0]} to={[-1.3, -0.1, 0.15]} opacity={0.3} />
      </group>
      
      <group position={[1.5, 0, 0]}>
        <Cell showNucleus={true} nucleusOpacity={0.3} membraneOpacity={0.3} />
        
        <Chromosome position={[-0.2, 0.15, 0]} rotation={[0, 0, -Math.PI / 6]} separated={false} color="#dc2626" />
        <Chromosome position={[0.3, -0.15, -0.15]} rotation={[0, 0, Math.PI / 4]} separated={false} color="#dc2626" />
        
        <SpindleFiber from={[0.3, 0, 0]} to={[1.3, 0.15, 0]} opacity={0.4} />
        <SpindleFiber from={[2.7, 0, 0]} to={[1.8, -0.15, -0.15]} opacity={0.3} />
      </group>
      
      <Label3D position={[0, 2.5, 0]} text="Cromossomos Condensando" visible={true} />
      <Label3D position={[0, -2.8, 0]} text="Fuso Formando" visible={true} />
    </group>
  )
}
