
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const handleCreateTrip = () => {
    navigate("/create-trip");
  };

  return (
    <div className="home">

      <div className="home-content">

        <h1>Plan Your Trip With TripMate</h1>

        <p>
          Plan your trips, manage your travel details,
          and enjoy your journey with ease.
        </p>

        <button onClick={handleCreateTrip}>
          Create Trip
        </button>

      </div>

    </div>
  );
}

export default Home;
