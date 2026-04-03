'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePhaseStore, phaseCatalog } from '@/stores/phaseStore';
import { DivisionType, Phase } from '@/types/cell';

export const PhaseSelector: React.FC = () => {
  const { currentPhase, divisionType, setPhase, setDivisionType } = usePhaseStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isMitosis = divisionType === DivisionType.MITOSE;

  useEffect(() => {
    if (isMobileMenuOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          return;
        }

        if (e.key === 'Tab' && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      
      setTimeout(() => {
        if (drawerRef.current) {
          const closeBtn = drawerRef.current.querySelector('button');
          closeBtn?.focus();
        }
      }, 100);

      return () => document.removeEventListener('keydown', handleKeyDown);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isMobileMenuOpen]);

  const handlePhaseClick = (phase: Phase, type: DivisionType) => {
    if (divisionType !== type) {
      setDivisionType(type);
    }
    setPhase(phase);
    setIsMobileMenuOpen(false);
  };

  const renderPhaseList = (title: string | null, phases: Phase[], type: DivisionType) => (
    <div className="mb-6 last:mb-0">
      {title && (
        <h3 className="text-xs font-bold uppercase tracking-wider text-scientific-600 mb-3 px-3">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {phases.map((phase) => {
          const isActive = currentPhase.id === phase.id;
          return (
            <li key={phase.id}>
              <button
                onClick={() => handlePhaseClick(phase, type)}
                className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 border-l-2 rounded-r-md flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scientific-400 focus-visible:ring-inset ${
                  isActive
                    ? 'border-scientific-500 bg-scientific-50 text-scientific-900 font-semibold'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-scientific-700'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span>{phase.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-1.5 h-1.5 rounded-full bg-scientific-500"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed bottom-6 right-6 z-[60]">
        <button
          ref={fabRef}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-scientific-600 text-white p-4 rounded-full shadow-lg hover:bg-scientific-700 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scientific-400 focus-visible:ring-offset-2"
          aria-label="Abrir menu de fases"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-drawer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-[50] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.nav
        id="mobile-drawer"
        ref={drawerRef}
        role={isMobileMenuOpen ? "dialog" : undefined}
        aria-modal={isMobileMenuOpen ? "true" : undefined}
        aria-labelledby="drawer-heading"
        className={`fixed md:sticky top-0 right-0 h-full md:h-auto md:w-64 w-72 bg-white/90 backdrop-blur-sm border-l md:border-l-0 md:border-r border-gray-100 shadow-xl md:shadow-none p-4 md:p-6 z-[55] transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-6 flex justify-between items-center md:block">
          <h2 id="drawer-heading" className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
            Menu de fases
          </h2>
          <button 
            className="md:hidden text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scientific-400 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Fechar menu de fases"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col">
          {isMitosis ? (
            renderPhaseList(null, phaseCatalog[DivisionType.MITOSE], DivisionType.MITOSE)
          ) : (
            <>
              {renderPhaseList('Meiose I', phaseCatalog[DivisionType.MEIOSE_I], DivisionType.MEIOSE_I)}
              {renderPhaseList('Meiose II', phaseCatalog[DivisionType.MEIOSE_II], DivisionType.MEIOSE_II)}
            </>
          )}
        </div>
      </motion.nav>
    </>
  );
};
