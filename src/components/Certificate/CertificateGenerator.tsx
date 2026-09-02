import { useState } from "react";
import { useJourney } from "../../contexts/JourneyContext";
import { exportResultsCSV } from "../../utils/exportCSV";

function getRank(points: number) {
  if (points >= 40) return "🏆 Operador Estratégico";
  if (points >= 20) return "🥇 Conductor Confiable";
  if (points >= 10) return "🥈 Aprendiz del Camino";
  return "🛣️ Explorador de Rutas";
}

export function CertificateGenerator() {
  const { state, setParticipantName, resetJourney } = useJourney();
  const [name, setName] = useState<string>(state.participantName ?? "");

  const rank = getRank(state.points);

  const saveName = () => {
    const trimmedName = name.trim();
    setParticipantName(trimmedName);
  };

  const printCertificate = () => {
    saveName();
    window.setTimeout(() => window.print(), 100);
  };

  return (
    <section className="ending-area">
      <div className="participant-form">
        <label htmlFor="participantName">
          Nombre de la persona participante
        </label>

        <input
          id="participantName"
          onChange={(event) => setName(event.target.value)}
          placeholder="Escribe tu nombre completo"
          value={name}
        />

        <div className="actions">
          <button className="primary-button" onClick={printCertificate}>
            🖨️ Imprimir reconocimiento
          </button>

          <button
            className="secondary-button"
            onClick={() => {
              saveName();
              exportResultsCSV({
                ...state,
                participantName: name.trim(),
              });
            }}
          >
            📥 Descargar historial CSV
          </button>

          <button className="danger-button" onClick={resetJourney}>
            🔄 Reiniciar experiencia
          </button>
        </div>
      </div>

      <article className="certificate" id="certificate">
        <div className="certificate-side">
          <p>TRAYECTO</p>
          <span>FORMACIÓN OPERADOR TUTOR</span>
        </div>

        <div className="certificate-content">
          <p className="certificate-brand">UDAT</p>
          <p className="certificate-small">OTORGAN EL PRESENTE</p>
          <h2>RECONOCIMIENTO</h2>
          <p className="certificate-small">A:</p>

          <p className="certificate-name">
            {name.trim() || "Nombre del participante"}
          </p>

          <p>Por su participación en el programa interactivo</p>
          <h3>Conociendo tu Trayecto</h3>

          <p className="certificate-rank">{rank}</p>

          <div className="signatures">
            <div>
              <div className="signature">Alberto Hernández</div>
              <hr />
              <strong>Alberto Hernández</strong>
              <small>Secretario académico</small>
            </div>

            <div>
              <div className="signature">J. Osuna</div>
              <hr />
              <strong>Jorge Osuna</strong>
              <small>Mentor Líder</small>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}