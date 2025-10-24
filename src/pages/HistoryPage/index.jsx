import React from "react";
import InterviewHistoryList from "@/components/InterviewHistoryList";

const STORAGE_KEY = "questionSessions";

const readHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeHistory = (data) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

const HistoryPage = () => {
  const [items, setItems] = React.useState([]);
  const [query, setQuery] = React.useState("");
  React.useEffect(() => {
    setItems(readHistory());
  }, []);

  const handleDeleteAll = () => {
    if (!items.length) return;
    if (confirm("Are you sure you want to delete all history?")) {
      writeHistory([]);
      setItems([]);
    }
  };

  const handleDeleteOne = (id) => {
    const next = items.filter((i) => i.id !== id);
    if(confirm("Delete this session?")){
      writeHistory(next);
      setItems(next);
    }
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter((i) => {
        const title = (i.title || "").toLowerCase();
        const level = (i.level || "").toLowerCase();
        return title.includes(q) || level.includes(q);
      })
    : items;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Interview History</h2>
        <div className="flex gap-4">
          <input
            placeholder="Search by job title or level..."
            className="flex-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition disabled:opacity-50 text-white"
            disabled={!items.length}
          >
            Delete All
          </button>
        </div>
      </div>

      <InterviewHistoryList items={filtered} onDeleteOne={handleDeleteOne} />
    </div>
  );
};

export default HistoryPage;
