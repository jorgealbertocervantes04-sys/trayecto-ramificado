// Tipos para la narrativa ramificada

export type SceneId = string;

export interface Decision {
  id: string;
  text: string;
  nextScene: SceneId;
  isCorrect?: boolean;
  points?: number;
  requiredState?: Partial<JourneyState>;
}

export interface Scene {
  id: SceneId;
  title: string;
  subtitle?: string;
  type: "intro" | "lesson" | "decision" | "quiz" | "ending";
  content: React.ReactNode;
  decisions?: Decision[];
  media?: {
    type: "image" | "video" | "3d";
    src: string;
    alt?: string;
  };
}

export interface JourneyDecision {
  points: any;
  decisionText: any;
  sceneId: SceneId;
  decisionId: string;
  timestamp: number;
  isCorrect: boolean;
}

export interface JourneyState {
  currentScene: SceneId;
  visitedScenes: SceneId[];
  decisions: JourneyDecision[];
  points: number;
  badges: string[];
  participantName?: string;
  completed: boolean;
}

export interface JourneyContextType {
  state: JourneyState;
  goToScene: (sceneId: SceneId) => void;
  makeDecision: (decision: Decision) => void;
  resetJourney: () => void;
  setParticipantName: (name: string) => void;
  progress: number;
  addBadge: (badgeId: string) => void;
}