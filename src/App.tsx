/**
 * App Principal do Hub de Informação GEN AI
 * MVP escalável e responsivo, focado em jovens da Gen Z
 * Comentado e documentado conforme melhores práticas de engenharia front-end
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => (
  <Router>
    {/* Barra de navegação fixa */}
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/artigo/:id" element={<ArticlePage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
