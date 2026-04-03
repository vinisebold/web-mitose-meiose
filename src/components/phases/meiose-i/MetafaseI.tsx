'use client'

import Cell from '@/components/3d/Cell'
import { Chromosome } from '@/components/3d/Chromosome'
import { SpindleFiber } from '@/components/3d/SpindleFiber'
import { Label3D } from '@/components/3d/Label3D'

export default function MetafaseI() {
  return (
    <group>
      {/* Cell without visible nucleus */}
      <Cell showNucleus={false} membraneOpacity={0.3} />
      
      {/* Homologous pairs aligned at metaphase plate */}
      {/* Pair 1 */}
      <Chromosome position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]} color="#ef4444" />
      <Chromosome position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]} color="#dc2626" />
      
      {/* Pair 2 */}
      <Chromosome position={[0.15, 0, 0.2]} rotation={[0, 0, Math.PI / 2]} color="#ef4444" />
      <Chromosome position={[0.35, 0, 0.2]} rotation={[0, 0, Math.PI / 2]} color="#dc2626" />
      
      {/* Pair 3 */}
      <Chromosome position={[-0.25, 0, -0.3]} rotation={[0, 0, Math.PI / 2]} color="#ef4444" />
      <Chromosome position={[-0.05, 0, -0.3]} rotation={[0, 0, Math.PI / 2]} color="#dc2626" />
      
      {/* Pair 4 */}
      <Chromosome position={[0.25, 0, 0.4]} rotation={[0, 0, Math.PI / 2]} color="#ef4444" />
      <Chromosome position={[0.45, 0, 0.4]} rotation={[0, 0, Math.PI / 2]} color="#dc2626" />
      
      {/* Spindle fibers attached to pairs */}
      <SpindleFiber from={[-2.5, 0, 0]} to={[-0.35, 0, 0]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[-0.15, 0, 0]} opacity={0.7} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[0.15, 0, 0.2]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[0.35, 0, 0.2]} opacity={0.7} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[-0.25, 0, -0.3]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[-0.05, 0, -0.3]} opacity={0.7} />
      <SpindleFiber from={[-2.5, 0, 0]} to={[0.25, 0, 0.4]} opacity={0.7} />
      <SpindleFiber from={[2.5, 0, 0]} to={[0.45, 0, 0.4]} opacity={0.7} />
      
      {/* Portuguese labels */}
      <Label3D position={[0, 2.2, 0]} text="Pares de Homólogos Alinhados" visible={true} />
      <Label3D position={[0, -2.5, 0]} text="Placa Equatorial" visible={true} />
    </group>
  )
}
