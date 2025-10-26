import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const InterviewQuestionDialog = ({ open, onOpenChange, id, data = [] }) => {
  const session = data.find((it) => it.id === id);
  const items = session?.questions || session?.items || [];
  const [openSet, setOpenSet] = React.useState(new Set());
  React.useEffect(() => {
    setOpenSet(new Set());
  }, [id]);

  const toggle = (i) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl! w-full max-h-[90vh] overflow-y-auto p-0 border-none bg-transparent">
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Frontend</h2>
              <p className="text-sm text-muted-foreground">Mid • Japanese</p>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {items.map((it, i) => {
              const isOpen = openSet.has(i);
              return (
                <div
                  key={it.id || i}
                  className="border border-border rounded-lg overflow-hidden bg-background"
                >
                  <button
                    className="w-full px-4 py-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition text-left"
                    onClick={() => toggle(i)}
                  >
                    <span className="font-medium text-foreground flex-1">
                      {it.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
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
                      <div className="px-6 pb-4 prose dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {it.answer || ""}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewQuestionDialog;
