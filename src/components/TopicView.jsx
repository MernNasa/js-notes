import MarkdownRenderer from "./MarkdownRenderer.jsx";

export default function TopicView({ topic, prev, next, onSelect, onDelete }) {
  if (!topic) return <p className="text-slate-500">Select a topic from the sidebar.</p>;

  return (
    <div>
      <div className="mb-2 p-3 flex items-center justify-between bg-slate-50 sticky top-0">
        <div className="text-xs uppercase tracking-wider text-indigo-700">{topic.group}</div>
        {topic.custom && (
          <button onClick={() => window.confirm("Delete this topic?") && onDelete(topic.id)} className="text-xs text-rose-600 hover:text-rose-700">
            Delete
          </button>
        )}
      </div>

      <MarkdownRenderer content={topic.content} />

      <div className="mt-10 flex justify-between gap-4 border-t border-slate-200 pt-6 text-sm">
        {prev ? <button onClick={() => onSelect(prev.id)} className="text-left text-slate-600 hover:text-indigo-700">← {prev.title}</button> : <span />}
        {next ? <button onClick={() => onSelect(next.id)} className="text-right text-slate-600 hover:text-indigo-700">{next.title} →</button> : <span />}
      </div>
    </div>
  );
}
