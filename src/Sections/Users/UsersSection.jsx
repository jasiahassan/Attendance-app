import { useEffect, useState } from "react";
import { url } from "../../BaseUrl/Url";
// import axios from "axios";
// import Modal from "../../components/Modal";
import { LuUserPlus2 } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlinePersonAddDisabled } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";
// import toast from "react-hot-toast";

export default function UsersSection() {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchData, setSearchData] = useState("");
  // const [showProfile, setShowProfile] = useState(false);

  const [isloading, setIsLoading] = useState(true);

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
    <div className="px-4 md:px-8 py-4">
      <div className="flex  flex-row items-center justify-end mb-6 gap-x-4">
        <div className="relative w-full md:w-auto ">
          <input
            type="text"
            placeholder="Search"
            className="border-2 py-2 px-3 rounded-md focus:outline-purple-500 pl-9 w-full"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <CiSearch className="absolute text-2xl top-2.5 left-2 text-purple-500" />
        </div>
        <Link to={"/users/addUser"}>
          <button className="rounded-md bg-purple-500 text-white py-2 px-3 flex items-center gap-x-2 font-medium">
            <LuUserPlus2 className="text-2xl" />
          </button>
        </Link>
      </div>
      <div className="w-full overflow-x-auto rounded-md">
        {isloading ? (
          <div className="w-full">
            <ShimmerTable row={5} col={5} />;
          </div>
        ) : (
          <table className="mb-4 min-w-[48rem] w-full rounded-md">
            <thead className="border text-left">
              <tr className="text-neutral-500 text-sm font-semibold">
                <th className="py-5 pl-10">Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Profile</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody className="w-full text-neutral-800">
              {data.map((item) => (
                <tr
                  key={item._id}
                  className={
                    item?.userId?.active ? "border" : "border bg-red-500/20 "
                  }
                >
                  <td className="py-5 pl-10">
                    <div className="flex flex-col md:flex-row  md:items-center md:gap-x-4">
                      <img
                        src={item.image}
                        alt="img"
                        className="rounded-full w-12 h-12 md:w-14 md:h-14 object-cover"
                      />
                      <span>
                        {item.firstName} {item.lastName}
                      </span>
                    </div>
                  </td>
                  <td>{item.userId?.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.address}</td>
                  <td>
                    <Link
                      to={`/users/userProfile/${item._id}`}
                      className="py-1.5 px-4 bg-green-500/20 rounded-full font-medium text-gray-500 cursor-pointer"
                    >
                      View
                    </Link>
                  </td>
                  <td className="">
                    {item?.userId?.active ? (
                      <div className="flex gap-x-2">
                        <Link to={`/users/updateUser/${item._id}`}>
                          <FaUserEdit className="inline text-xl text-blue-500/70 cursor-pointer" />
                        </Link>
                        <Link to={`/users/deleteUser/${item?.userId?._id}`}>
                          <MdDeleteOutline className="inline text-xl text-red-500/70 cursor-pointer" />
                        </Link>
                      </div>
                    ) : (
                      <MdOutlinePersonAddDisabled className="text-2xl text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex py-8 items-center justify-center md:justify-end">
          <ReactPaginate
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex items-center justify-center"
            previousLabel={customPreviousLabel}
            nextLabel={customNextLabel}
            pageLinkClassName="text-gray-500"
            pageClassName="w-8 h-8 text-center mx-0.5"
            previousClassName="border border-gray-300 rounded-lg font-bold text-gray-700 py-2 px-4 mr-6 flex items-center gap-x-2 shadow order-1 md:order-1 sm:ml-16"
            nextClassName="border border-gray-300 rounded-lg font-bold text-gray-700 py-2 px-4 mr-4 flex items-center gap-x-2 shadow order-2 md:order-2"
            breakClassName="py-2 px-3"
            breakLinkClassName="text-gray-500"
            activeClassName="bg-[#F9F5FF] rounded"
            activeLinkClassName="text-[#7F56D9]"
          />
        </div>
      </div>
    </div>
  );
}
