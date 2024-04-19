import SideBar from "../../components/SideBar";
import { RxCross2 } from "react-icons/rx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../BaseUrl/Url";
import toast from "react-hot-toast";
export default function DeleteRole() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const handleCancel = () => {
    navigate("/roles");
  };
  const handleDelete = () => {
    axios
      .delete(`${url}/roles/deleteRole/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          // "Content-Type": "application/json",
          // "User-Agent": navigator.userAgent,
        },
      })
      .then((resp) => {
        console.log(resp);
        toast.success("Deleted Sucessfully!");
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
      <div className="absolute  w-[30rem] px-10 py-12 bg-white border rounded-xl h-auto flex flex-col justify-center items-center gap-y-8  left-[38%] top-[39%]">
        <RxCross2
          className="absolute top-[4%] left-[93%] text-2xl text-gray-600 cursor-pointer"
          onClick={handleCancel}
        />
        <p className="text-lg">Are you sure you want to delete this role?</p>
        <div className="flex items-center gap-x-4">
          <button
            className="border text-gray-600 py-1.5 px-3 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="border text-white bg-purple-500 font-medium py-1.5 px-6 rounded-md"
            onClick={handleDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
}
