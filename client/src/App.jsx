import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignupPage";
import HomePage from "./pages/home/HomePage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { baseUrl } from "./constant/url";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) return null;
      return res.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // 🔥 HARD STOP AFTER LOGOUT
  if (!authUser) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <RightPanel />
    </div>
  );
};

export default App;
