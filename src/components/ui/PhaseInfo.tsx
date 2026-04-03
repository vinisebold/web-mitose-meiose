'use client'

import { Phase } from '@/types/cell'
import { motion, AnimatePresence } from 'framer-motion'

interface PhaseInfoProps {
  phase: Phase | null
}

export default function PhaseInfo({ phase }: PhaseInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-scientific-200 min-h-[140px] relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!phase ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-6 flex items-center"
          >
            <p className="text-scientific-500">Selecione uma fase para ver detalhes</p>
          </motion.div>
        ) : (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-6"
          >
            <h2 className="text-xl font-bold text-scientific-900 mb-3">{phase.name}</h2>
            <p className="text-scientific-700 leading-relaxed">{phase.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
