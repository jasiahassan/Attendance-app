import axios from "axios";
import { url } from "../../BaseUrl/Url";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogOut from "../LogOut";
import SideBar from "../SideBar";
import { PulseLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa6";

export default function AddUser() {
  const [roles, setRoles] = useState([]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    roleId: "",
    email: "",
    address: "",
    image: null,
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [logout, setLogout] = useState(false);
  const btnref = useRef();
  const navigate = useNavigate();

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
  // console.log(editedUser[0]?.firstName);

  const handleDropDown = () => {
    const token = localStorage.getItem("token");
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
      });
  };

  useEffect(() => {
    handleDropDown();
  }, []);

  const token = localStorage.getItem("token");
  const postApi = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .post(`${url}/users/adduser`, userData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postApi();
    // updateUser();
  };

  const handleChange = (e) => {
    // console.log(e);
    // const { name, value } = e.target;
    // setUserData({ ...userData, [name]: value });
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
    // setIsEdited(false);
  };
  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, image: file });
    // setIsEdited(false);
  };
  console.log(token);
  return (
    <div>
      <div className="flex overflow-hidden h-screen">
        <SideBar />
        <div className="w-full overflow-auto">
          <div className=" h-20 px-8 flex justify-end items-center shadow-xl bg-purple-500 ">
            <div className="relative">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/user-icon.png_616f.png?alt=media&token=118f35cb-f815-4276-8b11-33b01faa2d5b"
                alt=""
                className="w-12 cursor-pointer"
                onClick={() => setLogout(!logout)}
                ref={btnref}
              />
              {logout && <LogOut />}
            </div>
          </div>
          <div className="p-8 px-12">
            <div className="border rounded-xl h-full p-5 shadow-xl">
              <div className="px-8">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm py-6 text-gray-500 ">
                    <Link to="/users" className="hover:underline">
                      Users
                    </Link>
                    <span> &gt; </span>
                    <a href="" className="text-black">
                      Add User
                    </a>
                  </p>
                  <Link to="/users">
                    <button
                      className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium"
                      // onClick={() => setAddUser(false)}
                    >
                      <FaArrowLeft className="text-xl" />
                      {/* Go Back */}
                    </button>
                  </Link>
                </div>

                <form action="" onSubmit={handleSubmit}>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-8 sm:gap-y-16 mb-16">
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        className="border-2 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] w-full rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        className="border-2 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] w-full rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* </div> */}
                    {/* <div className="flex  items-center gap-x-16"> */}
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Contact Number
                      </label>
                      <input
                        type="number"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        className="border-2 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] w-full rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Role
                      </label>
                      <select
                        className="border-2 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] w-full rounded-md py-2 px-3 focus:outline-purple-500"
                        name="roleId"
                        value={userData.roleId}
                        // onClick={handleDropDown}
                        onChange={handleChange}
                        required
                      >
                        {/* <option value="1563ghgvdu78">Employee</option>
            <option value="ghdgf6578978">Manager</option>
            <option value="67hgjgdhfbbb">Admin</option> */}
                        {roles.map((role) => {
                          return (
                            <option
                              key={role._id}
                              value={role._id}
                              name="roleId"
                            >
                              {role.role}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* </div> */}
                    {/* <div className="flex items-center gap-x-16"> */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        className="border-2 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] w-full rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        className="border-2 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] w-full rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Upload Photo
                      </label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        id="image"
                        // value={isEdited ? editedUser?.image : userData.image}
                        className="border-2 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] w-full rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleSelectFile}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-1 font-medium text-gray-500"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        value={userData.password}
                        className="border-2 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] w-full rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <button className="bg-purple-500 rounded-full px-20 py-2 text-white text-lg font-medium hover:bg-purple-800">
                    {loading ? (
                      <PulseLoader color="white" size={8} />
                    ) : (
                      <p> Submit</p>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
