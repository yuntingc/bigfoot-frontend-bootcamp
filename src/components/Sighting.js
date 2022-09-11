import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const Sighting = () => {
  const [sighting, setSighting] = useState({});
  const [sightingIndex, setSightingIndex] = useState("0");

  useEffect(() => {
    const getResponse = async () => {
      if (sightingIndex) {
        const response = await axios.get(
          `${BACKEND_URL}/sightings/${sightingIndex}`
        );
        console.log(response.data);
        setSighting(response.data);
      }
    };
    getResponse();
  }, [sightingIndex]);

  let sightingInfo = [];
  if (sighting) {
    for (const key in sighting) {
      sightingInfo.push(
        <tr>
          <td>{key}</td>
          <td>{sighting[key]}</td>
        </tr>
      );
    }
  }

  // useParams hook returns object key/value pairs from current URL by <Route path>
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  return (
    <>
      <h2> Sighting {sightingIndex} </h2>
      <table class="table">
        <tbody>{sightingInfo}</tbody>
      </table>
      <Link to="/sightings">Back to sightings page</Link>
    </>
  );
};

export default Sighting;
