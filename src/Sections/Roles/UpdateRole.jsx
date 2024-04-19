import SideBar from "../../components/SideBar";
import { RxCross2 } from "react-icons/rx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../BaseUrl/Url";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function UpdateRole() {
  const [oldRole, setOldRole] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const handleCancel = () => {
    navigate("/roles");
  };

  useEffect(() => {
    axios
      .get(`${url}/roles/getRole/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        console.log(resp.data.data.role.role);
        setOldRole(resp.data.data.role.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);
  const handleUpdate = () => {
    console.log(oldRole);
    axios
      .patch(
        `${url}/roles/updateRole/${id}`,
        {
          role: oldRole,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // "User-Agent": navigator.userAgent,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        toast.success("User Updated!");
        navigate("/roles");
      });
  };

  return (
    <>
      <div>
        <div className="flex overflow-hidden h-screen">
          <SideBar />
          <div className="w-full overflow-auto">
            <div className=" h-20 px-8 flex justify-end items-center bg-purple-500 ">
              <div className="relative">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/257981384_3004176593182670_5671056491270256252_n%20(1).jpg_9645.jpg?alt=media&token=ba235831-ea9d-4293-ac45-69658f5135bb"
                  alt=""
                  className="w-12 cursor-pointer rounded-full"
                  //     onClick={() => setLogout(!logout)}
                  //     ref={btnref}
                />
                {/* // {logout && <LogOut />} */}
              </div>
            </div>
            <div className="p-8 px-12">
              <div className="border rounded-xl p-5 shadow-xl pb-16 h-screen">
                <div className="px-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // Modal */}
      <div
        className="fixed  flex items-center justify-center top-0 left-0 bg-black/70 w-full h-full "
        onClick={handleCancel}
      ></div>
      <div className="absolute  w-[30rem] px-10 py-12 bg-white border rounded-xl h-auto flex flex-col justify-center items-center gap-y-8  left-[38%] top-[30%]">
        <RxCross2
          className="absolute top-[4%] left-[93%] text-2xl text-gray-600 cursor-pointer"
          onClick={handleCancel}
        />
        <div className="border shadow-xl p-6 h-[16rem]">
          <h1 className="text-2xl font-medium mb-6">Update Role</h1>
          <label
            htmlFor=""
            className="block font-medium text-gray-700 text-lg mb-1"
          >
            Role Name
          </label>
          <input
            type="text"
            value={oldRole}
            className="border w-full px-3 py-2 focus:outline-2 focus:outline-purple-500 rounded-md mb-6"
            onChange={(e) => setOldRole(e.target.value)}
          />
          <button
            className="border bg-purple-500 px-2.5 py-1 rounded-lg font-medium text-white text-lg hover:bg-purple-800"
            onClick={handleUpdate}
          >
            Update Role
          </button>
        </div>
      </div>
    </>
  );
}
