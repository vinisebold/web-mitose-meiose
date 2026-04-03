'use client';

import React from 'react';
import { Float, Sphere } from '@react-three/drei';

interface CellProps {
  showNucleus: boolean;
  nucleusOpacity?: number;
  membraneOpacity?: number;
}

export default function Cell({
  showNucleus,
  nucleusOpacity = 1,
  membraneOpacity = 0.3,
}: CellProps) {
  return (
    <Float
      speed={1.5} // Velocidade da animação
      rotationIntensity={0.5} // Intensidade de rotação
      floatIntensity={0.5} // Intensidade de flutuação
    >
      <group>
        {/* Membrana celular: Rosa (#f472b6), translúcida */}
        <Sphere args={[2, 32, 32]}>
          <meshPhysicalMaterial
            color="#f472b6"
            transparent
            opacity={membraneOpacity}
            roughness={0.1}
            transmission={0.9}
            thickness={0.5}
          />
        </Sphere>

        {/* Citoplasma: Amarelo (#fbbf24), translúcido */}
        <Sphere args={[1.8, 32, 32]}>
          <meshPhysicalMaterial
            color="#fbbf24"
            transparent
            opacity={0.15}
            roughness={0.5}
            transmission={0.8}
            thickness={0.5}
          />
        </Sphere>

        {/* Núcleo: Roxo (#8b5cf6), opacidade controlável */}
        {showNucleus && (
          <Sphere args={[0.6, 32, 32]}>
            <meshStandardMaterial
              color="#8b5cf6"
              transparent={nucleusOpacity < 1}
              opacity={nucleusOpacity}
              roughness={0.4}
            />
          </Sphere>
        )}
      </group>
    </Float>
  );
}
