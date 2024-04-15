import { RxCross2 } from "react-icons/rx";
export default function Modal({ handleDelete, setIsDeleted }) {
  const handleCancel = () => {
    setIsDeleted(false);
  };

  return (
    <>
      <div
        className="fixed  flex items-center justify-center top-0 left-0 bg-black/70 w-full h-full "
        onClick={handleCancel}
      ></div>
      <div className="absolute  w-[30rem] px-10 py-12 bg-white border rounded-xl h-auto flex flex-col justify-center items-center gap-y-8  left-[38%] top-[39%]">
        <RxCross2
          className="absolute top-[4%] left-[93%] text-2xl text-gray-600 cursor-pointer"
          onClick={handleCancel}
        />
        <p className="text-lg">Are you sure you want to delete this user?</p>
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
        {/* <img
          src="src/assets/Union.svg"
          alt=""
          className="absolute top-4 left-[90%] cursor-pointer"
          // onClick={handleClick}
        />
        <h1
          className={
            isPreEclampsia >= 600
              ? "text-[#DA3F3F] text-2xl font-bold text-center mt-3}"
              : "text-green-600 text-2xl font-bold text-center mt-3"
          }
        >
          {para}
        </h1>
        <button
          className="border border-[#A3A3A3] rounded-lg font-bold text-[#6D6D6D] py-2 px-6 mr-4 shadow"
          onClick={() => setNewTest(false)}
        >
          Back to Home
        </button> */}
      </div>
    </>
  );
}
