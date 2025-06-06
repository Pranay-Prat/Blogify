import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { SignupInput } from "@pranay.pratap15/blogging-common";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 
import axios from "axios";
import toast from "react-hot-toast";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  async function sendRequest(e: React.FormEvent){
    try {
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInput)
        const jwt = response.data.jwt;
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("name", response.data.name);
        navigate("/blogs");

    } catch (error) {
        toast.error(`Error while ${type === "signup" ? "signing up" : "signing in"}!"`);
        console.error("Error sending request:", error);
        
    }
  } 
  const [showPassword, setShowPassword] = useState(false); 

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-5xl font-bold font-eduqld text-center mb-4">Blogify</h1>
        <p className="text-center font-poppins text-gray-600 mb-4 mt-8">
          {type === "signup" ? "Create an account" : "Login to your account"}
        </p>

        <form className="space-y-5" onSubmit={sendRequest}>
          {type === "signup" && (
            <div>
              <label className="block font-poppins text-sm text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={postInput.name}
                onChange={(e) => setPostInput({ ...postInput, name: e.target.value })}
                placeholder="John Doe"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-poppins text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={postInput.email}
              onChange={(e) => setPostInput({ ...postInput, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-poppins text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={postInput.password}
                onChange={(e) => setPostInput({ ...postInput, password: e.target.value })}
                className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-black"
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-600" />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            
            className="w-full font-poppins bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center font-poppins text-sm text-gray-500 mt-6">
          {type === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="text-black font-poppins underline hover:text-gray-800"
          >
            {type === "signup" ? "Login" : "Create Account"}
          </Link>
        </p>
      </div>
    </div>
  );
};
