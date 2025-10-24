import React from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const InterviewQuestionList = ({ items = [], handleSaveSession }) => {
  const [open, setOpen] = React.useState(new Set());
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  if (!items.length) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="space-y-3">
        {items.map((it, i) => {
          const isOpen = open.has(i);
          return (
            <div
              key={it.id || i}
              className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition"
            >
              <button
                className="w-full px-4 py-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition text-left"
                onClick={() => toggle(i)}
              >
                <span className="font-medium text-foreground flex-1">
                  {it.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[2000px]" : "max-h-0"
                }`}
              >
                <div className="animate-in fade-in duration-300">
                  <div
                    data-slot="card"
                    className="bg-card text-card-foreground flex flex-col rounded-xl border mb-0 shadow-none border-none gap-0 p-0"
                  >
                    <div data-slot="card-content" className="px-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {it.answer || ""}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleSaveSession}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
        >
          Save this session
        </button>
        <button class="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition">
          Clear
        </button>
      </div>
    </div>
  );
};

export default InterviewQuestionList;
