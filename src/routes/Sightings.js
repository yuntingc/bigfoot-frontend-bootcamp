import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const Sightings = () => {
  const navigate = useNavigate();
  const [sighting, setSighting] = useState({});

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get(`${BACKEND_URL}/sightings`);
      setSighting(response.data);
    };
    getResponse();
  }, [sighting]);

  const sightingList = [];
  if (sighting) {
    for (const key in sighting) {
      sightingList.push(
        <option value={key} key={key}>
          Sighting {key}
        </option>
      );
    }
  }

  const handleChange = (e) => {
    navigate(`/sightings/${Number(e.target.value)}`);
  };

  return (
    <div>
      <h1>Sightings</h1>
      <select onChange={handleChange}>
        <option selected>Select Sighting</option>
        {sightingList}
      </select>

      <Outlet />
    </div>
  );
};

export default Sightings;
