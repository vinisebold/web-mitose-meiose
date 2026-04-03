export interface Phase {
  id: string;
  name: string;
  description: string;
  duration: number;
}

export enum MitosisPhase {
  PROFASE = 'PROFASE',
  METAFASE = 'METAFASE',
  ANAFASE = 'ANAFASE',
  TELOFASE = 'TELOFASE',
  CITOCINESE = 'CITOCINESE',
}

export enum MeiosisIPhase {
  PROFASE_I = 'PROFASE_I',
  METAFASE_I = 'METAFASE_I',
  ANAFASE_I = 'ANAFASE_I',
  TELOFASE_I = 'TELOFASE_I',
}

export enum MeiosisIIPhase {
  PROFASE_II = 'PROFASE_II',
  METAFASE_II = 'METAFASE_II',
  ANAFASE_II = 'ANAFASE_II',
  TELOFASE_II = 'TELOFASE_II',
}

export interface CellStructure {
  chromosomes: boolean;
  spindle: boolean;
  membrane: boolean;
  nucleus: boolean;
}

export enum DivisionType {
  MITOSE = 'MITOSE',
  MEIOSE_I = 'MEIOSE_I',
  MEIOSE_II = 'MEIOSE_II',
}
