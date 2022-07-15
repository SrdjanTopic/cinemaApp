import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Signup/SignupPage";
import AccountVerification from "./pages/AccountVerification/AccountVerificationPage";
import ScreeningsPage from "./pages/Screenings/ScreeningsListPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Footer from "./components/Footer/Footer";
import GenresPage from "./pages/Genres/GenresPage";
import UserPage from "./pages/User/UserPage";
import MoviesPage from "./pages/Movies/MoviesPage";
import LoginPage from "./pages/Login/LoginPage";
import ScreeningPage from "./pages/Screenings/ScreeningPage";
import ActiveReservationsPage from "./pages/ActiveReservations/ActiveReservationsPage";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const App = () => {
  return (
    <>
      <NavBar />
      <div
        className="appContentDiv"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ScreeningsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route
              path="users/verify/:verificationToken"
              element={<AccountVerification />}
            />
            <Route path="screenings/:screeningId" element={<ScreeningPage />} />
            <Route path="genres" element={<GenresPage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="customers" element={<UserPage />} />
            <Route
              path="reservations-current"
              element={<ActiveReservationsPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer text="copyright info" />
    </>
  );
};

export default App;
