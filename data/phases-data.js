export const mitosisPhases = [
  {
    id: 'interphase',
    name: 'Interfase',
    duration: 5000,
    description: 'A celula esta em repouso, realizando suas funcoes metabolicas normais. O DNA foi replicado e a celula esta pronta para iniciar o processo de divisao.',
    keyEvents: [
      { time: 0.1, label: 'Nucleo visivel e intacto' },
      { time: 0.4, label: 'DNA duplicado (cromatina)' },
      { time: 0.8, label: 'Celula preparada para divisao' }
    ],
    quizQuestion: {
      question: 'O que ocorre durante a interfase?',
      options: [
        'Os cromossomos se separam',
        'O DNA e replicado',
        'O fuso mitotico se forma',
        'A celula se divide'
      ],
      correct: 1
    }
  },
  {
    id: 'prophase',
    name: 'Profase',
    duration: 5000,
    description: 'Os cromossomos se condensam e se tornam visiveis. O nucleolo desaparece e o envoltorio nuclear comeca a se dissolver. Os centrossomas migram para os polos da celula.',
    keyEvents: [
      { time: 0.15, label: 'Cromossomos condensam' },
      { time: 0.4, label: 'Nucleolo desaparece' },
      { time: 0.6, label: 'Envoltorio nuclear dissolve' },
      { time: 0.85, label: 'Centrossomas migram aos polos' }
    ],
    quizQuestion: {
      question: 'O que acontece ao nucleolo na profase?',
      options: ['Duplica', 'Desaparece', 'Migra ao polo', 'Divide-se'],
      correct: 1
    }
  },
  {
    id: 'metaphase',
    name: 'Metafase',
    duration: 4000,
    description: 'Os cromossomos se alinham na placa metafasica (equatorial). O fuso mitotico esta completo, com fibras ligadas aos centrimeros dos cromossomos.',
    keyEvents: [
      { time: 0.2, label: 'Cromossomos na placa equatorial' },
      { time: 0.5, label: 'Fuso mitotico completo' },
      { time: 0.8, label: 'Fibras de tensao conectadas' }
    ],
    quizQuestion: {
      question: 'Onde os cromossomos se alinham na metafase?',
      options: [
        'Nos polos da celula',
        'Na placa equatorial',
        'No nucleolo',
        'No citoplasma'
      ],
      correct: 1
    }
  },
  {
    id: 'anaphase',
    name: 'Anafase',
    duration: 4000,
    description: 'As cromatides-irmas sao separadas e puxadas para os polos opostos da celula pelas fibras do fuso. A celula se alonga visivelmente.',
    keyEvents: [
      { time: 0.15, label: 'Cromatides-irmas se separam' },
      { time: 0.5, label: 'Fibras do fuso encurtam' },
      { time: 0.8, label: 'Celula se alonga' }
    ],
    quizQuestion: {
      question: 'O que e separado durante a anafase?',
      options: [
        'Cromossomos homologos',
        'Cromatides-irmas',
        'Nucleolo',
        'Membrana nuclear'
      ],
      correct: 1
    }
  },
  {
    id: 'telophase',
    name: 'Telofase',
    duration: 4000,
    description: 'Os cromossomos chegam aos polos e comecam a se descondensar. Os envoltorios nucleares se reconstituem e os nucleolos reaparecem.',
    keyEvents: [
      { time: 0.2, label: 'Cromossomos nos polos' },
      { time: 0.5, label: 'Envoltorio nuclear reconstituido' },
      { time: 0.8, label: 'Nucleolo reaparece' }
    ],
    quizQuestion: {
      question: 'O que acontece ao envoltorio nuclear na telofase?',
      options: [
        'Desaparece completamente',
        'Se reconstitui',
        'Se duplica',
        'Nao se altera'
      ],
      correct: 1
    }
  },
  {
    id: 'cytokinesis',
    name: 'Citocinese',
    duration: 4000,
    description: 'O anel contrátil de actina se fecha, dividindo o citoplasma e gerando duas celulas-filhas geneticamente identicas a celula-mae.',
    keyEvents: [
      { time: 0.2, label: 'Anel contrátil se forma' },
      { time: 0.5, label: 'Sulco de clivagem avanca' },
      { time: 0.9, label: 'Duas celulas-filhas (2n -> 2n)' }
    ],
    quizQuestion: {
      question: 'Quantas celulas-filhas resultam da mitose?',
      options: ['1', '2', '3', '4'],
      correct: 1
    }
  }
];

export const meiosisIPhases = [
  {
    id: 'prophase-i',
    name: 'Profase I',
    duration: 6000,
    description: 'A fase mais longa e complexa da meiose. Os cromossomos homologos se pareiam formando bivalentes (tetrades). Ocorre o crossing-over, com troca de segmentos entre cromatides nao-irmas.',
    keyEvents: [
      { time: 0.1, label: 'Cromossomos condensam' },
      { time: 0.3, label: 'Homologos se pareiam (sinapse)' },
      { time: 0.5, label: 'Bivalente (tetrade) formado' },
      { time: 0.7, label: 'Crossing-over ocorre' },
      { time: 0.9, label: 'Envoltorio nuclear dissolve' }
    ],
    quizQuestion: {
      question: 'O que e formado pelo pareamento de cromossomos homologos?',
      options: ['Cromatide', 'Bivalente (tetrade)', 'Gameta', 'Autossomo'],
      correct: 1
    }
  },
  {
    id: 'metaphase-i',
    name: 'Metafase I',
    duration: 4000,
    description: 'Os bivalentes se alinham na placa equatorial. Os cromossomos homologos ficam lado a lado, prontos para serem separados.',
    keyEvents: [
      { time: 0.2, label: 'Bivalentes na placa equatorial' },
      { time: 0.6, label: 'Orientacao independente' },
      { time: 0.8, label: 'Fuso mitotico completo' }
    ],
    quizQuestion: {
      question: 'Na metafase I, o que se alinha na placa equatorial?',
      options: [
        'Cromatides-irmas',
        'Bivalentes (tetrades)',
        'Cromossomos individuais',
        'Gametas'
      ],
      correct: 1
    }
  },
  {
    id: 'anaphase-i',
    name: 'Anafase I',
    duration: 4000,
    description: 'Os cromossomos homologos sao separados e puxados para polos opostos. Diferente da mitose, as cromatides-irmas permanecem unidas.',
    keyEvents: [
      { time: 0.2, label: 'Homologos se separam' },
      { time: 0.5, label: 'Reducao cromossomica' },
      { time: 0.8, label: 'Cromatides-irmas juntas' }
    ],
    quizQuestion: {
      question: 'Na anafase I, o que e separado?',
      options: [
        'Cromatides-irmas',
        'Cromossomos homologos',
        'Gametas',
        'Centriolos'
      ],
      correct: 1
    }
  },
  {
    id: 'telophase-i',
    name: 'Telofase I',
    duration: 4000,
    description: 'Os cromossomos chegam aos polos e os envoltorios nucleares se reconstituem. O citoplasma se divide, gerando duas celulas haploides com cromossomos duplicados.',
    keyEvents: [
      { time: 0.2, label: 'Cromossomos nos polos' },
      { time: 0.5, label: 'Envoltorio se reconstitui' },
      { time: 0.8, label: 'Duas celulas haploides (n)' }
    ],
    quizQuestion: {
      question: 'Quantas celulas resultam da meiose I?',
      options: ['1', '2', '3', '4'],
      correct: 1
    }
  }
];

export const meiosisIIPhases = [
  {
    id: 'prophase-ii',
    name: 'Profase II',
    duration: 4000,
    description: 'Os cromossomos se condensam novamente em cada uma das duas celulas. O envoltorio nuclear dissolve e um novo fuso mitotico se forma.',
    keyEvents: [
      { time: 0.2, label: 'Cromossomos condensam' },
      { time: 0.5, label: 'Envoltorio nuclear dissolve' },
      { time: 0.8, label: 'Novo fuso se forma' }
    ],
    quizQuestion: {
      question: 'A meiose II e semelhante a qual processo?',
      options: ['Interfase', 'Mitose', 'Citocinese', 'Crossing-over'],
      correct: 1
    }
  },
  {
    id: 'metaphase-ii',
    name: 'Metafase II',
    duration: 3000,
    description: 'Os cromossomos se alinham na placa equatorial de cada celula. As fibras do fuso se conectam aos centrimeros.',
    keyEvents: [
      { time: 0.3, label: 'Cromossomos na placa equatorial' },
      { time: 0.7, label: 'Fibras conectadas aos centrimeros' }
    ],
    quizQuestion: {
      question: 'Na metafase II, os cromossomos se alinham onde?',
      options: [
        'Nos polos',
        'Na placa equatorial',
        'No citoplasma',
        'Fora da celula'
      ],
      correct: 1
    }
  },
  {
    id: 'anaphase-ii',
    name: 'Anafase II',
    duration: 3000,
    description: 'As cromatides-irmas sao finalmente separadas e puxadas para os polos opostos. Cada cromatide se torna um cromossomo individual.',
    keyEvents: [
      { time: 0.2, label: 'Cromatides-irmas se separam' },
      { time: 0.6, label: 'Movimento para os polos' },
      { time: 0.9, label: 'Cada cromatide = cromossomo' }
    ],
    quizQuestion: {
      question: 'Na anafase II, o que e separado?',
      options: [
        'Cromossomos homologos',
        'Cromatides-irmas',
        'Bivalentes',
        'Gametas'
      ],
      correct: 1
    }
  },
  {
    id: 'telophase-ii',
    name: 'Telofase II',
    duration: 4000,
    description: 'Os cromossomos chegam aos polos, se descondensam e os envoltorios nucleares se reconstituem. A citocinese completa, gerando quatro celulas-filhas haploides.',
    keyEvents: [
      { time: 0.2, label: 'Cromossomos nos polos' },
      { time: 0.5, label: 'Envoltorio se reconstitui' },
      { time: 0.8, label: 'Quatro celulas haploides (n)' }
    ],
    quizQuestion: {
      question: 'Quantas celulas-filhas resultam da meiose completa?',
      options: ['1', '2', '3', '4'],
      correct: 3
    }
  }
];

export const comparisonData = {
  mitosis: {
    title: 'Mitose',
    cellsProduced: 2,
    ploidy: '2n -> 2n',
    geneticVariation: 'Nenhuma',
    purpose: 'Crescimento e reparacao',
    crossingOver: false
  },
  meiosis: {
    title: 'Meiose',
    cellsProduced: 4,
    ploidy: '2n -> n',
    geneticVariation: 'Alta (crossing-over e segregacao independente)',
    purpose: 'Producao de gametas',
    crossingOver: true
  }
};
