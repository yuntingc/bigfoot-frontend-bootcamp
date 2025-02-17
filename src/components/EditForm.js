import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import { dateFormat } from "../utils";

const EditForm = () => {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [sightingIndex, setSightingIndex] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getResponse = async () => {
      if (sightingIndex) {
        const response = await axios.get(
          `${BACKEND_URL}/sightings/${sightingIndex}`
        );

        setDate(dateFormat(response.data.date));
        setCity(response.data.city);
        setCountry(response.data.country);
        setLocation(response.data.location_description);
        setNotes(response.data.notes);
      }
    };
    getResponse();
  }, [sightingIndex]);

  const handleChange = (e) => {
    if (e.target.name === "date") {
      setDate(e.target.value);
    }

    if (e.target.name === "city") {
      setCity(e.target.value);
    }

    if (e.target.name === "country") {
      setCountry(e.target.value);
    }

    if (e.target.name === "location") {
      setLocation(e.target.value);
    }

    if (e.target.name === "notes") {
      setNotes(e.target.value);
    }
  };

  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // send post request from frontend to backend
    const sendRequest = async () => {
      const response = await axios.put(
        `http://localhost:3000/sightings/${sightingIndex}`,
        {
          date,
          city,
          country,
          location_description: location,
          notes,
        }
      );

      console.log("edited sighting");
      console.log(response);
      navigate(`/sightings/${sightingIndex}`);
    };

    sendRequest();
  };

  return (
    <>
      <h1> Edit Sighting {sightingIndex}</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" onChange={handleChange} value={date} />
        </label>
        <label>
          City:
          <input type="text" name="city" onChange={handleChange} value={city} />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            onChange={handleChange}
            value={country}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            onChange={handleChange}
            value={location}
          />
        </label>
        <label>
          Notes:
          <input
            type="text"
            name="notes"
            onChange={handleChange}
            value={notes}
          />
        </label>
        <input type="submit" value="Save" />
      </form>
    </>
  );
};

export default EditForm;
