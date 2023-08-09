import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/Home/home";
import { Login } from "./pages/login";
import { About } from "./pages/about";
import {CreatePost} from "./pages/createpostfolder/createPost";
import { Profile } from "./pages/profile";

function App() {
  return (
    <div className="app">
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element= {<Home />}></Route>
        <Route path="/createpost" element = {<CreatePost />}></Route>
        <Route path="/login" element = {<Login />}></Route>
        <Route path="/aboutUs" element = {<About />}></Route>
        <Route path="/profile" element = {<Profile />}></Route>
      </Routes>
    </Router>
    </div>
   
 
  );
}

export default App;
