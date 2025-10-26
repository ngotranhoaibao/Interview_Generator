import React from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const InterviewQuestionList = ({ questions = [], handleSaveSession,handleClear }) => {
  const [openIds, setOpenIds] = React.useState(new Set());
  React.useEffect(() => {
    setOpenIds(new Set());
  }, [questions]);

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  if (!questions.length) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="space-y-3">
        {questions.map((it) => {
          const id = String(it.id);
          const isOpen = openIds.has(id);

          return (
            <div
              key={id}
              className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition"
            >
              <button
                className="w-full px-4 py-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition text-left"
                onClick={() => toggle(id)}
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
                  <div className="px-4 py-4 bg-muted/30 border-t border-border">
                    <article
                      className=" prose prose-sm dark:prose-invert max-w-none
                      prose-headings:mb-2 prose-h3:mt-0 prose-h3:text-foreground prose-h3:font-semibold
                      prose-p:my-1 prose-ul:my-1 prose-li:my-0
                      prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-3"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {it.answer || ""}
                      </ReactMarkdown>
                    </article>
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
        <button onClick={handleClear} className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition">
          Clear
        </button>
      </div>
    </div>
  );
};

export default InterviewQuestionList;
