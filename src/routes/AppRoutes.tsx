import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import PrivateRoute from "./PrivateRoute";
import Dashbaord from "@/pages/Dashboard/Dashbaord";
import Login from "@/pages/Auth/Login";
import MainLayout from "@/components/layout/MainLayout";

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<Dashbaord />} />
          </Route>
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
