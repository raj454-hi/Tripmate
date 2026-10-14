
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [trips, setTrips] = useState([]);

  // Get trips from localStorage
  useEffect(() => {
    const savedTrips =
      JSON.parse(localStorage.getItem("trips")) || [];

    setTrips(savedTrips);
  }, []);

  // Delete Trip
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (confirmDelete) {
      const updatedTrips = trips.filter(
        (trip) => trip.id !== id
      );

      setTrips(updatedTrips);

      localStorage.setItem(
        "trips",
        JSON.stringify(updatedTrips)
      );
    }
  };

  return (
    <div className="dashboard">
      <h1>My Trips</h1>

      <p className="dashboard-subtitle">
        Manage your created trips
      </p>

      {/* Total Trips */}
      <div className="total-trips">
        <h3>Total Trips</h3>
        <h2>{trips.length}</h2>
      </div>

      {/* Trip Cards */}
      {trips.length === 0 ? (
        <div className="no-trips">
          <h2>No Trips Created Yet</h2>
          <p>Create your first trip to see it here.</p>
        </div>
      ) : (
        <div className="trip-list">
          {trips.map((trip) => (
            <div className="trip-card" key={trip.id}>
              <h2>📍 {trip.destination}</h2>

              <div className="trip-info">
                <p>
                  <strong>Start Date:</strong>
                  <br />
                  {trip.startDate}
                </p>

                <p>
                  <strong>Return Date:</strong>
                  <br />
                  {trip.returnDate}
                </p>

                <p>
                  <strong>Members:</strong>
                  <br />
                  {trip.members}
                </p>

                <p>
                  <strong>Budget:</strong>
                  <br />
                  ₹{trip.budget}
                </p>

                <p>
                  <strong>Trip Type:</strong>
                  <br />
                  {trip.tripType}
                </p>

                <p>
                  <strong>Travel Mode:</strong>
                  <br />
                  {trip.travelMode}
                </p>
              </div>

              {trip.description && (
                <p className="description">
                  <strong>Description:</strong>
                  <br />
                  {trip.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="trip-actions">
                <button className="view-btn">
                  View Trip
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(trip.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
