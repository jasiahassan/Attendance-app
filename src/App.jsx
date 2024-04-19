import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import Leaves from "./Pages/Leaves";
import ManageRoles from "./Pages/ManageRoles";
import Settings from "./Pages/Settings";
import UpdateAttendance from "./Sections/Attendance/UpdateAttendance";
import UserProfile from "./Sections/Users/UserProfile";
import Users from "./Pages/Users";
import UpdateUser from "./Sections/Users/UpdateUser";
import AddUser from "./Sections/Users/AddUser";
import DeleteModal from "./Sections/Users/DeleteModal";
import UpdateRole from "./Sections/Roles/UpdateRole";
import DeleteRole from "./Sections/Roles/DeleteRole";
import PrivateRoutes from "./Router/PrivateRoutes";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route
              path="/attendance/updateAttendance/:id"
              element={<UpdateAttendance />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/userProfile/:id" element={<UserProfile />} />
            <Route path="/users/addUser" element={<AddUser />} />
            <Route path="/users/updateUser/:id" element={<UpdateUser />} />
            <Route path="/users/deleteUser/:id" element={<DeleteModal />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/roles" element={<ManageRoles />} />
            <Route path="/roles/updateRole/:id" element={<UpdateRole />} />
            <Route path="/roles/deleteRole/:id" element={<DeleteRole />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
