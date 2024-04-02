import axios from "axios";
import { url } from "../../BaseUrl/Url";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa6";

export default function AddUser({
  setAddUser,
  isEdited,
  editedUser,
  setIsEdited,
}) {
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

  console.log(editedUser[0]?.firstName);
  const handleDropDown = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${url}/users/getRoles`,

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

  const updateUser = () => {
    const token = localStorage.getItem("token");
    console.log(userData);
    axios
      .patch(`${url}/users/updateUser/${editedUser[0]?._id}`, userData, {
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

  const handleChange = (e) => {
    // console.log(e);
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
    <div className="px-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm py-6 text-gray-500 ">
          <a href="" className="hover:underline">
            Users
          </a>
          <span> &gt; </span>
          <a href="" className="text-black">
            Add User
          </a>
        </p>
        <button
          className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium"
          onClick={() => setAddUser(false)}
        >
          <FaArrowLeft className="text-xl" />
          {/* Go Back */}
        </button>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-8 gap-y-16 mb-16">
          <div>
            <label htmlFor="" className="block mb-1 font-medium text-gray-500">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={isEdited ? editedUser[0]?.firstName : userData.firstName}
              className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="block mb-1 font-medium text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={isEdited ? editedUser[0]?.lastName : userData.lastName}
              className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
              onChange={handleChange}
            />
          </div>
          {/* </div> */}
          {/* <div className="flex  items-center gap-x-16"> */}
          <div>
            <label htmlFor="" className="block mb-1 font-medium text-gray-500">
              Contact Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={
                isEdited ? editedUser[0]?.phoneNumber : userData.phoneNumber
              }
              className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="block mb-1 font-medium text-gray-500">
              Role
            </label>
            <select
              className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
              name="roleId"
              value={isEdited ? editedUser[0]?.userId : userData.roleId}
              onClick={handleDropDown}
              onChange={handleChange}
            >
              {/* <option value="1563ghgvdu78">Employee</option>
            <option value="ghdgf6578978">Manager</option>
            <option value="67hgjgdhfbbb">Admin</option> */}
              {roles.map((role) => {
                return (
                  <option key={role._id} value={role._id} name="roleId">
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
              value={isEdited ? editedUser[0]?.email : userData.email}
              className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="block mb-1 font-medium text-gray-500">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={isEdited ? editedUser[0]?.address : userData.address}
              className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="block mb-1 font-medium text-gray-500">
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
            <label htmlFor="" className="block mb-1 font-medium text-gray-500">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={isEdited ? editedUser[0]?.password : userData.password}
              className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="bg-purple-500 rounded-full px-20 py-2 text-white text-lg font-medium hover:bg-purple-800">
          {loading ? <PulseLoader color="white" size={8} /> : <p> Submit</p>}
        </button>
      </form>
    </div>
  );
}
