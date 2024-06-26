import SideBar from "../../components/SideBar";
import LogOut from "../../components/LogOut";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { url } from "../../BaseUrl/Url";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { ShimmerCategoryItem } from "react-shimmer-effects";
export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [logout, setLogout] = useState(false);
  const { id } = useParams();

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

  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${url}/users/getAllUsers/?_id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        setIsLoading(false);
        console.log(resp.data.data.users);
        setUserData(resp.data.data.users);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [id, token]);
  return (
    <div>
      <div className="flex overflow-hidden h-screen">
        <SideBar />
        <div className="w-full overflow-auto">
          <div className="md:h-20 h-16 px-8 flex justify-end items-center  bg-purple-500 ">
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
          <div className="p-8 px-12">
            <div className="border rounded-xl h-full p-5 shadow-xl pb-16">
              <div className="px-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm py-6 text-gray-500 ">
                    <Link to="/users" className="hover:underline">
                      Users
                    </Link>
                    <span> &gt; </span>
                    <a href="" className="text-black">
                      User Profile
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

                {isLoading ? (
                  <ShimmerCategoryItem
                    hasImage
                    imageType="thumbnail"
                    imageWidth={300}
                    imageHeight={380}
                    text
                  />
                ) : (
                  userData.map((item) => {
                    return (
                      <div
                        className="flex border rounded-md shadow-xl"
                        key={item._id}
                      >
                        <div className="px-6 py-12  bg-gradient-to-t from-purple-500 to-purple-200 flex flex-col gap-y-3 items-center w-[45%]">
                          <img
                            src={item.image}
                            alt=""
                            className="w-56 h-56 object-cover rounded-full"
                          />
                          <h1 className="text-xl font-medium text-white">
                            {item.firstName} {item.lastName}
                          </h1>
                          <h3 className="font-medium text-white">
                            {item.userId.roleId.role}
                          </h3>
                          <Link to={`/users/updateUser/${item._id}`}>
                            <FaUserEdit className="text-xl text-white" />
                          </Link>
                        </div>
                        <div className="py-12 px-7 w-full ">
                          <h1 className="py-2 border-b font-medium text-2xl text-gray-700">
                            INFORMATION
                          </h1>
                          <div className="grid grid-cols-2 gap-y-8 py-8">
                            <div>
                              <h1 className="text-xl font-medium">Name</h1>
                              <h4 className="font-medium text-gray-400 text-lg">
                                {item.firstName} {item.lastName}
                              </h4>
                            </div>
                            <div>
                              <h1 className="text-xl font-medium">Email</h1>
                              <h4 className="font-medium text-gray-400 text-lg">
                                {item.userId.email}
                              </h4>
                            </div>
                            <div>
                              <h1 className="text-xl font-medium">Contact</h1>
                              <h4 className="font-medium text-gray-400 text-lg">
                                {item.phoneNumber}
                              </h4>
                            </div>
                            <div>
                              <h1 className="text-xl font-medium">Address</h1>
                              <h4 className="font-medium text-gray-400 text-lg">
                                {item.address}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
