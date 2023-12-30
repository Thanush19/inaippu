import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, clearUserData } from "./redux/userSlice";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Testing from "./testing/Testing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapApp from "./testing/MapApp";

function App() {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(clearUserData());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/testing" element={<Testing />} />
        <Route path="/testing1" element={<MapApp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
