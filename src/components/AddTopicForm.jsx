import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer.jsx";

const TEMPLATE = `# Topic heading

Short explanation here.

\`\`\`js
console.log("example");
\`\`\`
`;

export default function AddTopicForm({ groups, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState(groups[0] || "Custom");
  const [content, setContent] = useState(TEMPLATE);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({ title: title.trim(), group: group.trim(), content });
  };

  const field = "w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-amber-400";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4">
      <form onSubmit={submit} className="flex max-h-full w-full max-w-5xl flex-col rounded-xl border border-slate-700 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
          <h2 className="font-semibold">Add new topic</h2>
          <button type="button" onClick={onCancel} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <div className="grid flex-1 gap-4 overflow-y-auto p-5 md:grid-cols-2">
          <div className="space-y-3">
            <input className={field} placeholder="Topic title (e.g. Promises)" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input className={field} list="groups" placeholder="Group / category" value={group} onChange={(e) => setGroup(e.target.value)} />
            <datalist id="groups">{groups.map((g) => <option key={g} value={g} />)}</datalist>
            <textarea className={`${field} h-80 font-mono`} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write markdown…" required />
          </div>
          <div className="min-h-[12rem] overflow-y-auto rounded-md border border-slate-800 p-4">
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Live preview</p>
            <MarkdownRenderer content={content} />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-800 px-5 py-3">
          <button type="button" onClick={onCancel} className="rounded-md border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">Cancel</button>
          <button type="submit" className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300">Save topic</button>
        </div>
      </form>
    </div>
  );
}
