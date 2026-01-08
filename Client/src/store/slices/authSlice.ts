import { createSlice,type  PayloadAction  } from "@reduxjs/toolkit";

type UserRole = "user" | "admin" | "delivery" | "restaurant" | null;

interface AuthState {
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
}

// authSlice.ts me add karo
export const checkAuth = () => (dispatch: any) => {
  const userToken = localStorage.getItem("user_token");
  const adminToken = localStorage.getItem("admin_token");
  const deliveryToken = localStorage.getItem("delivery_token");
  const restaurantToken = localStorage.getItem("restaurant_token");

  if (userToken) {
    dispatch(loginSuccess({ role: "user", token: userToken }));
  } else if (adminToken) {
    dispatch(loginSuccess({ role: "admin", token: adminToken }));
  } else if (deliveryToken) {
    dispatch(loginSuccess({ role: "delivery", token: deliveryToken }));
  } else if (restaurantToken) {
    dispatch(loginSuccess({ role: "restaurant", token: restaurantToken }));
  } else {
    dispatch(logout());
  }
};


const initialState: AuthState = {
  role: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ role: UserRole; token: string }>
    ) => {
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
