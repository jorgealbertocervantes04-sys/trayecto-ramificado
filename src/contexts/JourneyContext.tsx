import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { storyScenes, startingScene } from "../data/story";
import type {
  Decision,
  JourneyContextType,
  JourneyState,
  SceneId,
} from "../types";

const STORAGE_KEY = "trayecto-ramificado-v1";

const initialState: JourneyState = {
  currentScene: startingScene,
  visitedScenes: [startingScene],
  decisions: [],
  points: 0,
  badges: [],
  participantName: "",
  completed: false,
};

type Action =
  | { type: "GO_TO"; sceneId: SceneId }
  | { type: "DECISION"; decision: Decision; sceneId: SceneId }
  | { type: "SET_NAME"; name: string }
  | { type: "RESTORE"; state: JourneyState }
  | { type: "RESET" };

function reducer(state: JourneyState, action: Action): JourneyState {
  switch (action.type) {
    case "GO_TO": {
      const visitedScenes = state.visitedScenes.includes(action.sceneId)
        ? state.visitedScenes
        : [...state.visitedScenes, action.sceneId];

      return {
        ...state,
        currentScene: action.sceneId,
        visitedScenes,
      };
    }

    case "DECISION": {
      const { decision, sceneId } = action;
      const nextScene = storyScenes[decision.nextScene];

      const visitedScenes = state.visitedScenes.includes(decision.nextScene)
        ? state.visitedScenes
        : [...state.visitedScenes, decision.nextScene];

      return {
        ...state,
        currentScene: decision.nextScene,
        visitedScenes,
        points: state.points + (decision.points ?? 0),
        completed: nextScene?.type === "ending",
        decisions: [
          ...state.decisions,
          {
            sceneId,
            decisionId: decision.id,
            decisionText: decision.text,
            timestamp: Date.now(),
            isCorrect: decision.isCorrect ?? false,
            points: decision.points ?? 0,
          },
        ],
      };
    }

    case "SET_NAME":
      return { ...state, participantName: action.name };

    case "RESTORE":
      return action.state;

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const JourneyContext = createContext<JourneyContextType | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as JourneyState;
      dispatch({ type: "RESTORE", state: parsed });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<JourneyContextType>(() => {
    const goToScene = (sceneId: SceneId) => {
      dispatch({ type: "GO_TO", sceneId });
    };

    const makeDecision = (decision: Decision) => {
      dispatch({
        type: "DECISION",
        decision,
        sceneId: state.currentScene,
      });
    };

    const setParticipantName = (name: string) => {
      dispatch({ type: "SET_NAME", name });
    };

    const resetJourney = () => {
      localStorage.removeItem(STORAGE_KEY);
      dispatch({ type: "RESET" });
    };

    const progress = Math.min(
      100,
      Math.round(
        (state.visitedScenes.length / Object.keys(storyScenes).length) * 100
      )
    );

    return {
      state,
      goToScene,
      makeDecision,
      setParticipantName,
      resetJourney,
      progress,
    };
  }, [state]);

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);

  if (!context) {
    throw new Error("useJourney debe usarse dentro de JourneyProvider.");
  }

  return context;
}