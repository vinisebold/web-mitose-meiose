'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import SceneLoader from '@/components/ui/SceneLoader'

const DynamicScene = dynamic(() => import('./CellScene'), {
  ssr: false,
  loading: () => <SceneLoader />
})

interface DynamicCellSceneProps {
  children?: ReactNode
}

export default function DynamicCellScene({ children }: DynamicCellSceneProps) {
  return (
    <div className="relative w-full h-full">
      <DynamicScene>{children}</DynamicScene>
    </div>
  )
}
