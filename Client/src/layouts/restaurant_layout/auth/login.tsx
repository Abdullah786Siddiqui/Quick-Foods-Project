// pages/admin/UserLogin.tsx
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
  restaurant: object;
  token?: string;
}

const RestaurantLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);




  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();


  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post<LoginResponse>('/auth/restaurant/login', data);
      if (response.status === 200) {
        toast.success(response.data.message || 'Login successfully!', {
          style: { background: 'white', color: 'green' },
        });
        // Save token if needed
        localStorage.setItem('restaurant_token', response.data.token || '');
        localStorage.setItem("restaurant_auth", JSON.stringify({
          role: "restaurant",
          restaurant: response.data.restaurant || ''
        }));
        // setTimeout(() => {
          navigate('/restaurant'); // Change to your restaurant dashboard route
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


      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Restaurant Login</h2>

          {/* Email */}
          <label htmlFor="email" className="block mb-2">Email</label>
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
            className={`w-full p-2 border rounded mb-2 ${errors.email ? "border-orange-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-orange-500 text-sm mb-4">{errors.email.message}</p>}

          {/* Password */}
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full p-2 border rounded mb-6 ${errors.password ? "border-orange-500" : "border-gray-300"}`}
          />
          {errors.password && <p className="text-orange-500 text-sm mb-4">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to={'/restaurant/login'} className="text-green-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RestaurantLogin;
