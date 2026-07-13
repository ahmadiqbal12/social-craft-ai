import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiClient, ApiRequestError } from "@/lib/apiClient";
import type { AuthState, LoginPayload, RegisterPayload, User } from "@/types";

const initialState: AuthState = {
  user: null,
  status: "idle",
  initialized: false,
  error: null,
};

function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiRequestError) return err.message;
  if (err instanceof Error) return err.message;
  return fallback;
}

/** Logs a user in against the backend; the server sets httpOnly cookies. */
export const login = createAsyncThunk<User, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await apiClient.post<{ user: User }>("/auth/login", payload);
      return data.user;
    } catch (err) {
      return rejectWithValue(errorMessage(err, "Unable to sign in"));
    }
  }
);

/** Registers a new account (multipart – profileImage is required by the API). */
export const register = createAsyncThunk<User, RegisterPayload, { rejectValue: string }>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("profileImage", payload.profileImage);

      const data = await apiClient.post<{ user: User }>("/auth/register", formData);
      return data.user;
    } catch (err) {
      return rejectWithValue(errorMessage(err, "Unable to create your account"));
    }
  }
);

/** Resolves the current session on app load by hitting the profile endpoint. */
export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await apiClient.get<User>("/auth/profile");
    } catch (err) {
      return rejectWithValue(errorMessage(err, "Not authenticated"));
    }
  }
);

export const logout = createAsyncThunk<void, void>("auth/logout", async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // Even if the server call fails we still clear local state.
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "succeeded";
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unable to sign in";
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        // Registration succeeds but the user must still log in explicitly.
        state.status = "idle";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unable to create your account";
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "idle";
        state.user = null;
        state.initialized = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.initialized = true;
      });
  },
});

export const { clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
