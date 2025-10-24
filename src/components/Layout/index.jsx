import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
