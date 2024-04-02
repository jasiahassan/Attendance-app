import { useEffect, useState } from "react";
import { url } from "../../BaseUrl/Url";
import axios from "axios";
import Modal from "../../components/Modal";
// import { Navigate } from "react-router-dom";
import { LuUserPlus2 } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
export default function Users({ setAddUser, setIsEdited, setEditedUser }) {
  const [data, setData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    axios
      .get(`${url}/users/getAllUsers`, {
        headers: {
          Authorization: "Bearer " + token,
          // "Content-Type": "application/json",
          // "User-Agent": navigator.userAgent,
        },
      })
      .then((resp) => {
        console.log(resp.data.data.users);
        setData(resp.data.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getUser = (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`${url}/users/getAllUsers/?_id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        console.log(resp.data.data.users);
        setEditedUser(resp.data.data.users);
        setIsEdited(true);
      });
  };

  const deleteData = (id) => {
    const token = localStorage.getItem("token");
    axios.delete(`${url}/users/deleteUser/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        // "Content-Type": "application/json",
        // "User-Agent": navigator.userAgent,
      },
    });
  };
  const handleEdit = (id) => {
    setIsEdited(true);
    setAddUser(true);
    getUser(id);
  };
  const handleDelete = (id) => {
    setIsDeleted(!isDeleted);
    console.log("clicked");
    deleteData(id);
  };
  // if(isEdited){
  //   return <Navigate />
  // }
  console.log(data[1]?.userId?._id);
  return (
    <div className="px-8 py-4">
      <div className="flex items-center justify-end mb-6 gap-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border-2 py-2 px-3 rounded-md focus:outline-purple-500 pl-9"
          />
          <CiSearch className="absolute text-2xl top-2.5 left-2 text-purple-500" />
        </div>
        <button
          className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium"
          onClick={() => setAddUser(true)}
        >
          <LuUserPlus2 className="text-2xl" />
          {/* Add User */}
        </button>
      </div>
      <div className="w-full  overflow-x-auto rounded-md">
        <table className=" mb-4 min-w-[40rem] w-full rounded-md">
          <thead className="border text-left">
            <tr className="text-neutral-500 text-sm font-semibold">
              <th className="py-5 pl-10">Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className="w-full text-neutral-800">
            {data.map((item) => {
              return (
                <tr key={item._id} className="border">
                  <td className="py-5 pl-10">
                    <div className="flex items-center gap-x-4">
                      <img
                        src={item.image}
                        alt=""
                        className="rounded-full w-12"
                      />
                      {item.firstName} {item.lastName}
                    </div>
                  </td>
                  <td>{item.userId?.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.address}</td>
                  <td className="">
                    <FaUserEdit
                      className="inline mr-1.5 text-xl text-blue-500/70 cursor-pointer"
                      onClick={() => handleEdit(item._id)}
                    />
                    <MdDeleteOutline
                      className="inline text-xl text-red-500/70 cursor-pointer"
                      onClick={() => handleDelete(item?.userId?._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isDeleted && (
        <Modal handleDelete={handleDelete} setIsDeleted={setIsDeleted} />
      )}
    </div>
  );
}
