import React from "react";

const InterviewHistoryList = ({ items = [], onDeleteOne, onSelect }) => {
  if (!items.length) {
    return (
      <div className="text-sm text-muted-foreground text-center">
        No interview sessions found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const { id, title, level, language, createdAt, questionsCount } = item;

        const date = createdAt ? new Date(createdAt) : new Date();
        const when = date.toLocaleString(undefined, {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={id}
            className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition cursor-pointer group"
            onClick={() => onSelect?.(item)}
          >
            <div className="flex items-start justify-between gap-4">
              <button className="flex-1 text-left hover:opacity-80 transition">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{title}</h3>

                  {level ? (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {level}
                    </span>
                  ) : null}

                  {language ? (
                    <span className="px-2 py-1 bg-secondary/10 text-secondary-foreground text-xs rounded-full">
                      {language}
                    </span>
                  ) : null}
                </div>

                <p className="text-sm text-muted-foreground">{when}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {questionsCount ?? 0}{" "}
                  {Number(questionsCount) === 1 ? "question" : "questions"}
                </p>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteOne?.(id);
                }}
                aria-label="Delete"
                className="p-2 hover:bg-destructive/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                title="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash2 w-4 h-4 text-destructive"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InterviewHistoryList;
