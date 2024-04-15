import axios from "axios";
import { Navigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";
import { url } from "../BaseUrl/Url";
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const postApi = () => {
    setLoading(true);
    axios.post(`${url}/users/login`, data).then((resp) => {
      console.log(resp.data);
      setUser(resp.data);
      const token = resp.data.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postApi();
  };
  console.log(data);
  const token = localStorage.getItem("token");
  if (user && token) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="bg-purple-800 flex justify-center items-center h-full max-h-full min-h-screen">
      <div className="flex bg-white rounded-2xl  shadow-lg w-[60rem]">
        <div className="p-6 sm:flex hidden flex-col gap-y-8 bg-purple-500 rounded-l-2xl md:w-[55%] w-[50%]">
          {/* <div className="mb-4">
            <div className="relative w-full overflow-hidden bg-cover bg-[50%] bg-no-repeat">
              <img src="src/assets/logoraybit-new.png" className="w-28" />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-28 overflow-hidden bg-white bg-fixed opacity-60"></div>
            </div>
          </div> */}
          <img
            src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/logoraybit-new.png_2460.png?alt=media&token=67f2abbc-8416-4cf1-a19c-9944bbf12699"
            alt="Raybit Technologies"
            className="w-36 brightness-0"
          />

          <div className="flex justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/attendance-app-90eb5.appspot.com/o/software-engineer.png_bd37.png?alt=media&token=48db0eb4-a6eb-4be9-8895-f67239775cb1"
              alt="Software Engineer"
              className="w-[25rem]"
            />
          </div>
          <p className="text-xs  text-center font-medium text-white/70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non unde
            magnam molestiae consequuntur ipsam nemo fugiat deleniti
            voluptatibus nulla maiores.
          </p>
        </div>
        <div className="flex flex-col p-6 gap-y-12 px-8 md:w-[40%] sm:w-[50%] w-full">
          <h1 className="text-left text-4xl font-bold py-6 text-gray-800">
            Welcome Back!
          </h1>
          <form
            action=""
            className="flex flex-col w-full"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-medium mb-4">Login to your account</h3>
            <label htmlFor="" className="mb-1 text-gray-500">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              className="px-3 py-2 border outline-purple-500 rounded-lg mb-4 bg-transparent focus:bg-white/70"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <label htmlFor="" className="mb-1 text-gray-500">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              className="px-3 py-2 border outline-purple-500 rounded-lg mb-6 bg-transparent focus:bg-white/70"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <button className="rounded-full bg-purple-500 py-2.5 text-white font-bold hover:bg-purple-800">
              {loading ? <PulseLoader color="white" size={8} /> : <a>Login</a>}
            </button>
          </form>
          <div className="text-center cursor-pointer hover:underline text-gray-500">
            <a href="">Forget Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
