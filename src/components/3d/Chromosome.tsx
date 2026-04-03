'use client';

import React, { useRef } from 'react';
import { Group } from 'three';

interface ChromosomeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  separated?: boolean;
}

export function Chromosome({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#ef4444',
  separated = false,
}: ChromosomeProps) {
  const groupRef = useRef<Group>(null);

  const Chromatid = ({ offsetX, rotationZ }: { offsetX: number; rotationZ: number }) => (
    <group position={[offsetX, 0, 0]} rotation={[0, 0, rotationZ]}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );

  const separationDistance = separated ? 0.8 : 0;
  const crossAngle = separated ? 0 : 0.3;

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Chromatid offsetX={-separationDistance} rotationZ={crossAngle} />
      <Chromatid offsetX={separationDistance} rotationZ={-crossAngle} />
    </group>
  );
}
