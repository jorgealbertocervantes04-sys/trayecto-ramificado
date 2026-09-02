interface ProgressBarProps {
  progress: number;
  points: number;
}

export function ProgressBar({ progress, points }: ProgressBarProps) {
  return (
    <section className="top-panel">
      <div className="top-row">
        <div>
          <p className="eyebrow">CURSO INTERACTIVO</p>
          <h1>🛣️ Conociendo tu Trayecto</h1>
        </div>

        <div className="points">⭐ {points} pts</div>
      </div>

      <div
        className="progress-track"
        aria-label={`Progreso: ${progress}%`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="progress-value" style={{ width: `${progress}%` }} />
      </div>

      <p className="progress-text">Avance del trayecto: {progress}%</p>
    </section>
  );
}