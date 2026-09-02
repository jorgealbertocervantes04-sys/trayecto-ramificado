import { storyScenes } from "../../data/story";
import { useJourney } from "../../contexts/JourneyContext";
import { CertificateGenerator } from "../Certificate/CertificateGenerator";
import { DecisionBlock } from "./DecisionBlock";
import { ProgressBar } from "./ProgressBar";

export function SceneContainer() {
  const { state, makeDecision, goToScene, progress } = useJourney();
  const scene = storyScenes[state.currentScene];

  if (!scene) {
    return (
      <main className="app-container">
        <section className="scene-card">
          <div className="senal">
            <h2>⚠️ Escena no encontrada</h2>
            <p>Revisa el identificador de la escena dentro de `story.tsx`.</p>
          </div>
        </section>
      </main>
    );
  }

  // Si es una escena lesson sin decisiones, agregar botón "Continuar"
  const hasDecisions = scene.decisions && scene.decisions.length > 0;
  const needsContinueButton = scene.type === "lesson" && !hasDecisions;

  return (
    <>
      <div className="top-panel">
        <div className="top-row">
          <div>
            <h1>🛣️ CONOCIENDO TU TRAYECTO</h1>
            <p className="slogan">"Un viaje con muchas decisiones" · Hub Monterrey</p>
          </div>
          <div className="points">⭐ {state.points} pts</div>
        </div>
        <div className="progress-track">
          <div className="progress-value" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-text">Avance: {progress}%</p>
      </div>

      <main className="app-container">
        <section className={`scene-card scene-${scene.type}`}>
          <div className="senal">
            <h2>{scene.title}</h2>
            {scene.subtitle && <p>{scene.subtitle}</p>}
          </div>

          <div className="card">
            {scene.content}
          </div>

          {hasDecisions && (

<DecisionBlock decisions={scene.decisions!} onSelect={makeDecision} />
          )}

          {needsContinueButton && (
            <div className="decision-panel">
              <button
                className="btn"
                onClick={() => {
                  // Buscar la siguiente escena en orden
                  const sceneIds = Object.keys(storyScenes);
                  const currentIndex = sceneIds.indexOf(scene.id);
                  if (currentIndex < sceneIds.length - 1) {
                    goToScene(sceneIds[currentIndex + 1]);
                  }
                }}
              >
                ➡️ Continuar
              </button>
            </div>
          )}

          {scene.type === "ending" && <CertificateGenerator />}
        </section>
      </main>
    </>
  );
}