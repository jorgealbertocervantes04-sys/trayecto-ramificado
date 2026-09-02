import { useState } from "react";
import type { Decision } from "../../types";
import { useSound } from "../../hooks/useSound";

interface DecisionBlockProps {
  decisions: Decision[];
  onSelect: (decision: Decision) => void;
}

export function DecisionBlock({
  decisions,
  onSelect,
}: DecisionBlockProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const { success, error, click } = useSound();

  const handleClick = (decision: Decision) => {
    if (locked) return;

    setSelected(decision.id);
    setLocked(true);
    click();

    if (decision.isCorrect) {
      success();
    } else if (decision.isCorrect === false) {
      error();
    }

    window.setTimeout(() => {
      onSelect(decision);
    }, 550);
  };

  return (
    <section className="decision-panel">
      <h3>🧭 ¿Qué decides?</h3>

      <div className="decision-list">
        {decisions.map((decision) => {
          const status =
            selected === decision.id
              ? decision.isCorrect
                ? "correct"
                : decision.isCorrect === false
                ? "incorrect"
                : "selected"
              : "";

          return (
            <button
              className={`decision-button ${status}`}
              disabled={locked}
              key={decision.id}
              onClick={() => handleClick(decision)}
            >
              {decision.text}
            </button>
          );
        })}
      </div>
    </section>
  );
}