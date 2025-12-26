// pages/user/UserSignup.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import api from '../../../Api/api';
import { AxiosError } from "axios";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";

interface SignupFormInputs {
  username: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  token?: string;
}


const UserSignup = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
 


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post<SignupResponse>('/auth/user/signup', data);
      if (response.status === 201) {
        toast.success(response.data.message || 'Signup successfully!', {
          style: { background: 'white', color: 'green' },
        });
        // setTimeout(() => {
          navigate('/login');
        // }, 1000); // 1.5 seconds delay
      } else {
        toast.error('Signup failed. Please try again.');
      }


    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Signup failed.');
      } else {
        toast.error('Signup failed.');
      }
    } finally {
      setLoading(false)
    }

  };

  return (
    <>

     
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">User Signup</h2>

          {/* Username */}
          <label className="block mb-2">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className={`w-full p-2 border rounded mb-2 ${errors.username ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-4">{errors.username.message}</p>
          )}

          {/* Email */}
          <label className="block mb-2">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full p-2 border rounded mb-2 ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="block mb-2">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 3, message: "Password must be at least 3 characters" },
            })}
            className={`w-full p-2 border rounded mb-6 ${errors.password ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
          )}


          <button
            disabled={loading} 
            type="submit"
            className={`w-full p-2 rounded text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default UserSignup;
