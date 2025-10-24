import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QuestionGeneratorForm = ({
  loading,
  handleCreate,
  setValue,
  valueInput,
  setLevel,
  setLanguage,
}) => {
  return (
      <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div>
          <label className="block text-sm font-medium mb-2">Job Position</label>
          <Input
            value={valueInput}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="e.g. Frontend Developer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Level</label>
            <select
              defaultValue="Mid"
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option>Fresher</option>
              <option>Junior</option>
              <option >Mid</option>
              <option>Senior</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground">
              <option >English</option>
              <option>Vietnamese</option>
              <option>Japanese</option>
            </select>
          </div>
        </div>
        <Button
          className="w-full"
          onClick={handleCreate}
          disabled={loading || !valueInput.trim()}
        >
          {loading ? "Generating..." : "Generate Questions"}
        </Button>
      </div>
  );
};

export default QuestionGeneratorForm;
