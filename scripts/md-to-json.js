// Usage: npm run notes   (or: node scripts/md-to-json.js)
// Reads content/notes.md and writes src/data/notes.json
// Each CHAPTER starts at the H1 heading in `start` and runs until the next chapter starts.
import fs from "node:fs";

const CHAPTERS = [
  { title: "Introduction to JavaScript", group: "Basics", start: "What is javascript ?" },
  { title: "SSR vs CSR", group: "Basics", start: "Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)" },
  { title: "Tokens, Keywords & Identifiers", group: "Fundamentals", start: "What is Tokens ?" },
  { title: "Operators & Literals", group: "Fundamentals", start: "What is an Operator ?" },
  { title: "Data Types", group: "Fundamentals", start: "What is Datatype in JS?" },
  { title: "Conditional Statements", group: "Control Flow", start: "What is Conditional Statements in JavaScript?" },
  { title: "Loops", group: "Control Flow", start: "What is loops in JS" },
  { title: "Functions", group: "Functions", start: "What is a Function in JS?" },
  { title: "String Methods", group: "Built-in Methods", start: "String Built-in Methods in JavaScript" },
  { title: "Array Methods", group: "Built-in Methods", start: "Array Built-in Methods in JavaScript" },
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const lines = fs.readFileSync("content/notes.md", "utf8").replace(/\r\n/g, "\n").split("\n");

let inFence = false;
const starts = [];
lines.forEach((line, i) => {
  if (line.startsWith("```")) inFence = !inFence;
  if (inFence || !line.startsWith("# ")) return;
  const text = line.slice(2).trim();
  const chapter = CHAPTERS.find((c) => c.start === text && !starts.some((s) => s.chapter === c));
  if (chapter) starts.push({ chapter, line: i });
});

const topics = starts.map((s, n) => {
  const end = n + 1 < starts.length ? starts[n + 1].line : lines.length;
  return {
    id: slug(s.chapter.title),
    title: s.chapter.title,
    group: s.chapter.group,
    content: lines.slice(s.line, end).join("\n").trim(),
  };
});

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/notes.json", JSON.stringify(topics, null, 2));
console.log(`Wrote ${topics.length} topics -> src/data/notes.json`);
topics.forEach((t) => console.log(" -", t.title, `(${t.content.split("\n").length} lines)`));
