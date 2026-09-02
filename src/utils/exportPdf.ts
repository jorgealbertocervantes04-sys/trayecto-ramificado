import type { JourneyState } from "../types";

export async function exportCertificateToPDF(
  participantName: string
) {
  const element = document.getElementById("certificate");

  if (!element) {
    console.error("No se encontró el elemento del certificado");
    return;
  }

  const opt = {
    margin: 0,
    filename: `reconocimiento_${participantName}.pdf`,
    image: { type: "png" as const, quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "landscape" as const },
  };

  const html2pdf = (await import("html2pdf.js")).default;

  html2pdf().set(opt).from(element).save();
}

export function exportResultsCSV(state: JourneyState) {
  const headers = ["Participante", "Escena", "Decisión", "Correcta", "Puntos", "Fecha"];

  const rows = state.decisions.map((d) => [
    state.participantName || "Sin nombre",
    d.sceneId,
    d.decisionText,
    d.isCorrect ? "Sí" : "No",
    d.points,
    new Date(d.timestamp).toLocaleString("es-MX"),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  const blob = new Blob(["\ufeff" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `resultados_${state.participantName || "participante"}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}