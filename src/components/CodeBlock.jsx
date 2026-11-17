import { useState } from "react";

export default function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="not-prose my-4 overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1.5 text-xs text-slate-400">
        <span className="uppercase tracking-wide">{lang || "code"}</span>
        <button onClick={copy} className="rounded px-2 py-0.5 hover:bg-slate-800 hover:text-white">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-emerald-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}
