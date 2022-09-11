import React from "react";
import { Route, Routes } from "react-router-dom";
import Sightings from "./routes/Sightings";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import SharedLayout from "./routes/SharedLayout";
import Sighting from "./components/Sighting";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="sightings" element={<Sightings />}>
            <Route path=":sightingIndex" element={<Sighting />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
