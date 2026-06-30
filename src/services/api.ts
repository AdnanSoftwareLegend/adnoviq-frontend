import axios from "axios";
import type { AuthUser } from "@/store/auth";

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: "newest" | "price_asc" | "price_desc" | "rating";
  page?: number;
  limit?: number;
}

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://adnoviq-backaend.vercel.app/api",
  timeout: 10_000,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common.Authorization;
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data.data as { user: AuthUser; token: string };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await API.post("/auth/register", { name, email, password });
  return response.data.data as { user: AuthUser; token: string };
};

export const updateCurrentUser = async (
  updates: Partial<Pick<AuthUser, "name" | "email">>,
) => {
  const response = await API.patch("/auth/me", updates);
  return response.data.data.user as AuthUser;
};

export const fetchProducts = async (filters: ProductFilters = {}) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  );
  const response = await API.get("/products", { params });
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};
