import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import Expenses from "./pages/Expences";
import SplitMoney from "./pages/SplitMoney";

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

        <Route path="/split-money" element={<SplitMoney />} />

      </Routes>
    </>
  );
}

export default App;