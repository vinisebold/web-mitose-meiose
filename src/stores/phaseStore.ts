import { create } from 'zustand';

import {
  DivisionType,
  MeiosisIPhase,
  MeiosisIIPhase,
  MitosisPhase,
  type Phase,
} from '@/types/cell';

type PhaseStore = {
  currentPhase: Phase;
  divisionType: DivisionType;
  isPlaying: boolean;
  playbackSpeed: number;
  setPhase: (phase: Phase) => void;
  nextPhase: () => void;
  prevPhase: () => void;
  togglePlay: () => void;
  setDivisionType: (type: DivisionType) => void;
};

export const phaseCatalog: Record<DivisionType, Phase[]> = {
  [DivisionType.MITOSE]: [
    {
      id: MitosisPhase.PROFASE,
      name: 'Prófase',
      description: 'Condensação dos cromossomos e início da divisão.',
      duration: 1,
    },
    {
      id: MitosisPhase.METAFASE,
      name: 'Metáfase',
      description: 'Cromossomos alinhados no plano equatorial.',
      duration: 1,
    },
    {
      id: MitosisPhase.ANAFASE,
      name: 'Anáfase',
      description: 'Cromátides-irmãs se separam para polos opostos.',
      duration: 1,
    },
    {
      id: MitosisPhase.TELOFASE,
      name: 'Telófase',
      description: 'Novos núcleos se reorganizam.',
      duration: 1,
    },
    {
      id: MitosisPhase.CITOCINESE,
      name: 'Citocinese',
      description: 'Divisão do citoplasma em duas células-filhas.',
      duration: 1,
    },
  ],
  [DivisionType.MEIOSE_I]: [
    {
      id: MeiosisIPhase.PROFASE_I,
      name: 'Prófase I',
      description: 'Pareamento dos cromossomos homólogos.',
      duration: 1,
    },
    {
      id: MeiosisIPhase.METAFASE_I,
      name: 'Metáfase I',
      description: 'Bivalentes alinhados no equador.',
      duration: 1,
    },
    {
      id: MeiosisIPhase.ANAFASE_I,
      name: 'Anáfase I',
      description: 'Cromossomos homólogos separam-se.',
      duration: 1,
    },
    {
      id: MeiosisIPhase.TELOFASE_I,
      name: 'Telófase I',
      description: 'Formação de dois núcleos haploides.',
      duration: 1,
    },
  ],
  [DivisionType.MEIOSE_II]: [
    {
      id: MeiosisIIPhase.PROFASE_II,
      name: 'Prófase II',
      description: 'Nova organização do fuso meiótico.',
      duration: 1,
    },
    {
      id: MeiosisIIPhase.METAFASE_II,
      name: 'Metáfase II',
      description: 'Cromossomos alinhados novamente no equador.',
      duration: 1,
    },
    {
      id: MeiosisIIPhase.ANAFASE_II,
      name: 'Anáfase II',
      description: 'Cromátides-irmãs separam-se.',
      duration: 1,
    },
    {
      id: MeiosisIIPhase.TELOFASE_II,
      name: 'Telófase II',
      description: 'Formação final dos núcleos haploides.',
      duration: 1,
    },
  ],
};

const getFirstPhase = (divisionType: DivisionType): Phase => phaseCatalog[divisionType][0];

const getPhaseIndex = (divisionType: DivisionType, phaseId: string): number =>
  phaseCatalog[divisionType].findIndex((phase) => phase.id === phaseId);

export const usePhaseStore = create<PhaseStore>((set, get) => ({
  currentPhase: getFirstPhase(DivisionType.MITOSE),
  divisionType: DivisionType.MITOSE,
  isPlaying: false,
  playbackSpeed: 1,
  setPhase: (phase) => set({ currentPhase: phase }),
  nextPhase: () => {
    const { divisionType, currentPhase } = get();
    const phases = phaseCatalog[divisionType];
    const currentIndex = getPhaseIndex(divisionType, currentPhase.id);
    const nextIndex = currentIndex >= 0 && currentIndex < phases.length - 1 ? currentIndex + 1 : 0;

    set({ currentPhase: phases[nextIndex] });
  },
  prevPhase: () => {
    const { divisionType, currentPhase } = get();
    const phases = phaseCatalog[divisionType];
    const currentIndex = getPhaseIndex(divisionType, currentPhase.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : phases.length - 1;

    set({ currentPhase: phases[prevIndex] });
  },
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setDivisionType: (type) =>
    set({
      divisionType: type,
      currentPhase: getFirstPhase(type),
    }),
}));
