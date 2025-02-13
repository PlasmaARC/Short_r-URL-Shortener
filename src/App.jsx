//Installing React Router Dom for Single Page Navigation
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import Auth from "./pages/auth";
import UrlProvider from "./context";
import RequireAuth from "./components/require-auth";
//New React Router Navigation Setup is good.

//Must Provide a default layout to share across all pages
//And providing props to Router Provider will have access to router and to use this <Outlet/> element is used in the layout.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
