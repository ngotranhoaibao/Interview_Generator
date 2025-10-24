import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const Header = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link className="flex items-center gap-2" to="/">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  AI
                </span>
              </div>
              <h1 className="text-xl font-bold text-foreground hidden sm:block">
                Interview Generator
              </h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link className="transition text-primary font-semibold" to="/">
                Generate
              </Link>
              <Link
                className="transition text-muted-foreground hover:text-foreground"
                to="/history"
              >
                History
              </Link>
              <button
                onClick={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
                className="p-2 rounded-lg hover:bg-muted transition"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-sun w-5 h-5"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                ) : (
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
                    className="lucide lucide-sun w-5 h-5"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
