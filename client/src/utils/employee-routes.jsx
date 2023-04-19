import { Outlet, Navigate } from "react-router-dom";

const EmployeeRoutes = () => {
  let auth = { token: true };

  return auth.token ? <Outlet /> : <Navigate to="../login/" />;
};

export default EmployeeRoutes;