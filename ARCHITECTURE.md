# CellViz

Visualizador Interativo de Divisão Celular
Mitose e Meiose em Animação 3D

Documento de Arquitetura e Especificação Técnica
Versão 1.0 · Projeto de Biologia · 2025

---

## 1. Visão Geral do Projeto

CellViz é uma aplicação web educativa de alta fidelidade visual, projetada para demonstrar os processos de mitose e meiose por meio de animações tridimensionais interativas, acompanhadas de narração científica e recursos pedagógicos. O projeto é voltado para estudantes do ensino médio e superior e foi concebido para ser executado diretamente no navegador, sem necessidade de instalação.

### 1.1 Objetivos Pedagógicos

- Representar fielmente as fases da mitose (Prófase, Metáfase, Anáfase, Telófase e Citocinese)
- Representar fielmente as 9 fases da meiose (Meiose I e II completas)
- Permitir ao aluno controlar o ritmo e pausar em qualquer fase para estudo
- Destacar as diferenças fundamentais entre mitose e meiose visualmente
- Fornecer anotações científicas contextuais para cada evento celular
- Incluir quiz de fixação ao final de cada processo

## 2. Arquitetura da Aplicação

A aplicação segue uma arquitetura modular baseada em ES Modules nativos, sem necessidade de bundler em desenvolvimento. A separação em módulos de domínio (mitose/, meiose/) garante que a lógica de cada processo seja independente e testável.

### 2.1 Estrutura de Diretórios

```
cellviz/
├── index.html            ← Ponto de entrada
├── main.js               ← Orquestrador principal
├── router.js             ← Navegação SPA
│
├── mitosis/
│   ├── scene.js          ← Motor 3D da mitose
│   ├── phases.js         ← Estado e lógica das 6 fases
│   ├── chromosome.js     ← Geometria dos cromossomos
│   └── spindle.js        ← Fuso acromático
│
├── meiosis/
│   ├── scene.js          ← Motor 3D da meiose
│   ├── phases.js         ← Estado e lógica das 9 fases
│   ├── crossing-over.js  ← Animação de permutação
│   └── reduction.js      ← Divisão reducional (futuro)
│
├── ui/
│   ├── controls.js       ← Play/Pause/Step/Speed
│   ├── labels.js         ← Legendas flutuantes
│   ├── timeline.js       ← Barra de progresso das fases
│   └── quiz.js           ← Quiz de fixação
│
├── styles/
│   ├── theme.css         ← Design system
│   ├── animations.css    ← Keyframes CSS
│   └── responsive.css    ← Breakpoints mobile
│
├── data/
│   └── phases-data.js    ← Conteúdo educativo JSON
│
└── assets/
    ├── sounds/           ← Áudio ambiente
    └── textures/         ← Texturas celulares
```

### 2.2 Mapa de Módulos

| Arquivo               | Responsabilidade               | Tecnologia            |
| --------------------- | ------------------------------ | --------------------- |
| index.html            | Ponto de entrada da aplicação  | HTML5 semântico       |
| main.js               | Orquestração e inicialização   | ES Modules            |
| router.js             | Navegação entre seções         | History API           |
| mitosis/scene.js      | Motor de animação da mitose    | Three.js / WebGL      |
| mitosis/phases.js     | Lógica das 6 fases da mitose   | JavaScript classes    |
| meiosis/scene.js      | Motor de animação da meiose    | Three.js / WebGL      |
| meiosis/phases.js     | Lógica das 9 fases da meiose   | JavaScript classes    |
| ui/controls.js        | Controles de playback e zoom   | Custom Events         |
| ui/labels.js          | Legendas e anotações dinâmicas | CSS Transitions       |
| ui/quiz.js            | Quiz interativo ao final       | Vanilla JS            |
| styles/theme.css      | Design system e variáveis CSS  | CSS Custom Properties |
| styles/animations.css | Keyframes e transições         | CSS Animations        |
| data/phases-data.js   | Dados educativos das fases     | JSON estruturado      |
| assets/sounds/        | Efeitos sonoros ambientais     | Web Audio API         |

## 3. Stack Tecnológica

- HTML5, CSS3, JavaScript (ES2022+)
- Three.js (r165) para renderização 3D
- GSAP 3.12 para animações avançadas (futuro)
- Lottie Web 5.12 para ícones animados (futuro)
- D3.js 7.9 para gráficos comparativos (futuro)
- Tone.js 15.0 para áudio ambient (futuro)
- Tippy.js 6.3 para tooltips (futuro)

## 4. Especificação: Fases da Mitose

- Interfase: célula em repouso, ADN replicado, cromossomos condensam
- Prófase: condensação, dissolução do envelope nuclear, migração dos centrossomas
- Metáfase: alinhamento na placa equatorial, fuso mito
- Anáfase: separação de cromátides-irmãs, alongamento da célula
- Telófase: reconstituição do núcleo, descondensação
- Citocinese: anel contrátil, divisão citoplasmática, 2n → 2n

## 5. Especificação: Fases da Meiose

- Meiose I (reducional): Prófase I (bivalentes, crossing-over), Metáfase I, Anáfase I, Telófase I
- Meiose II (equacional): Prófase II, Metáfase II, Anáfase II, Telófase II

## 6. Interface do Usuário

- Canvas Three.js fullscreen
- HUD com playback
- Painel lateral com descrição e etapa
- Câmera livre/guiada
- Modo escuro via prefers-color-scheme
- Controles: Play/Pause (Space), ←/→, velocidade, scrubber, reset
- Split-view comparativo (mitose vs meiose) — implementação futura

## 7. Estrutura dos Dados Educativos

- `data/phases-data.js` contém JSON para fases, eventos e quiz

## 8. Roteiro de Desenvolvimento

- Sprint 1: base Three.js, malha celular
- Sprint 2: mitose completa
- Sprint 3: meiose completa
- Sprint 4: polish, narração, quiz, docs

## 9. Como Executar o Projeto

1. `git clone ...`
2. `npm install`
3. `npm run dev`
4. Abra `http://localhost:3000`

## 10. Padrões de Código e Contribuição

- Arquivos: kebab-case
- Classes: PascalCase
- Funções/variáveis: camelCase
- Constantes: UPPER_SNAKE_CASE
- Fases: ids em inglês lowercase

---

CellViz — Documento de Especificação Técnica v1.0
Projeto de Biologia · 2025 · Todos os direitos reservados
