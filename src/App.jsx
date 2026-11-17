import { useState } from "react";
import useNotes from "./hooks/useNotes.js";
import Sidebar from "./components/Sidebar.jsx";
import TopicView from "./components/TopicView.jsx";
import AddTopicForm from "./components/AddTopicForm.jsx";

export default function App() {
  const { topics, addTopic, deleteTopic, exportJson } = useNotes();
  const [activeId, setActiveId] = useState(topics[0]?.id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const index = Math.max(0, topics.findIndex((t) => t.id === activeId));
  const topic = topics[index];
  const groups = [...new Set(topics.map((t) => t.group))];

  const select = (id) => { setActiveId(id); window.scrollTo({ top: 0 }); };

  return (
    <div className="flex">
      <Sidebar
        topics={topics}
        activeId={topic?.id}
        onSelect={select}
        onAdd={() => setAdding(true)}
        onExport={exportJson}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="min-w-0 flex-1 h-screen overflow-scroll">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur md:hidden">
          <button onClick={() => setMenuOpen(true)} className="rounded border border-slate-700 px-2 py-1">☰</button>
          <span className="font-semibold text-amber-400">JS Notes</span>
        </header>

        <div className="mx-auto max-w-4xl px-5 py-8">
          <TopicView topic={topic} prev={topics[index - 1]} next={topics[index + 1]} onSelect={select} onDelete={(id) => { deleteTopic(id); select(topics[0].id); }} />
        </div>
      </main>

      {adding && (
        <AddTopicForm
          groups={groups}
          onCancel={() => setAdding(false)}
          onSave={(data) => { select(addTopic(data)); setAdding(false); }}
        />
      )}
    </div>
  );
}
