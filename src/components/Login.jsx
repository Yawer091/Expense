// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../Redux/userSlice";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `https://backendtracker-1.onrender.com/users?email=${formData.email}&password=${formData.password}`
//       );
//       if (data.length > 0) {
//         dispatch(setUser(data[0]));
//         navigate("/dashboard");
//       } else {
//         alert("Login Failed: Incorrect credentials");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert("Login Failed!");
//     }
//   };
//   return (
//     <div className="w-[40%] mx-auto shadow-lg mt-[50px] bg-slate-200 rounded-md ">
//       <h1 className=" text-center text-[36px] text-bold font-serif font-semibold">
//         LOGIN
//       </h1>
//       <div className="bg-red-300 p-[10px]">
//         <form className=" flex flex-col gap-[12px]" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="email"
//             className="p-[10px] w-[60%] m-auto"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="p-[10px] w-[60%] m-auto"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             className=" bg-blue-600 text-gray-100 w-[20%] m-auto px-[20px] py-[10px] rounded-md font-semibold hover:bg-blue-500 hover:text-gray-400"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://backendtracker-1.onrender.com/users?email=${formData.email}&password=${formData.password}`
      );
      if (data.length > 0) {
        dispatch(setUser(data[0]));
        navigate("/dashboard");
      } else {
        alert("Login Failed: Incorrect credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed!");
    }
  };

  return (
    <div className="w-[50%] mx-auto justify-center p-[20px] bg-green-300 mt-[20px]">
      <h1 className=" text-center text-[34px] font-bold text-white ">LOGIN</h1>

      <form
        className=" flex flex-col gap-[12px] P-[20px]"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="p-[10px] w-[60%] m-auto"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="p-[10px] w-[60%] m-auto"
        />
        <button
          type="submit"
          className=" bg-blue-600 text-gray-100 w-[20%] m-auto px-[20px] py-[10px] rounded-md font-semibold hover:bg-blue-500 hover:text-gray-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
