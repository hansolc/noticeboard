import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import NoticeBoardPage from "./pages/NoticeBoardPage";
import NoticeBoardDetailPage from "./pages/NoticeBoardDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Navigate to="/posts" />,
  },
  {
    path: "/posts",
    Component: NoticeBoardPage,
  },
  {
    path: "/posts/:id",
    Component: NoticeBoardDetailPage,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
