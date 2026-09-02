import type { JourneyState } from "../types";

function escapeCSV(value: string | number | boolean) {
  const text = String(value).replace(/"/g, '""');
  return `"${text}"`;
}

export function exportResultsCSV(state: JourneyState) {
  const rows = [
    [
      "Participante",
      "Escena",
      "Decisión",
      "Correcta",
      "Puntos obtenidos",
      "Fecha",
    ],
    ...state.decisions.map((decision) => [
      state.participantName || "Sin nombre",
      decision.sceneId,
      decision.decisionText,
      decision.isCorrect ? "Sí" : "No",
      decision.points,
      new Date(decision.timestamp).toLocaleString("es-MX"),
    ]),
  ];

  const content = rows
    .map((row) => row.map(escapeCSV).join(","))
    .join("\n");

  const blob = new Blob(["\ufeff" + content], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `resultado_trayecto_${state.participantName || "participante"}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}