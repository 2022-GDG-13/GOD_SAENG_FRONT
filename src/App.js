import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import TodolistPage from "./pages/todolist/TodolistPage";
import PostPage from "./pages/post/PostPage";
import RankingPage from "./pages/ranking/RankingPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/todolist" element={<TodolistPage />} />
              <Route path="/post" element={<PostPage />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <NavBar />
          </Router>
        </Suspense>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
