import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/index.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import HistoryPage from "./pages/HistoryPage/index.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
