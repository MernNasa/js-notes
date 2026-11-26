import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock.jsx";

const components = {
  // fenced code blocks -> CodeBlock
  pre({ children }) {
    const el = Array.isArray(children) ? children[0] : children;
    const code = String(el?.props?.children ?? "").replace(/\n$/, "");
    const lang = /language-(\w+)/.exec(el?.props?.className || "")?.[1];
    return <CodeBlock code={code} lang={lang} />;
  },
  // inline code
  code({ children, ...props }) {
    return (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.85em] text-indigo-700 before:content-none after:content-none" {...props}>
        {children}
      </code>
    );
  },
  // wide tables scroll sideways instead of breaking the layout
  table({ children }) {
    return <div className="not-prose my-4 overflow-x-auto"><table className="w-full border-collapse text-sm">{children}</table></div>;
  },
  th: ({ children }) => <th className="border border-slate-200 bg-slate-100 px-3 py-2 text-left font-semibold">{children}</th>,
  td: ({ children }) => <td className="border border-slate-200 px-3 py-2 align-top">{children}</td>,
};

export default function MarkdownRenderer({ content }) {
  return (
    <article className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-h1:text-2xl prose-h2:text-xl prose-blockquote:border-indigo-500 prose-a:text-indigo-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
