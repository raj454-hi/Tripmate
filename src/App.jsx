import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import Expenses from "./pages/Expences";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-trip"
          element={<CreateTrip />}
        />


        <Route path="/expenses" element={<Expenses />} />

      </Routes>
    </>
  );
}

export default App;