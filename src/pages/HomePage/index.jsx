import React, { useState } from "react";
import QuestionGeneratorForm from "@/components/QuestionGeneratorForm";
import InterviewQuestionList from "@/components/InterviewQuestionList";
import { GoogleGenerativeAI } from "@google/generative-ai";

const STORAGE_KEY = "questionSessions";

const HomePage = () => {
  const [valueInput, setValueInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [level, setLevel] = useState("Mid");
  const [language, setLanguage] = useState("English");

  const cleanQuestion = (q) =>
    q
      .replace(/^(\*\*)?\s*question\s*:?\s*(\*\*)?/i, "")
      .replace(/^\d+[\.\)]\s*/, "")
      .replace(/\*\*/g, "")
      .trim();
  const parseQuestionsAndAnswers = (text) => {
    if (!text) return [];
    const blocks = text
      .split(/\n(?=\d+\.\s)/g)
      .map((b) => b.trim())
      .filter(Boolean);

    return blocks.map((block, idx) => {
      const m = block.match(/^\d+\.\s*(.*?)(?:\n|$)/);
      const questionRaw = m ? m[1] : `Question ${idx + 1}`;
      const question = cleanQuestion(questionRaw);
      const answer = block.replace(/^\d+\.\s*.*?\n?/, "").trim();

      return {
        id: Date.now() + idx,
        question,
        answer,
      };
    });
  };

  const handleCreate = async () => {
    if (!valueInput.trim() || loading) return;

    try {
      setLoading(true);
      const prompt = `
You are a professional technical interviewer. Generate **10 Q&A blocks** for the role:
**${valueInput}** (Level: **${level}**, Language: **${language}**).

Format each block EXACTLY like this (Markdown):

1. <Plain question sentence (no "Question:" prefix, no bold)>
### Key Concepts
- bullet point
- bullet point
### Explanation
1–2 concise paragraphs.
### Example
\`\`\`javascript
// if relevant; otherwise omit this section entirely
\`\`\`
### Best Practices
- bullet
### Common Mistakes
- bullet

Rules:
- Output 10 blocks, numbered 1..10.
- All content must be in ${language}.
- Do NOT wrap questions in **bold**.
- No extra intro/outro text outside the blocks.
`;

      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) {
        alert("Thiếu API key (VITE_API_KEY).");
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const resp = await model.generateContent(prompt);
      const text = resp.response?.text?.() ?? "";

      const qaList = parseQuestionsAndAnswers(text);
      setResult(qaList);
    } catch (error) {
      console.error("Error generating:", error);
      alert("Có lỗi xảy ra khi gọi Gemini API.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSession = () => {
    if (!result.length) {
      alert("Chưa có câu hỏi để lưu.");
      return;
    }
    const session = {
      id: Date.now(),
      title: valueInput || "Untitled",
      level,
      language,
      questions: result,
      createdAt: new Date().toISOString(), 
      questionsCount: result.length, 
    };
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([session, ...stored]));
    alert("Session saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <QuestionGeneratorForm
        loading={loading}
        handleCreate={handleCreate}
        setValue={setValueInput}
        valueInput={valueInput}
        setLevel={setLevel}
        setLanguage={setLanguage}
      />
      <InterviewQuestionList
        questions={result}
        handleSaveSession={handleSaveSession}
      />
    </div>
  );
};

export default HomePage;
