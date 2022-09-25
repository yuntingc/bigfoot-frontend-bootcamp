import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Form = () => {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // send post request from frontend to backend
    const sendRequest = async () => {
      const response = await axios.post("http://localhost:3000/sightings", {
        date,
        city,
        country,
        location_description: location,
        notes,
      });

      console.log("new sighting posted");
      console.log(response);

      // reset form
      setDate("");
      setLocation("");
      setNotes("");
      // go back to sightings page

      navigate(`/sightings/${response.data.id}`);
    };

    sendRequest();
  };

  return (
    <>
      Form
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
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Form;
