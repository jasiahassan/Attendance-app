import SideBar from "../components/SideBar";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import LogOut from "../components/LogOut";
import axios from "axios";
import { url } from "../BaseUrl/Url";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast/headless";
import { ShimmerTable } from "react-shimmer-effects";
export default function ManageRoles() {
  const [logout, setLogout] = useState(false);
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const btnref = useRef();
  const token = localStorage.getItem("token");
  const handleDropDown = () => {
    axios
      .get(
        `${url}/roles/getRoles`,

        {
          headers: {
            Authorization: "Bearer " + token,
            // "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data.data.roles);
        setRoles(resp.data.data.roles);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleDropDown();
  }, []);

  useEffect(() => {
    const closeDropDown = (e) => {
      // console.log(btnref.current);
      if (btnref.current && !btnref.current.contains(e.target)) {
        setLogout(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${url}/roles/createRole`,
        {
          role: newRole,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        setNewRole("");
        toast.success("Sucessfully created");
        handleDropDown();
        // console.log(resp.data.data.role);
        // setRoles([...roles, resp?.data?.data?.role]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  //   console.log(newRole);
  return (
    <div className="flex overflow-hidden h-screen">
      <SideBar />
      <div className="w-full overflow-auto">
        <div className="md:h-20 h-16 px-8 flex justify-end items-center bg-purple-500 border-purple-500">
          <div className="relative">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/257981384_3004176593182670_5671056491270256252_n%20(1).jpg_9645.jpg?alt=media&token=ba235831-ea9d-4293-ac45-69658f5135bb"
              alt=""
              className="w-12 cursor-pointer rounded-full"
              onClick={() => setLogout(!logout)}
              ref={btnref}
            />
            {logout && <LogOut />}
          </div>
        </div>
        <div className="py-8 md:px-12 px-4">
          <div className="h-auto  md:px-12 md:py-8 py-2 md:shadow-xl border rounded-xl flex flex-col gap-y-7 p-6 ">
            <h1 className="text-3xl text-purple-500 font-medium mb-8">
              Manage Roles
            </h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="border shadow-xl p-6 h-[16rem]">
                <h1 className="text-2xl font-medium mb-6">Add New Role</h1>
                <label
                  htmlFor=""
                  className="block font-medium text-gray-700 text-lg mb-1"
                >
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRole}
                  className="border w-full px-3 py-2 focus:outline-2 focus:outline-purple-500 rounded-md mb-6"
                  onChange={(e) => setNewRole(e.target.value)}
                />
                <button
                  className="border bg-purple-500 px-2.5 py-1 rounded-lg font-medium text-white text-lg hover:bg-purple-800"
                  onClick={handleSubmit}
                >
                  Add Role
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-medium mb-4">List of Roles</h1>
                {isloading ? (
                  <div className="w-full">
                    <ShimmerTable row={4} col={3} />;
                  </div>
                ) : (
                  <table className="mb-4  w-full rounded-md ">
                    <thead className="border text-left">
                      <tr className="text-neutral-500 text-sm font-semibold">
                        <th className="py-5 pl-10">S.NO</th>
                        <th>ROLE TYPE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="w-full text-neutral-800">
                      {roles.map((item, i) => (
                        <tr key={item?._id} className="border">
                          <td className="py-5 pl-10 font-medium">{i + 1}</td>
                          <td className="font-medium">{item?.role}</td>
                          <td className="pl-2">
                            <Link to={`/roles/updateRole/${item._id}`}>
                              <FaUserEdit
                                className="inline text-xl text-blue-500/70 cursor-pointer mr-2"
                                //   onClick={() => handleEdit(item._id)}
                              />
                            </Link>
                            <Link to={`/roles/deleteRole/${item._id}`}>
                              {" "}
                              <MdDeleteOutline className="text-xl text-red-500 inline" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
