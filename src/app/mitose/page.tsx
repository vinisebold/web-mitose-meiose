'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePhaseStore } from '@/stores/phaseStore'
import DynamicCellScene from '@/components/3d/DynamicCellScene'
import PhaseInfo from '@/components/ui/PhaseInfo'
import Timeline from '@/components/navigation/Timeline'
import { PhaseSelector } from '@/components/navigation/PhaseSelector'
import CurrentPhaseScene from '@/components/phases/CurrentPhaseScene'
import { DivisionType } from '@/types/cell'

export default function MitosePage() {
  const currentPhase = usePhaseStore(state => state.currentPhase)
  const setDivisionType = usePhaseStore(state => state.setDivisionType)

  useEffect(() => {
    setDivisionType(DivisionType.MITOSE)
  }, [setDivisionType])

  return (
    <div className="min-h-screen bg-scientific-50">
      <header className="border-b border-scientific-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-scientific-600 hover:text-scientific-800">
            ← Voltar
          </Link>
          <h1 className="text-2xl font-bold text-scientific-900">Mitose</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-[1700px] px-4 py-8">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 lg:col-span-9 bg-white rounded-lg shadow-md p-3 md:p-4 h-[72vh] min-h-[500px] md:h-[78vh] lg:h-[82vh] flex flex-col gap-4">
            <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden border border-scientific-100">
              <DynamicCellScene>
                <CurrentPhaseScene />
              </DynamicCellScene>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-scientific-100 shadow-sm overflow-hidden">
              <Timeline />
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <PhaseInfo phase={currentPhase} />
            <div className="hidden md:block">
              <PhaseSelector />
            </div>
            <div className="md:hidden">
              <PhaseSelector />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
