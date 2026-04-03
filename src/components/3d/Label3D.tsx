'use client';

import React from 'react';
import { Html } from '@react-three/drei';

export interface Label3DProps {
  position: [number, number, number];
  text: string;
  visible?: boolean;
}

export function Label3D({ position, text, visible = true }: Label3DProps) {
  if (!visible) return null;

  return (
    <Html
      position={position}
      occlude
      center
      className="bg-white/80 px-2 py-1 rounded shadow-md text-sm whitespace-nowrap text-slate-800 pointer-events-none"
    >
      {text}
    </Html>
  );
}