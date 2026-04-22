import { Navigate } from "react-router-dom";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔍 Debug (optional)
  console.log("Token:", token);
  console.log("User:", user);

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  // ❌ Not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return <>{children}</>;
}