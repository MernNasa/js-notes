import { useEffect, useState } from "react";
import baseNotes from "../data/notes.json"; // generated from notes.md

const KEY = "js-notes:custom-topics";

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; }
};

// Merges generated notes.json with topics you add in the browser (saved in localStorage).
export default function useNotes() {
  const [custom, setCustom] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(custom)); } catch { /* ignore */ }
  }, [custom]);

  const topics = [...baseNotes, ...custom];

  const addTopic = ({ title, group, content }) => {
    const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    setCustom((prev) => [...prev, { id, title, group: group || "Custom", content, custom: true }]);
    return id;
  };

  const deleteTopic = (id) => setCustom((prev) => prev.filter((t) => t.id !== id));

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(topics, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "notes.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return { topics, addTopic, deleteTopic, exportJson };
}
