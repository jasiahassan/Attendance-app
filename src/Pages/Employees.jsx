import SideBar from "../Sections/SideBar";
export default function Employees() {
  return (
    <div>
      <div className="flex overflow-hidden h-screen">
        <SideBar />
        <div className="w-full overflow-auto">
          <div className=" h-20 px-8 flex justify-end items-center border shadow-xl bg-purple-500 border-purple-500">
            <img
              src="src/assets/user-icon.png"
              alt=""
              className="w-12 cursor-pointer"
            />
          </div>
          <div className="p-8">
            <div className="border rounded-xl h-screen">
              {/* <button onClick={postApi}>Click</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
