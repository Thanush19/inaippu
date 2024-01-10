import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, setUserData, clearUserData } from "./redux/userSlice";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Testing from "./testing/Testing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapApp from "./testing/MapApp";
import SurfLocalMap from "./components/SurfLocalMap";
import RaiseDemand from "./components/RaiseDemand";
import DemandsList from "./components/DemandsList";
import ViewDemands from "./components/ViewDemands";
import "@fortawesome/fontawesome-free/css/all.css";
import Intro from "./components/Intro";
import Profile from "./components/Profile";

function App() {
  const storedUserData = localStorage.getItem("userData");
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialUserData && !userData) {
      dispatch(setUserData(initialUserData));
    }
    setIsLoading(false);
  }, [dispatch, initialUserData, userData]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("userData", JSON.stringify(userData));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userData]);

  useEffect(() => {
    const clearStoredUserData = setTimeout(() => {
      localStorage.removeItem("userData");
      dispatch(clearUserData());
    }, 3600000);

    return () => {
      clearTimeout(clearStoredUserData);
    };
  }, [dispatch]);

  useEffect(() => {
    const introTimeout = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => {
      clearTimeout(introTimeout);
    };
  }, []);
  if (isLoading) {
    return null;
  }

  return (
    <>
      {showIntro && <Intro />}
      <Routes>
        <Route
          path="/"
          element={userData ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/surf-local"
          element={userData ? <SurfLocalMap /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-demands"
          element={userData ? <ViewDemands /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/raise-demand"
          element={
            userData &&
            (userData.role === "RESIDENT" || userData.role === "ADMIN") ? (
              <RaiseDemand />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-demands/:id"
          element={
            userData &&
            (userData.role === "RESIDENT" || userData.role === "ADMIN") ? (
              <DemandsList />
            ) : (
              <Navigate to="/login" />
            )
          }
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
