import axios from "axios";
import { url } from "../../BaseUrl/Url";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa6";
import SideBar from "../SideBar";
import { Link, useParams } from "react-router-dom";

export default function UpdateUser() {
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
  const { id } = useParams();

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${url}/users/getAllUsers/?_id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        console.log(resp.data.data.users[0]);
        setUserData({
          ...userData,
          firstName: resp.data.data.users[0].firstName,
          lastName: resp.data.data.users[0].lastName,
          phoneNumber: resp.data.data.users[0].phoneNumber,
          roleId: resp.data.data.users[0].roleId,
          email: resp.data.data.users[0].userId.email,
          address: resp.data.data.users[0].address,
          image: resp.data.data.users[0].image,
          //   email: resp.data.data.users[0].email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  // console.log(editedUser[0]?.firstName)

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
      });
  };

  useEffect(() => {
    handleDropDown();
  }, []);

  //   const token = localStorage.getItem("token");
  const updateUser = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .patch(`${url}/users/updateUser/${id}`, userData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
    // updateUser();
  };

  // const updateUser = () => {
  //   const token = localStorage.getItem("token");
  //   console.log(userData);
  //   axios
  //     .patch(`${url}/users/updateUser/${editedUser[0]?._id}`, userData, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "multipart/form-data",
  //         // "Content-Type": "application/json",
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };

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
            <img
              src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/user-icon.png_616f.png?alt=media&token=118f35cb-f815-4276-8b11-33b01faa2d5b"
              alt=""
              className="w-12 cursor-pointer"
            />
          </div>
          <div className="p-8 px-12">
            <div className="border rounded-xl h-full p-5 shadow-xl">
              <div className="px-8">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm py-6 text-gray-500 ">
                    <a href="" className="hover:underline">
                      Users
                    </a>
                    <span> &gt; </span>
                    <a href="" className="text-black">
                      Update User
                    </a>
                  </p>
                  <Link to={"/users"}>
                    <button className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium">
                      <FaArrowLeft className="text-xl" />
                    </button>
                  </Link>
                </div>

                <form action="" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-8 gap-y-16 mb-16">
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
                        value={userData?.firstName}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
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
                        value={userData?.lastName}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
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
                        value={userData?.phoneNumber}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
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
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        name="roleId"
                        value={userData?.roleId}
                        // onClick={handleDropDown}
                        onChange={handleChange}
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
                        value={userData?.email}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
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
                        value={userData?.address}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
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
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleSelectFile}
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
                        // value={userData.password}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button className="bg-purple-500 rounded-full px-20 py-2 text-white text-lg font-medium hover:bg-purple-800">
                    {loading ? (
                      <PulseLoader color="white" size={8} />
                    ) : (
                      <p>Update</p>
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
