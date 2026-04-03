'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePhaseStore } from '@/stores/phaseStore'
import DynamicCellScene from '@/components/3d/DynamicCellScene'
import PhaseInfo from '@/components/ui/PhaseInfo'
import { DivisionType } from '@/types/cell'
import Timeline from '@/components/navigation/Timeline'
import { PhaseSelector } from '@/components/navigation/PhaseSelector'
import CurrentPhaseScene from '@/components/phases/CurrentPhaseScene'

export default function MeiosePage() {
  const currentPhase = usePhaseStore(state => state.currentPhase)
  const divisionType = usePhaseStore(state => state.divisionType)
  const setDivisionType = usePhaseStore(state => state.setDivisionType)

  useEffect(() => {
    // Initialize to Meiose I if not already set to a Meiose type
    if (divisionType !== DivisionType.MEIOSE_I && divisionType !== DivisionType.MEIOSE_II) {
      setDivisionType(DivisionType.MEIOSE_I)
    }
  }, [divisionType, setDivisionType])

  return (
    <div className="min-h-screen bg-scientific-50">
      <header className="border-b border-scientific-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-scientific-600 hover:text-scientific-800 transition-colors">
            &larr; Voltar
          </Link>
          <h1 className="text-2xl font-bold text-scientific-900">Meiose</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-[1700px] px-4 py-8">
        {/* Meiose I/II Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setDivisionType(DivisionType.MEIOSE_I)}
            className={`px-6 py-2 rounded-md transition-colors duration-200 font-medium ${
              divisionType === DivisionType.MEIOSE_I
                ? 'bg-scientific-600 text-white'
                : 'bg-scientific-100 text-scientific-700 hover:bg-scientific-200'
            }`}
          >
            Meiose I
          </button>
          <button
            onClick={() => setDivisionType(DivisionType.MEIOSE_II)}
            className={`px-6 py-2 rounded-md transition-colors duration-200 font-medium ${
              divisionType === DivisionType.MEIOSE_II
                ? 'bg-scientific-600 text-white'
                : 'bg-scientific-100 text-scientific-700 hover:bg-scientific-200'
            }`}
          >
            Meiose II
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-white rounded-lg shadow-md p-3 md:p-4 h-[72vh] min-h-[500px] md:h-[78vh] lg:h-[82vh] flex flex-col gap-4">
              <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden border border-scientific-100">
                <DynamicCellScene>
                  <CurrentPhaseScene />
                </DynamicCellScene>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-scientific-100 shadow-sm overflow-hidden">
                <Timeline />
              </div>
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
