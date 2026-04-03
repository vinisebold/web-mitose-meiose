'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function MetafaseII() {
  return (
    <group>
      <group position={[-1.5, 0, 0]}>
        <Cell showNucleus={false} membraneOpacity={0.3} />
        
        <Chromosome position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} separated={false} color="#ef4444" />
        <Chromosome position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 2]} separated={false} color="#ef4444" />
        <Chromosome position={[0.25, 0, -0.1]} rotation={[0, 0, Math.PI / 2]} separated={false} color="#ef4444" />
        
        <SpindleFiber from={[-2.7, 0, 0]} to={[-1.75, 0, 0]} opacity={0.7} />
        <SpindleFiber from={[-2.7, 0, 0]} to={[-1.5, 0, 0.2]} opacity={0.7} />
        <SpindleFiber from={[-0.3, 0, 0]} to={[-1.25, 0, -0.1]} opacity={0.7} />
      </group>
      
      <group position={[1.5, 0, 0]}>
        <Cell showNucleus={false} membraneOpacity={0.3} />
        
        <Chromosome position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} separated={false} color="#dc2626" />
        <Chromosome position={[0, 0, -0.2]} rotation={[0, 0, Math.PI / 2]} separated={false} color="#dc2626" />
        <Chromosome position={[0.25, 0, 0.1]} rotation={[0, 0, Math.PI / 2]} separated={false} color="#dc2626" />
        
        <SpindleFiber from={[0.3, 0, 0]} to={[1.25, 0, 0]} opacity={0.7} />
        <SpindleFiber from={[0.3, 0, 0]} to={[1.5, 0, -0.2]} opacity={0.7} />
        <SpindleFiber from={[2.7, 0, 0]} to={[1.75, 0, 0.1]} opacity={0.7} />
      </group>
      
      <Label3D position={[0, 2.5, 0]} text="Cromossomos Alinhados" visible={true} />
      <Label3D position={[0, -2.8, 0]} text="Duas Células" visible={true} />
    </group>
  )
}
