import { useState } from "react";
import "./CreateTrip.css";

function CreateTrip() {

  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    returnDate: "",
    members: "",
    budget: "",
    tripType: "",
    travelMode: "",
    description: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !trip.destination ||
      !trip.startDate ||
      !trip.returnDate ||
      !trip.members ||
      !trip.budget ||
      !trip.tripType ||
      !trip.travelMode
    ) {
      setMessage("Please fill all required fields.");
      return;
    }


    const existingTrips =
      JSON.parse(localStorage.getItem("trips")) || [];

    const newTrip = {
      id: Date.now(),
      ...trip
    };

    existingTrips.push(newTrip);

    localStorage.setItem(
      "trips",
      JSON.stringify(existingTrips)
    );

    setMessage("Trip created successfully!");

    // Clear form
    setTrip({
      destination: "",
      startDate: "",
      returnDate: "",
      members: "",
      budget: "",
      tripType: "",
      travelMode: "",
      description: ""
    });
  };

  // Reset form
  const handleReset = () => {
    setTrip({
      destination: "",
      startDate: "",
      returnDate: "",
      members: "",
      budget: "",
      tripType: "",
      travelMode: "",
      description: ""
    });

    setMessage("");
  };

  return (
    <div className="create-trip">

      <div className="trip-form-container">

        <h1>Create Your Trip</h1>

        <p className="form-subtitle">
          Enter your trip details to start planning.
        </p>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Destination */}
          <div className="form-group">
            <label>Destination *</label>

            <input
              type="text"
              name="destination"
              value={trip.destination}
              onChange={handleChange}
              placeholder="Enter destination"
            />
          </div>


          {/* Dates */}
          <div className="form-row">

            <div className="form-group">
              <label>Start Date *</label>

              <input
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label>Return Date *</label>

              <input
                type="date"
                name="returnDate"
                value={trip.returnDate}
                onChange={handleChange}
              />
            </div>

          </div>


          {/* Members & Budget */}
          <div className="form-row">

            <div className="form-group">
              <label>Number of Members *</label>

              <input
                type="number"
                name="members"
                value={trip.members}
                onChange={handleChange}
                placeholder="Enter members"
                min="1"
              />
            </div>


            <div className="form-group">
              <label>Budget *</label>

              <input
                type="number"
                name="budget"
                value={trip.budget}
                onChange={handleChange}
                placeholder="Enter budget"
                min="0"
              />
            </div>

          </div>


          {/* Trip Type */}
          <div className="form-group">

            <label>Trip Type *</label>

            <select
              name="tripType"
              value={trip.tripType}
              onChange={handleChange}
            >
              <option value="">
                Select trip type
              </option>

              <option value="Solo">Solo</option>
              <option value="Friends">Friends</option>
              <option value="Family">Family</option>
              <option value="Couple">Couple</option>
              <option value="Group">Group</option>
            </select>

          </div>


          {/* Travel Mode */}
          <div className="form-group">

            <label>Travel Mode *</label>

            <select
              name="travelMode"
              value={trip.travelMode}
              onChange={handleChange}
            >
              <option value="">
                Select travel mode
              </option>

              <option value="Train">Train</option>
              <option value="Bus">Bus</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Flight">Flight</option>
              <option value="Other">Other</option>
            </select>

          </div>


          {/* Description */}
          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              value={trip.description}
              onChange={handleChange}
              placeholder="Enter trip description (optional)"
              rows="4"
            />

          </div>


          {/* Buttons */}
          <div className="form-buttons">

            <button
              type="submit"
              className="create-btn"
            >
              Create Trip
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateTrip;