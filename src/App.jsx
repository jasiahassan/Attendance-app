import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
// import Employees from "./Pages/Employees";
// import SideBar from "./Sections/SideBar";
import UserDetails from "./Pages/UserDetails";
import Leaves from "./Pages/Leaves";
import UpdateUser from "./Sections/Users/UpdateUser";
import AddUser from "./Sections/Users/AddUser";
import PrivateRoutes from "./Router/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            {/* <Route path="/employees" element={<Employees />} /> */}
            <Route path="/users" element={<UserDetails />} />
            <Route path="/users/addUser" element={<AddUser />} />
            <Route path="/users/updateUser/:id" element={<UpdateUser />} />
            <Route path="/leaves" element={<Leaves />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
