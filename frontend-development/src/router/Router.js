import React from "react";
import { BrowserRouter } from "react-router-dom";
import adminroutes from "./routes/adminroutes";
import userRoutes from "./routes/userRoutes";
import { useSelector } from "react-redux";

const Router = () => {
  const { userType } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      {userType != null ? adminroutes(userType) : null}
      {userRoutes()}
    </BrowserRouter>
  );
};

export default Router;
