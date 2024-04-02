import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
// import Employees from "./Pages/Employees";
// import SideBar from "./Sections/SideBar";
import UserDetails from "./Pages/UserDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          {/* <Route path="/employees" element={<Employees />} /> */}
          <Route path="/users" element={<UserDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
