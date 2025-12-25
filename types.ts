
export enum SimulationPhase {
  DIAGNOSIS = 'DIAGNOSIS',
  ANALYSIS = 'ANALYSIS',
  FUSION = 'FUSION',
  DEPLOYMENT = 'DEPLOYMENT',
  RISK = 'RISK',
  CLOSED = 'CLOSED'
}

export interface UserProfile {
  age?: string;
  career?: string;
  assets?: string;
  health?: string;
  preference?: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GlobalState {
  userStage: string | null;
  currentAssets: string | null;
  strategyMode: string | null;
  phase: SimulationPhase;
}
