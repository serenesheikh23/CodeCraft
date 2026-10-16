"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Code shown with syntax highlighting tokens
const codeLines: Array<Array<{ text: string; type: "keyword" | "string" | "comment" | "func" | "type" | "plain" | "punct" }>> = [
  [{ text: "// Export a service", type: "comment" }],
  [
    { text: "export ", type: "keyword" },
    { text: "async function ", type: "keyword" },
    { text: "ship", type: "func" },
    { text: "(", type: "punct" },
    { text: "idea", type: "plain" },
    { text: ": ", type: "punct" },
    { text: "Idea", type: "type" },
    { text: ") {", type: "punct" },
  ],
  [
    { text: "  const ", type: "keyword" },
    { text: "plan ", type: "plain" },
    { text: "= ", type: "punct" },
    { text: "await ", type: "keyword" },
    { text: "scope", type: "func" },
    { text: "(idea);", type: "punct" },
  ],
  [
    { text: "  const ", type: "keyword" },
    { text: "build ", type: "plain" },
    { text: "= ", type: "punct" },
    { text: "await ", type: "keyword" },
    { text: "engineer", type: "func" },
    { text: "(plan);", type: "punct" },
  ],
  [
    { text: "  const ", type: "keyword" },
    { text: "result ", type: "plain" },
    { text: "= ", type: "punct" },
    { text: "await ", type: "keyword" },
    { text: "deploy", type: "func" },
    { text: "(build);", type: "punct" },
  ],
  [],
  [
    { text: "  return ", type: "keyword" },
    { text: "{", type: "punct" },
  ],
  [
    { text: "    status", type: "plain" },
    { text: ": ", type: "punct" },
    { text: '"live"', type: "string" },
    { text: ",", type: "punct" },
  ],
  [
    { text: "    uptime", type: "plain" },
    { text: ": ", type: "punct" },
    { text: '"99.9%"', type: "string" },
    { text: ",", type: "punct" },
  ],
  [
    { text: "    time", type: "plain" },
    { text: ": ", type: "punct" },
    { text: '"3.2s"', type: "string" },
    { text: ",", type: "punct" },
  ],
  [
    { text: "    quality", type: "plain" },
    { text: ": ", type: "punct" },
    { text: '"ship-ready"', type: "string" },
    { text: ",", type: "punct" },
  ],
  [{ text: "  };", type: "punct" }],
  [{ text: "}", type: "punct" }],
];

const colorMap = {
  keyword: "text-[#C792EA]",
  string: "text-lime",
  comment: "text-text-muted italic",
  func: "text-[#82AAFF]",
  type: "text-coral",
  plain: "text-text",
  punct: "text-text-muted",
};

export default function ServicesTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentTokenIdx, setCurrentTokenIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) {
      const restartTimer = setTimeout(() => {
        setVisibleLines(0);
        setCurrentTokenIdx(0);
        setCurrentCharIdx(0);
        setIsDone(false);
      }, 6000);
      return () => clearTimeout(restartTimer);
    }

    if (visibleLines >= codeLines.length) {
      setIsDone(true);
      return;
    }

    const currentLineTokens = codeLines[visibleLines];

    // Empty line — skip quickly
    if (currentLineTokens.length === 0) {
      const t = setTimeout(() => {
        setVisibleLines((l) => l + 1);
        setCurrentTokenIdx(0);
        setCurrentCharIdx(0);
      }, 200);
      return () => clearTimeout(t);
    }

    if (currentTokenIdx >= currentLineTokens.length) {
      const t = setTimeout(() => {
        setVisibleLines((l) => l + 1);
        setCurrentTokenIdx(0);
        setCurrentCharIdx(0);
      }, 180);
      return () => clearTimeout(t);
    }

    const currentToken = currentLineTokens[currentTokenIdx];

    if (currentCharIdx < currentToken.text.length) {
      const speed = currentToken.type === "comment" ? 18 : 28;
      const t = setTimeout(() => {
        setCurrentCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      setCurrentTokenIdx((i) => i + 1);
      setCurrentCharIdx(0);
    }
  }, [visibleLines, currentTokenIdx, currentCharIdx, isDone]);

  const renderCompletedLine = (line: typeof codeLines[0], idx: number) => (
    <div key={idx} className="flex gap-4">
      <span className="text-text-muted/40 select-none w-6 text-right flex-shrink-0">
        {idx + 1}
      </span>
      <span className="flex-1 whitespace-pre-wrap break-all">
        {line.map((token, ti) => (
          <span key={ti} className={colorMap[token.type]}>
            {token.text}
          </span>
        ))}
      </span>
    </div>
  );

  const renderActiveLine = () => {
    const line = codeLines[visibleLines];
    if (!line) return null;

    return (
      <div className="flex gap-4">
        <span className="text-text-muted/40 select-none w-6 text-right flex-shrink-0">
          {visibleLines + 1}
        </span>
        <span className="flex-1 whitespace-pre-wrap break-all">
          {line.slice(0, currentTokenIdx).map((token, ti) => (
            <span key={ti} className={colorMap[token.type]}>
              {token.text}
            </span>
          ))}
          {line[currentTokenIdx] && (
            <span className={colorMap[line[currentTokenIdx].type]}>
              {line[currentTokenIdx].text.slice(0, currentCharIdx)}
              <span className="inline-block w-[2px] h-4 bg-lime ml-0.5 align-middle animate-pulse" />
            </span>
          )}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mt-20 lg:mt-32 max-w-3xl"
    >
      <div className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium mb-4">
        HOW WE THINK
      </div>

      <div className="border border-border bg-card rounded-lg overflow-hidden">
        {/* Editor tabs */}
        <div className="flex items-center border-b border-border bg-background/40">
          <div className="flex items-center gap-2 px-4 py-3 border-r border-border">
            <span className="w-2 h-2 rounded-full bg-coral" />
            <span className="text-xs font-mono text-text">ship.ts</span>
          </div>
          <div className="px-4 py-3 text-xs font-mono text-text-muted">types.ts</div>
          <div className="px-4 py-3 text-xs font-mono text-text-muted">api.ts</div>
        </div>

        {/* Editor body */}
        <div className="p-6 font-mono text-sm leading-loose space-y-0.5 min-h-[420px]">
          {Array.from({ length: visibleLines }).map((_, idx) =>
            renderCompletedLine(codeLines[idx], idx)
          )}
          {!isDone && visibleLines < codeLines.length && renderActiveLine()}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-background/40 text-xs font-mono text-text-muted">
          <span>main</span>
          <span className="flex items-center gap-3">
            <span className="text-lime">● 0 errors</span>
            <span>Ln {Math.min(visibleLines + 1, codeLines.length)}, Col {currentCharIdx + 1}</span>
          </span>
        </div>
      </div>

      <p className="mt-6 text-sm text-text-muted max-w-xl">
        Every service starts as a problem worth solving. We scope it, build it, ship it — and stay around after launch.
      </p>
    </motion.div>
  );
}
