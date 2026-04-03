'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-scientific-50 flex flex-col items-center justify-center p-6 md:p-12 lg:p-24">
      <motion.div
        className="max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-scientific-900 mb-6 tracking-tight">
            Divisão Celular
          </h1>
          <p className="text-xl md:text-2xl text-scientific-700 max-w-2xl mx-auto leading-relaxed">
            Explore as fases da divisão celular de forma interativa e visual
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12"
          variants={containerVariants}
        >
          <Link href="/mitose" className="group block h-full">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="h-full bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-scientific-100 group-hover:border-scientific-400 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-cell-nucleus transition-colors duration-300"></div>
              
              <div className="text-5xl md:text-6xl mb-4 md:mb-6">🧬</div>
              <h2 className="text-2xl md:text-3xl font-bold text-scientific-800 mb-3 md:mb-4 group-hover:text-scientific-600 transition-colors">
                Mitose
              </h2>
              <p className="text-scientific-600 text-base md:text-lg leading-relaxed flex-grow">
                O processo de reprodução celular onde uma célula-mãe se divide para formar duas células-filhas geneticamente idênticas. Fundamental para o crescimento e a regeneração tecidual.
              </p>
              
              <div className="mt-6 md:mt-8 flex items-center text-scientific-700 font-semibold group-hover:text-scientific-900">
                <span>Explorar Mitose</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          </Link>

          <Link href="/meiose" className="group block h-full">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="h-full bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-scientific-100 group-hover:border-scientific-400 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-cell-chromosome transition-colors duration-300"></div>
              
              <div className="text-5xl md:text-6xl mb-4 md:mb-6">🧫</div>
              <h2 className="text-2xl md:text-3xl font-bold text-scientific-800 mb-3 md:mb-4 group-hover:text-scientific-600 transition-colors">
                Meiose
              </h2>
              <p className="text-scientific-600 text-base md:text-lg leading-relaxed flex-grow">
                A divisão celular especializada que reduz pela metade o número de cromossomos, criando quatro células gaméticas únicas. Essencial para a reprodução sexuada e a variabilidade genética.
              </p>
              
              <div className="mt-6 md:mt-8 flex items-center text-scientific-700 font-semibold group-hover:text-scientific-900">
                <span>Explorar Meiose</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
