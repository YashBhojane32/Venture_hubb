import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🌍 PUBLIC
import HomePage from "@/react-app/pages/Home";
import Destinations from "@/react-app/pages/Destinations";
import DestinationDetails from "@/react-app/pages/DestinationDetails";
import Packages from "@/react-app/pages/Packages";
import Blog from "@/react-app/pages/Blog";
import BlogDetails from "@/react-app/pages/BlogDetails";
import About from "@/react-app/pages/About";
import Contact from "@/react-app/pages/Contact";
import WorkWithUs from "@/react-app/pages/WorkWithUs";

// 👤 USER
import UserLogin from "@/react-app/pages/UserLogin";
import Register from "@/react-app/pages/Register";
import UserDashboard from "@/react-app/pages/UserDashboard";
import MyBookings from "@/react-app/pages/MyBookings";
import BookingSuccess from "@/react-app/pages/BookingSuccess";

// 🔐 ADMIN
import Login from "@/react-app/pages/Login";
import AdminLayout from "@/react-app/components/AdminLayout";
import Dashboard from "@/react-app/pages/admin/Dashboard";
import AdminApplications from "@/react-app/pages/AdminApplications";
import AdminBookings from "@/react-app/pages/admin/AdminBookings";
import AddPlace from "@/react-app/pages/AddPlace";

// 🔒 PROTECTION
import ProtectedRoute from "@/react-app/components/ProtectedRoute";
import UserProtectedRoute from "@/react-app/components/UserProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work-with-us" element={<WorkWithUs />} />

        {/* 👤 USER AUTH */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 USER PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <UserProtectedRoute>
              <MyBookings />
            </UserProtectedRoute>
          }
        />

        <Route path="/booking-success" element={<BookingSuccess />} />

        {/* 🔐 ADMIN LOGIN */}
        <Route path="/admin-login" element={<Login />} />

        {/* 🔒 ADMIN ROUTES WITH LAYOUT */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* NESTED ROUTES */}
          <Route index element={<Dashboard />} />
          <Route path="places" element={<AddPlace />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>

        {/* ❌ 404 */}
        <Route path="*" element={<h1 className="p-6">404 Not Found</h1>} />

      </Routes>
    </Router>
  );
}