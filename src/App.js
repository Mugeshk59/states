import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Fetch countries data on component mount
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    console.log("county", country);
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    if (country !== "") {
      fetchStates(country);
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    if (state !== "") {
      fetchCities(state);
    }
  };

  const handleCityChange = (e) => {
    setMessage(
      `You selected ${selectedCountry},${selectedState},${e.target.value}`
    );
    setSelectedCity(`${e.target.value}`);
  };

  return (
    <div className="Container">
      <div>
        <h1>Select Location</h1>
      </div>
      <div className="dropdown">
        <label htmlFor="country">Select Country:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e)}
        >
          <option value="">Select</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <label htmlFor="state">Select State:</label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <label htmlFor="city">Select City:</label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <p className="selected">{message}</p>
    </div>
  );
};

export default LocationSelector;
