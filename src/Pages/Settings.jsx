import SideBar from "../components/SideBar";
import LogOut from "../components/LogOut";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { url } from "../BaseUrl/Url";
import { PulseLoader } from "react-spinners";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
export default function Settings() {
  const [logout, setLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    distance: "",
  });
  const [passwordData, setPasswordData] = useState({
    passwordCurrent: "",
    password: "",
    // confirmNewPassword: "",
  });
  const [id, setId] = useState("");
  const btnref = useRef();
  const inputRef = useRef(null);
  const token = localStorage.getItem("token");

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

  const getLocation = () => {
    axios
      .get(`${url}/location/getLocation`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data.data.location);
        setLocationData(resp.data.data.location[0]);
        setId(resp.data.data.location[0]._id);
      });
  };
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!isDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  const postLocationData = () => {
    axios
      .patch(`${url}/location/updateLocation/${id}`, locationData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setLocationData({
          latitude: "",
          longitude: "",
          distance: "",
        });
        getLocation();
        setIsDisabled(true);
        toast.success("Location updated successfully");
      })
      .then((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const postPasswordData = () => {
    axios
      .patch(`${url}/users/UpdatePassword`, passwordData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setLoading(false);
      });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    postLocationData();
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    postPasswordData();
  };
  const handleEdit = () => {
    setIsDisabled(false);
  };
  // console.log(locationData);
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
          <div className="h-auto  md:px-12 md:py-8 py-2 md:shadow-xl border rounded-xl flex flex-col gap-y-7 p-6">
            <h1 className="text-3xl text-purple-500 font-medium mb-8">
              Settings
            </h1>
            <div className="w-full lg:grid grid-cols-2 gap-10">
              <div className="  mb-8 lg:mb-0">
                <h1 className="text-2xl mb-4 font-medium flex items-center gap-x-4">
                  LOCATION CONTROL FORM{" "}
                  {isDisabled && (
                    <FiEdit className=" text-blue-500" onClick={handleEdit} />
                  )}
                </h1>
                <form action="" onSubmit={handleLocationSubmit}>
                  <div className="grid grid-cols-1 gap-12 mb-8">
                    <div>
                      <label htmlFor="latitude" className="text-lg block">
                        Latitude
                      </label>
                      <input
                        type="text"
                        name="latitude"
                        value={locationData.latitude}
                        className="border-2 w-full xl:w-[20rem]  rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleLocationChange}
                        ref={inputRef}
                        disabled={isDisabled}
                      />
                    </div>
                    <div>
                      <label htmlFor="longitude" className="text-lg block">
                        Longitude
                      </label>
                      <input
                        type="text"
                        name="longitude"
                        value={locationData.longitude}
                        className="border-2 w-full xl:w-[20rem]  rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleLocationChange}
                        disabled={isDisabled}
                      />
                    </div>
                    <div>
                      <label htmlFor="distance" className="text-lg block">
                        Distance(m)
                      </label>
                      <input
                        type="text"
                        name="distance"
                        value={locationData.distance}
                        className="border-2 w-full xl:w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handleLocationChange}
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                  {isDisabled || (
                    <button className="bg-purple-500 rounded-full px-16 py-2 text-white text-lg font-medium hover:bg-purple-800">
                      Update
                    </button>
                  )}
                </form>
              </div>
              <div className="">
                <h1 className="text-2xl mb-4 font-medium">PASSWORD UPDATE</h1>
                <form action="" onSubmit={handlePasswordSubmit}>
                  <div className="grid grid-cols-1 gap-12 mb-8">
                    <div>
                      <label htmlFor="" className="text-lg block">
                        Current Password
                      </label>
                      <input
                        type="text"
                        name="passwordCurrent"
                        value={passwordData.passwordCurrent}
                        className="border-2 w-full xl:w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-lg block">
                        New Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        value={passwordData.password}
                        className="border-2 w-full xl:w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handlePasswordChange}
                      />
                    </div>
                    {/* <div>
                      <label htmlFor="" className="text-lg block">
                        Confirm New Password
                      </label>
                      <input
                        type="text"
                        name="confirmNewPassword"
                        value={passwordData.confirmNewPassword}
                        className="border-2 w-full xl:w-[20rem] rounded-md py-2 px-3 focus:outline-purple-500"
                        onChange={handlePasswordChange}
                      />
                    </div> */}
                  </div>

                  <button className="bg-purple-500 rounded-full px-16 py-2 text-white text-lg font-medium hover:bg-purple-800">
                    {loading && <PulseLoader color="white" size={8} />}
                    Submit
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
