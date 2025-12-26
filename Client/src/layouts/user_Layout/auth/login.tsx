// pages/user/UserLogin.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from '../../../Api/api';
import { AxiosError } from "axios";
interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: object;
  token?: string;
}

const UserLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);




  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post<LoginResponse>('/auth/user/login', data);
      if (response.status === 200) {
        toast.success(response.data.message || 'Login successfully!', {
          style: { background: 'white', color: 'green' },
        });
        // Save token if needed
        localStorage.setItem('user_token', response.data.token || '');
        localStorage.setItem("user_auth", JSON.stringify({
          role: "user",
          user: response.data.user || ''
        }));
        // setTimeout(() => {
          navigate('/'); // Change to your user dashboard route
        // }, 1000);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Login failed.');
      } else {
        toast.error('Login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>


   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
  {/* Top Buttons */}
  <div className="flex gap-4 mb-10">
    <button
      onClick={() => navigate("/admin/login")}
      className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
    >
      Login as Admin
    </button>

    <button
      onClick={() => navigate("/restaurant/login")}
      className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
    >
      Login as Restaurant Owner
    </button>
  </div>

  {/* User Login Form */}
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
  >
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      User Login
    </h2>

    {/* Email */}
    <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
      Email
    </label>
    <input
      id="email"
      type="email"
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      })}
      className={`w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        errors.email ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>}

    {/* Password */}
    <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
      Password
    </label>
    <input
      id="password"
      type="password"
      {...register("password", { required: "Password is required" })}
      className={`w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        errors.password ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}

    <button
      type="submit"
      disabled={loading}
      className={`w-full p-2 rounded text-white font-semibold transition ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    <p className="mt-4 text-center text-gray-600">
      Don't have an account?{" "}
      <Link to="/signup" className="text-blue-600 hover:underline">
        Signup
      </Link>
    </p>
  </form>
</div>


    </>
  );
};

export default UserLogin;
