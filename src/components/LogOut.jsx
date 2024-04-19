import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("helo");
  };
  return (
    <div className="absolute px-4 py-4  border rounded-lg bg-white z-20 w-36 right-0 top-16 cursor-pointer shadow-md">
      <div className="border-t w-5 h-5 absolute bottom-11 left-24 rotate-45 bg-white rounded"></div>

      <button onClick={handleLogout} className="text-neutral-800">
        Log Out
      </button>
    </div>
  );
};

export default LogOut;
