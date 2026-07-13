import { apiClient } from "@/lib/apiClient";
import type { User, UsersQuery, UsersResponse } from "@/types";

/**
 * Auth endpoints beyond login/register/logout/profile (those already live in
 * store/slices/authSlice.ts as thunks). See backend/src/routes/auth.route.js.
 */
export const authApi = {
  getUsers: (query: UsersQuery = {}) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "") params.set(key, String(value));
    });
    const qs = params.toString();
    return apiClient.get<UsersResponse>(`/auth/users${qs ? `?${qs}` : ""}`);
  },
  updateAccount: (payload: { name?: string; email?: string }) =>
    apiClient.patch<{ user: User }>("/auth/update-account", payload),
  changePassword: (payload: { oldPassword: string; newPassword: string }) =>
    apiClient.patch<void>("/auth/change-password", payload),
  updateProfileImage: (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    return apiClient.patch<User>("/auth/profile-image", formData);
  },
};
