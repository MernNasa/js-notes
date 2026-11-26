import { useMemo, useState } from "react";

export default function Sidebar({ topics, activeId, onSelect, onAdd, onExport, open, onClose }) {
  const [query, setQuery] = useState("");

  // filter by title or content, then group
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? topics.filter((t) => t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q))
      : topics;
    return list.reduce((acc, t) => {
      (acc[t.group] ||= []).push(t);
      return acc;
    }, {});
  }, [topics, query]);

  return (
    <>
      {open && <div className="fixed inset-0 z-20 bg-slate-900/40 md:hidden" onClick={onClose} />}
      <aside
        className={`fixed h-screen overflow-scroll inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h1 className="text-lg font-bold text-indigo-700">JS Notes</h1>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics…"
            className="mt-3 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {Object.keys(groups).length === 0 && <p className="px-3 text-sm text-slate-500">No topics found.</p>}
          {Object.entries(groups).map(([group, items]) => (
            <div key={group} className="mb-3">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{group}</p>
              {items.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { onSelect(t.id); onClose(); }}
                  className={`block w-full rounded-md px-3 py-1.5 text-left text-sm ${
                    t.id === activeId ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* <div className="space-y-2 border-t border-slate-200 p-3">
          <button onClick={onAdd} className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            + Add topic
          </button>
          <button onClick={onExport} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100">
            Export notes.json
          </button>
        </div> */}
      </aside>
    </>
  );
}
