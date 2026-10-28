import { useEffect, useState } from "react";
import "./PythonTerminal.css";

const LINES = [
  { kind: "command", content: "❯ python shannon.py" },
  { kind: "code", content: "from analytics import DataAnalyst" },
  { kind: "code", content: "" },
  { kind: "code", content: "analyst = DataAnalyst(" },
  { kind: "code", content: '    name="Shannon Wise",' },
  { kind: "code", content: '    skills=["Python", "SQL", "Power BI"],' },
  { kind: "code", content: '    focus=["Automation", "Insights", "Apps"]' },
  { kind: "code", content: ")" },
  { kind: "code", content: "" },
  { kind: "code", content: "analyst.build_solutions()" },
  { kind: "success", content: "✓ Data connected" },
  { kind: "success", content: "✓ Portfolio ready" },
];

const FULL_TEXT = LINES.map(line => line.content).join("\n");

// Highlight only the characters already typed, so the animation stays intact.
const PYTHON_TOKENS = /(\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'|\b(?:from|import|as|def|return|class|True|False|None)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z_0-9]*(?=\()|\b[A-Za-z_][A-Za-z_0-9]*(?=\s*=)|#[^\n]*)/g;

function highlightPython(text) {
  return text.split(PYTHON_TOKENS).filter(Boolean).map((piece, index) => {
    let token = "plain";
    if (/^[\"']/.test(piece)) token = "string";
    else if (/^(from|import|as|def|return|class|True|False|None)$/.test(piece)) token = "keyword";
    else if (/^\d/.test(piece)) token = "number";
    else if (/^#/.test(piece)) token = "comment";
    else if (/^[A-Za-z_]\w*$/.test(piece)) token = /^(name|skills|focus)$/.test(piece) ? "property" : "function";
    return <span className={`python-terminal__token--${token}`} key={index}>{piece}</span>;
  });
}

export default function PythonTerminal() {
  const [shown, setShown] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      // Static readable terminal for visitors who prefer less motion.
      return;
    }
    let length = 0;
    const timer = window.setInterval(() => {
      length = Math.min(length + 1, FULL_TEXT.length);
      setShown(length);
      if (length === FULL_TEXT.length) window.clearInterval(timer);
    }, 25);
    return () => window.clearInterval(timer);
  }, [replayKey]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(FULL_TEXT.length);
    }
  }, []);

  let remaining = shown;
  return (
    <div className="python-terminal" aria-label="Animated Python portfolio introduction">
      <div className="python-terminal__bar">
        <div className="python-terminal__dots" aria-hidden="true">
          <span /><span /><span />
        </div>
        <span className="python-terminal__title">shannon@analytics / python3</span>
        <span className="python-terminal__bars" aria-hidden="true">▮▮▮</span>
      </div>
      <div className="python-terminal__body">
        <div className="python-terminal__code" aria-hidden="true">
          {LINES.map((line, index) => {
            const lineStart = remaining;
            const text = line.content.slice(0, Math.max(0, lineStart));
            remaining = Math.max(0, remaining - line.content.length - (index < LINES.length - 1 ? 1 : 0));
            // A newline is revealed after every completed line.
            const isVisible = lineStart > 0 || (index === 0 && shown === 0);
            return isVisible ? (
              <div className={`python-terminal__line python-terminal__line--${line.kind}`} key={index}>
                {line.kind === "code" && text ? highlightPython(text) : (text || "\u00a0")}
              </div>
            ) : null;
          })}
          <span className="python-terminal__cursor" />
        </div>
        <button
          type="button"
          className="python-terminal__replay"
          onClick={() => { setShown(0); setReplayKey(key => key + 1); }}
          aria-label="Replay typing animation"
        >
          ↻ Replay
        </button>
      </div>
    </div>
  );
}
