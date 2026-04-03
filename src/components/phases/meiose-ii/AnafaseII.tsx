'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function AnafaseII() {
  return (
    <group>
      <group position={[-1.5, 0, 0]}>
        <Cell showNucleus={false} membraneOpacity={0.3} />
        
        <Chromosome position={[-2.2, 0.2, 0]} separated={true} color="#ef4444" />
        <Chromosome position={[-2.0, -0.2, 0.2]} separated={true} color="#ef4444" />
        <Chromosome position={[-2.3, 0, -0.15]} separated={true} color="#ef4444" />
        
        <Chromosome position={[-0.8, 0.2, 0]} separated={true} color="#ef4444" />
        <Chromosome position={[-1.0, -0.2, -0.2]} separated={true} color="#ef4444" />
        <Chromosome position={[-0.7, 0, 0.15]} separated={true} color="#ef4444" />
        
        <SpindleFiber from={[-2.7, 0, 0]} to={[-2.2, 0.2, 0]} opacity={0.7} />
        <SpindleFiber from={[-2.7, 0, 0]} to={[-2.0, -0.2, 0.2]} opacity={0.7} />
        <SpindleFiber from={[-0.3, 0, 0]} to={[-0.8, 0.2, 0]} opacity={0.7} />
        <SpindleFiber from={[-0.3, 0, 0]} to={[-1.0, -0.2, -0.2]} opacity={0.7} />
      </group>
      
      <group position={[1.5, 0, 0]}>
        <Cell showNucleus={false} membraneOpacity={0.3} />
        
        <Chromosome position={[0.7, 0.2, 0]} separated={true} color="#dc2626" />
        <Chromosome position={[1.0, -0.2, -0.2]} separated={true} color="#dc2626" />
        <Chromosome position={[0.8, 0, 0.15]} separated={true} color="#dc2626" />
        
        <Chromosome position={[2.2, 0.2, 0]} separated={true} color="#dc2626" />
        <Chromosome position={[2.0, -0.2, 0.2]} separated={true} color="#dc2626" />
        <Chromosome position={[2.3, 0, -0.15]} separated={true} color="#dc2626" />
        
        <SpindleFiber from={[0.3, 0, 0]} to={[0.7, 0.2, 0]} opacity={0.7} />
        <SpindleFiber from={[0.3, 0, 0]} to={[1.0, -0.2, -0.2]} opacity={0.7} />
        <SpindleFiber from={[2.7, 0, 0]} to={[2.2, 0.2, 0]} opacity={0.7} />
        <SpindleFiber from={[2.7, 0, 0]} to={[2.0, -0.2, 0.2]} opacity={0.7} />
      </group>
      
      <Label3D position={[0, 2.5, 0]} text="Cromátides Irmãs Separando" visible={true} />
      <Label3D position={[0, -2.8, 0]} text="Separação Simultânea" visible={true} />
    </group>
  )
}
