import axios from "axios";
import { url } from "../../BaseUrl/Url";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogOut from "../../components/LogOut";
import SideBar from "../../components/SideBar";
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
  const [selectedRole, setSelectedRole] = useState("");
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
    <div className="flex overflow-hidden h-screen">
      {/* Sidebar component */}
      <SideBar />

      <div className="w-full overflow-auto">
        <div className="md:h-20 h-16 px-4 md:px-8 flex justify-end items-center bg-purple-500">
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

        <div className="p-4 md:p-8">
          <div className="border rounded-xl h-full p-4 md:p-5 shadow-xl">
            <div className="px-4 md:px-8">
              <div className="flex sm:flex-row flex-col-reverse sm:items-center justify-between mb-4 md:mb-6">
                <p className="text-sm py-4 md:py-6 text-gray-500">
                  <Link to="/users" className="hover:underline">
                    Users
                  </Link>
                  <span> &gt; </span>
                  <a href="" className="text-black">
                    Add User
                  </a>
                </p>
                <Link to="/users">
                  <button className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium">
                    <FaArrowLeft className="text-xl" />
                  </button>
                </Link>
              </div>

              <form action="" onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 sm:gap-y-16 mb-16">
                  {[
                    {
                      label: "First Name",
                      name: "firstName",
                      value: userData.firstName,
                    },
                    {
                      label: "Last Name",
                      name: "lastName",
                      value: userData.lastName,
                    },
                    {
                      label: "Contact Number",
                      name: "phoneNumber",
                      value: userData.phoneNumber,
                    },
                    {
                      label: "Role",
                      name: "roleId",
                      value: selectedRole,
                      type: "select",
                      options: [
                        { value: "", label: "Select Role...", disabled: true },
                        ...roles.map((role) => ({
                          value: role._id,
                          label: role.role,
                        })),
                      ],
                      onChange: (e) => {
                        const roleId = e.target.value;
                        setUserData((prevState) => ({
                          ...prevState,
                          roleId: roleId,
                        }));
                        setSelectedRole(roleId);
                      },
                    },
                    { label: "Email", name: "email", value: userData.email },
                    {
                      label: "Address",
                      name: "address",
                      value: userData.address,
                    },
                    {
                      label: "Upload Photo",
                      name: "image",
                      type: "file",
                      onChange: handleSelectFile,
                    },
                    {
                      label: "Password",
                      name: "password",
                      value: userData.password,
                    },
                  ].map(
                    ({
                      label,
                      name,
                      type = "text",
                      onChange,
                      value,
                      options,
                    }) => (
                      <div key={name}>
                        <label
                          htmlFor={name}
                          className="block mb-1 font-medium text-gray-500"
                        >
                          {label}
                        </label>
                        {type === "select" ? (
                          <select
                            name={name}
                            value={value}
                            className="border-2 w-full 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] rounded-md py-2 px-3 focus:outline-purple-500"
                            onChange={onChange}
                            required
                          >
                            {options.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={type}
                            name={name}
                            value={value}
                            className="border-2 w-full 2xl:w-[20rem] md:w-[13rem] xl:w-[16rem] rounded-md py-2 px-3 focus:outline-purple-500"
                            onChange={onChange || handleChange}
                            required
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
                <button className="bg-purple-500 rounded-full px-16 py-2 text-white text-lg font-medium hover:bg-purple-800">
                  {loading ? (
                    <PulseLoader color="white" size={8} />
                  ) : (
                    <p>Submit</p>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
