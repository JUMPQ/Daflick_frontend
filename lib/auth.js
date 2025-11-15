// lib/auth.js
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.message || "Login failed");
    throw new Error(data.message);
  }

  toast.success("Logged in successfully!");
  return data;
};

export const signup = async (formData) => {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.message || "Signup failed");
    throw new Error(data.message);
  }

  toast.success("Account created! Please log in.");
  return data;
};

export const logout = () => {
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=strict";
  window.location.href = "/";
};
