import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ParisDataPage from "./pages/ParisDataPage";
import IdfDataPage from "./pages/IdfDataPage";
import IdfMapPage from "./pages/idfData/IdfMapPage";
import ParisMapPage from "./pages/parisData/ParisMapPage";
import Header from "./components/Header";
import parisRoutesData from "./data/parisRoutesData";
import idfRoutesData from "./data/idfRoutesData";
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
        {parisRoutesData.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ParisMapPage
                url={route.url}
                title={route.title}
                src={route.src}
                component={route.component}
              />
            }
          />
        ))}
        {idfRoutesData.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <IdfMapPage
                url={route.url}
                title={route.title}
                src={route.src}
                component={route.component}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
