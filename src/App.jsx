import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ParisDataPage from "./pages/parisData/ParisDataPage";
import IdfDataPage from "./pages/idfData/IdfDataPage";
import Header from "./components/Header";
import parisRoutesData from "./data/parisRoutesData";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paris-data" element={<ParisDataPage />} />
        <Route path="/idf-data" element={<IdfDataPage />} />
        {parisRoutesData.map(
          ({ path, component: Element, title, url, src }) => (
            <Route
              key={path}
              path={path}
              element={<Element title={title} url={url} src={src} />}
            />
          )
        )}
      </Routes>
    </Router>
  );
}

export default App;
