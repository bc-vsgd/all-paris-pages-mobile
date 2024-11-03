import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ParisDataPage from "./pages/ParisDataPage";
import IdfDataPage from "./pages/IdfDataPage";
import Header from "./components/Header";
import parisRoutesData from "./data/parisRoutesData";
import useStore from "./store/useStore";

function App() {
  const setUserLocation = useStore((state) => state.setUserLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error retrieving user location:", error);
        }
      );
    }
  }, [setUserLocation]);
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
