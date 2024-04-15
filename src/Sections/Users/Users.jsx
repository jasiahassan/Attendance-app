import { useEffect, useState } from "react";
import { url } from "../../BaseUrl/Url";
import axios from "axios";
import Modal from "../../components/Modal";
import ProfileModal from "../../components/ProfileModal";
// import { Navigate } from "react-router-dom";
import { LuUserPlus2 } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlinePersonAddDisabled } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";

export default function Users({ setIsEdited, setEditedUser }) {
  const [data, setData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState([]);
  const [isloading, setIsLoading] = useState(true);

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
        setUser(resp.data.data.users);
        setIsLoading(false);
        setIsEdited(true);
      });
  };

  const fetchData = async (currentPage) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${url}/users/getAllUsers/?page=${currentPage}&search=${searchData}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          // "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    let realData = data.data.users;
    // console.log(data.data);
    const totalCount = data.data.totalCount;
    console.log(totalCount);
    setPageCount(Math.ceil(totalCount / 4));
    setIsLoading(false);
    console.log(realData);
    setData(realData);
    return realData;
  };
  // fetchData(1);
  useEffect(() => {
    fetchData(1);
  }, [searchData]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const commentsFromServer = await fetchData(currentPage);

    setData(commentsFromServer);
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

  const handleShowProfile = (id) => {
    setShowProfile(true);
    getUser(id);
    console.log(id);
  };

  // const handleEdit = (id) => {
  //   setIsEdited(true);
  //   // setAddUser(true);
  //   console.log(id);
  //   getUser(id);
  // };
  const handleDelete = (id) => {
    setIsDeleted(!isDeleted);
    console.log("clicked");
    deleteData(id);
  };
  // if(isEdited){
  //   return <Navigate />
  // }
  // console.log(data[6]?.userId?.active);

  const customPreviousLabel = (
    <button className="flex items-center gap-x-2 ">
      <FaArrowLeftLong />
      {/* <img src="src/assets/arrow-left.svg" alt="arrow-left" /> */}
      <span className="hidden md:block">Previous</span>
    </button>
  );
  const customNextLabel = (
    <button className="flex items-center gap-x-2 ">
      <span className="hidden md:block">Next </span>
      <FaArrowRightLong />
      {/* <img src="src/assets/arrow-right.svg" alt="arrow-right" /> */}
    </button>
  );

  console.log(searchData);

  return (
    <div className="px-8 py-4">
      <div className="flex items-center justify-end mb-6 gap-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border-2 py-2 px-3 rounded-md focus:outline-purple-500 pl-9"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <CiSearch className="absolute text-2xl top-2.5 left-2 text-purple-500" />
        </div>
        <Link to={"/users/addUser"}>
          <button
            className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium"
            // onClick={() => setAddUser(true)}
          >
            <LuUserPlus2 className="text-2xl" />

            {/* Add User */}
          </button>
        </Link>
      </div>
      <div className="w-full  overflow-x-auto rounded-md">
        {isloading ? (
          <div className="w-full">
            <ShimmerTable row={5} col={5} />;
          </div>
        ) : (
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
                  <tr
                    key={item._id}
                    className={
                      item?.userId?.active
                        ? "border cursor-pointer hover:bg-gray-300/30"
                        : "border bg-red-500/20 "
                    }
                    onClick={() => handleShowProfile(item._id)}
                  >
                    <td className="py-5 pl-10">
                      <div className="flex items-center gap-x-4">
                        <img
                          src={item.image}
                          alt="img"
                          className="rounded-full w-12 h-12 object-cover"
                        />
                        {item.firstName} {item.lastName}
                      </div>
                    </td>
                    <td>{item.userId?.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.address}</td>
                    <td className="">
                      {item?.userId?.active ? (
                        <div>
                          <Link to={`/users/updateUser/${item._id}`}>
                            <FaUserEdit
                              className="inline mr-1.5 text-xl text-blue-500/70 cursor-pointer"
                              // onClick={() => handleEdit(item._id)}
                            />
                          </Link>
                          <MdDeleteOutline
                            className="inline text-xl text-red-500/70 cursor-pointer"
                            onClick={() => handleDelete(item?.userId?._id)}
                          />
                        </div>
                      ) : (
                        <MdOutlinePersonAddDisabled className="text-2xl text-red-500" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className="flex py-8 items-center justify-end ">
          <ReactPaginate
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex  items-center justify-center"
            previousLabel={customPreviousLabel}
            nextLabel={customNextLabel}
            pageLinkClassName="text-gray-500"
            pageClassName="w-8 h-8 text-center mx-0.5"
            previousClassName="border border-gray-300 rounded-lg font-bold text-gray-700 py-2 px-4 mr-6 flex items-center gap-x-2 shadow order-1 sm:ml-16"
            nextClassName="border border-gray-300 rounded-lg font-bold text-gray-700 py-2 px-4 mr-4 flex items-center gap-x-2 shadow order-2"
            breakClassName="py-2 px-3"
            breakLinkClassName="text-gray-500"
            activeClassName="bg-[#F9F5FF] rounded"
            activeLinkClassName="text-[#7F56D9]"
          />
        </div>
      </div>
      {isDeleted && (
        <Modal handleDelete={handleDelete} setIsDeleted={setIsDeleted} />
      )}
      {showProfile && (
        <ProfileModal
          setShowProfile={setShowProfile}
          user={user}
          isloading={isloading}
        />
      )}
    </div>
  );
}
