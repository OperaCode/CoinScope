import "./App.css";
import Landing from "./pages/Landing";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import PortfolioTracker from "./components/PortfolioTracker";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<PortfolioTracker />} />
      </Routes>
    </>
  );
}

export default App;
