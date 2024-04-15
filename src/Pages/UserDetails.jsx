import { useState, useRef, useEffect } from "react";
import SideBar from "../Sections/SideBar";
import AddUser from "../Sections/Users/AddUser";
import Users from "../Sections/Users/Users";
import LogOut from "../Sections/LogOut";
import { Routes, Route } from "react-router-dom";

export default function UserDetails() {
  // const [addUser, setAddUser] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [editedUser, setEditedUser] = useState([]);
  const [logout, setLogout] = useState(false);
  const btnref = useRef();

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
  // const [roles, setRoles] = useState([]);
  // const [userData, setUserData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   phoneNumber: "",
  //   roleId: "",
  //   email: "",
  //   address: "",
  //   image: null,
  //   password: "",
  // });
  // const [loading, setLoading] = useState(false);
  // const handleDropDown = () => {
  //   axios
  //     .post(
  //       `${url}/users/getRoles`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp.data.data.roles);
  //       setRoles(resp.data.data.roles);
  //     });
  // };

  // const postApi = () => {
  //   setLoading(true);
  //   const token = localStorage.getItem("token");
  //   axios
  //     .post(`${url}/users/adduser`, userData, {
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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   postApi();
  // };

  // const handleChange = (e) => {
  //   console.log(e);
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  //   console.log(userData);
  // };
  // const handleSelectFile = (e) => {
  //   const file = e.target.files[0];
  //   setUserData({ ...userData, image: file });
  // };

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
              <Users setIsEdited={setIsEdited} setEditedUser={setEditedUser} />
              {/* <Routes>
                <Route path="/users/addUser" element={<AddUser />} /> */}

              {/* {addUser ? (
                <AddUser
                // setAddUser={setAddUser}
                // isEdited={isEdited}
                // editedUser={editedUser}
                // setIsEdited={setIsEdited}
                />
              ) : (
                <Users
                // setAddUser={setAddUser}
                // setIsEdited={setIsEdited}
                // setEditedUser={setEditedUser}
                />
              )} */}
              {/* </Routes> */}

              {/* <div className="px-8">
                <p className="text-sm py-6 text-gray-500 mb-6">
                  <a href="" className="hover:underline">
                    Users
                  </a>
                  <span> &gt; </span>
                  <a href="" className="text-black">
                    Add User
                  </a>
                </p>

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
                        value={userData.firstName}
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
                        value={userData.lastName}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
                      />
                    </div>
                
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
                        value={userData.roleId}
                        onClick={handleDropDown}
                        onChange={handleChange}
                      >
                       
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
                        value={userData.address}
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
                        value={userData.password}
                        className="border-2 w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleChange}
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}