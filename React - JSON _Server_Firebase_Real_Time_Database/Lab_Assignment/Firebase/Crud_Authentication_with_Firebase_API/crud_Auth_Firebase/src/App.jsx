import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GoogleAuth from "../src/Task_2/Components/Gogole_Auth";
import Crud from "../src/Task_2/Components/Crud";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleAuth />} />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </Router>
  );
};

export default App;
