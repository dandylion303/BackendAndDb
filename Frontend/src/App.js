import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import LoginPage from "./views/login/LoginPage";
import RegisterNewAuthor from "./views/new/RegisterNewAuthor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReturnPage from "./views/login/ReturnPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterNewAuthor/>}/>
        <Route path="/oauth" element={<ReturnPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
