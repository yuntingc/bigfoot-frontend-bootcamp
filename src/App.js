import React from "react";
import { Route, Routes } from "react-router-dom";
import Sightings from "./routes/Sightings";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import SharedLayout from "./routes/SharedLayout";
import Sighting from "./components/Sighting";
import Form from "./components/Form";
import EditForm from "./components/EditForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="new" element={<Form />} />
          <Route path="sightings" element={<Sightings />} />
          <Route
            path="/sightings/:sightingIndex"
            element={<Sighting />}
          ></Route>
          <Route path="/sightings/:sightingIndex/edit" element={<EditForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
