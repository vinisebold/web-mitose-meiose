'use client'

import { usePhaseStore } from '@/stores/phaseStore'
import { MeiosisIPhase, MeiosisIIPhase, MitosisPhase } from '@/types/cell'
import Profase from '@/components/phases/mitose/Profase'
import Metafase from '@/components/phases/mitose/Metafase'
import Anafase from '@/components/phases/mitose/Anafase'
import Telofase from '@/components/phases/mitose/Telofase'
import Citocinese from '@/components/phases/mitose/Citocinese'
import ProfaseI from '@/components/phases/meiose-i/ProfaseI'
import MetafaseI from '@/components/phases/meiose-i/MetafaseI'
import AnafaseI from '@/components/phases/meiose-i/AnafaseI'
import TelofaseI from '@/components/phases/meiose-i/TelofaseI'
import ProfaseII from '@/components/phases/meiose-ii/ProfaseII'
import MetafaseII from '@/components/phases/meiose-ii/MetafaseII'
import AnafaseII from '@/components/phases/meiose-ii/AnafaseII'
import TelofaseII from '@/components/phases/meiose-ii/TelofaseII'

export default function CurrentPhaseScene() {
  const currentPhaseId = usePhaseStore((state) => state.currentPhase.id)

  switch (currentPhaseId) {
    case MitosisPhase.PROFASE:
      return <Profase />
    case MitosisPhase.METAFASE:
      return <Metafase />
    case MitosisPhase.ANAFASE:
      return <Anafase />
    case MitosisPhase.TELOFASE:
      return <Telofase />
    case MitosisPhase.CITOCINESE:
      return <Citocinese />
    case MeiosisIPhase.PROFASE_I:
      return <ProfaseI />
    case MeiosisIPhase.METAFASE_I:
      return <MetafaseI />
    case MeiosisIPhase.ANAFASE_I:
      return <AnafaseI />
    case MeiosisIPhase.TELOFASE_I:
      return <TelofaseI />
    case MeiosisIIPhase.PROFASE_II:
      return <ProfaseII />
    case MeiosisIIPhase.METAFASE_II:
      return <MetafaseII />
    case MeiosisIIPhase.ANAFASE_II:
      return <AnafaseII />
    case MeiosisIIPhase.TELOFASE_II:
      return <TelofaseII />
    default:
      return null
  }
}