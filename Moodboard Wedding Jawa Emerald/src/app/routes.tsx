import { createBrowserRouter } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import Guests from "./pages/Guests";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import TemplatePreview from "./pages/TemplatePreview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "templates", Component: Templates },
      { path: "guests", Component: Guests },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/preview/:id",
    Component: TemplatePreview,
  }
]);