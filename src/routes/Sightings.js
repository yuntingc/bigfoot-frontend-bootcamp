import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { dateFormat } from "../utils";

const Sightings = () => {
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
    for (const item in sighting) {
      sightingList.push(
        <tr key={item}>
          <td>{sighting[item].id}</td>
          <td>{dateFormat(sighting[item].date)}</td>
          <td>{sighting[item].location_description}</td>
          <td>
            <Link to={`/sightings/${sighting[item].id}`}>Details</Link>
          </td>
        </tr>
      );
    }
  }

  return (
    <div>
      <h1>Sightings</h1>
      <table>
        <thead>
          <tr>
            <th>Sighting #</th>
            <th>Date</th>
            <th>Location</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{sightingList}</tbody>
      </table>
      <Outlet />
    </div>
  );
};

export default Sightings;
