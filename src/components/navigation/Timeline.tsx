'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePhaseStore } from '@/stores/phaseStore';
import { DivisionType, MeiosisIPhase, MeiosisIIPhase, MitosisPhase, Phase } from '@/types/cell';

const timelinePhases: Record<DivisionType, Phase[]> = {
  [DivisionType.MITOSE]: [
    { id: MitosisPhase.PROFASE, name: 'Prófase', description: 'Condensação dos cromossomos e início da divisão.', duration: 1 },
    { id: MitosisPhase.METAFASE, name: 'Metáfase', description: 'Cromossomos alinhados no plano equatorial.', duration: 1 },
    { id: MitosisPhase.ANAFASE, name: 'Anáfase', description: 'Cromátides-irmãs se separam para polos opostos.', duration: 1 },
    { id: MitosisPhase.TELOFASE, name: 'Telófase', description: 'Novos núcleos se reorganizam.', duration: 1 },
    { id: MitosisPhase.CITOCINESE, name: 'Citocinese', description: 'Divisão do citoplasma em duas células-filhas.', duration: 1 },
  ],
  [DivisionType.MEIOSE_I]: [
    { id: MeiosisIPhase.PROFASE_I, name: 'Prófase I', description: 'Pareamento dos cromossomos homólogos.', duration: 1 },
    { id: MeiosisIPhase.METAFASE_I, name: 'Metáfase I', description: 'Bivalentes alinhados no equador.', duration: 1 },
    { id: MeiosisIPhase.ANAFASE_I, name: 'Anáfase I', description: 'Cromossomos homólogos separam-se.', duration: 1 },
    { id: MeiosisIPhase.TELOFASE_I, name: 'Telófase I', description: 'Formação de dois núcleos haploides.', duration: 1 },
  ],
  [DivisionType.MEIOSE_II]: [
    { id: MeiosisIIPhase.PROFASE_II, name: 'Prófase II', description: 'Nova organização do fuso meiótico.', duration: 1 },
    { id: MeiosisIIPhase.METAFASE_II, name: 'Metáfase II', description: 'Cromossomos alinhados novamente no equador.', duration: 1 },
    { id: MeiosisIIPhase.ANAFASE_II, name: 'Anáfase II', description: 'Cromátides-irmãs separam-se.', duration: 1 },
    { id: MeiosisIIPhase.TELOFASE_II, name: 'Telófase II', description: 'Formação final dos núcleos haploides.', duration: 1 },
  ],
};

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

export default function Timeline() {
  const { currentPhase, divisionType, isPlaying, togglePlay, setPhase, nextPhase } = usePhaseStore();
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activePhases = timelinePhases[divisionType] || [];
  const currentIndex = activePhases.findIndex((p) => p.id === currentPhase?.id) !== -1 
    ? activePhases.findIndex((p) => p.id === currentPhase?.id) 
    : 0;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        const isLastPhase = currentIndex === activePhases.length - 1;
        if (isLastPhase) {
          togglePlay();
        } else {
          nextPhase();
        }
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, activePhases.length, togglePlay, nextPhase]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (index + 1) % activePhases.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (index - 1 + activePhases.length) % activePhases.length;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = activePhases.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setPhase(activePhases[index]);
        return;
      default:
        return;
    }

    if (nextIndex !== index) {
      optionRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex items-center gap-3 md:gap-6 p-3 md:p-6 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl overflow-x-auto">
      <button 
        onClick={togglePlay}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-600/50 flex-shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scientific-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div 
        className="flex-1 relative h-16 flex flex-col justify-center min-w-[280px] md:min-w-[400px] overflow-visible"
        role="listbox"
        aria-label="Linha do tempo das fases"
      >
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-scientific-600 rounded-full"
            initial={false}
            animate={{ 
              width: `${(currentIndex / Math.max(1, activePhases.length - 1)) * 100}%` 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="relative z-10 flex justify-between w-full">
          {activePhases.map((phase, index) => {
            const isActive = index === currentIndex;
            const isPast = index <= currentIndex;
            
            return (
              <div 
                key={phase.id}
                ref={(el) => { optionRefs.current[index] = el }}
                role="option"
                aria-selected={isActive}
                tabIndex={0}
                onClick={() => setPhase(phase)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="group relative flex flex-col items-center justify-center cursor-pointer w-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scientific-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded"
              >
                <div className="h-8 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1.4 : 1,
                      backgroundColor: isActive 
                        ? '#16a34a' 
                        : isPast 
                          ? '#15803d' 
                          : '#1e293b' 
                    }}
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-colors ${
                      isActive ? 'border-scientific-400' : isPast ? 'border-scientific-600' : 'border-slate-600'
                    }`}
                  />
                </div>
                
                <span className={`absolute top-8 whitespace-nowrap text-[10px] md:text-[11px] font-medium tracking-wide transition-colors pointer-events-none ${
                  isActive ? 'text-slate-100' : 'text-slate-500 group-hover:text-slate-300'
                }`}>
                  {phase.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
