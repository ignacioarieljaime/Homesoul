import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../../pages/auth/SignUp";
import Homepage from "../../pages/noAuth/Homepage";
import Login from "../../pages/auth/Login";
import UserTypes from "../../pages/noAuth/UserTypes";
import CustomerSignUp from "../../pages/auth/CustomerSignUp";
import SignUpSuccess from "../../pages/noAuth/SignUpSuccess";
import UserSuccess from "../../pages/noAuth/UserSuccess";
import Verified from "../../pages/noAuth/Verified";
import ForgetPassword from "../../pages/auth/ForgetPassword";
import VerificationEmail from "../../pages/auth/Verification";
import SetPassword from "../../pages/auth/SetPassword";
import FaqPage from "../../pages/noAuth/FaqPage";
import Privacy from "../../pages/noAuth/Privacy";
import Terms from "../../pages/noAuth/Terms";
import Sitemap from "../../pages/noAuth/Sitemap";
const userRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/customersignup" element={<CustomerSignUp />} />
      <Route path="/user-type" element={<UserTypes />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/usersuccess" element={<UserSuccess />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/term" element={<Terms />} />
      <Route path="/verify-email" element={<Verified />} />
      <Route path="/checkemail" element={<VerificationEmail />} />
      <Route path="/reset-password" element={<SetPassword />} />
      <Route path="/signupsuccess" element={<SignUpSuccess />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default userRoutes;
