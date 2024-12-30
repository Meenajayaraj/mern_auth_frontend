import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the user state
interface User {
  id: string;
  username: string;
  isVerified: boolean;
  email: string;
}

interface AuthState {
  user: User | null;
}

// Initial state for the auth slice
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set authenticated user
    setAuthUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },

    // Clear user (useful for logout)
    clearAuthUser(state) {
      state.user = null;
    },
  },
});

// Export actions
export const { setAuthUser, clearAuthUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
