import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import { dateFormat } from "../utils";

const Sighting = () => {
  const [sighting, setSighting] = useState({});
  const [sightingIndex, setSightingIndex] = useState("");
  const navigate = useNavigate();

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
      if (key === "location" || key === "notes") {
        sightingInfo.push(
          <tr key={key}>
            <td>{key}</td>
            <td>{sighting[key]}</td>
          </tr>
        );
      } else if (key === "date") {
        sightingInfo.push(
          <tr key={key}>
            <td>{key}</td>
            <td>{dateFormat(sighting[key])}</td>
          </tr>
        );
      }
    }
  }

  // useParams hook returns object key/value pairs from current URL by <Route path>
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  const handleEdit = (e) => {
    navigate(`/sightings/${sightingIndex}/edit`);
  };

  return (
    <>
      <h2> Sighting {sightingIndex} </h2>
      <button onClick={handleEdit}>Edit Sighting</button>
      <table className="table">
        <tbody>{sightingInfo}</tbody>
      </table>
      <Link to="/sightings">Back to sightings page</Link>
    </>
  );
};

export default Sighting;
