import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import NoticeBoardPage from "./pages/NoticeBoardPage";
import NoticeBoardDetailPage from "./pages/NoticeBoardDetailPage";
import PostCreatePage from "./pages/PostCreatePage";

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
  {
    path: "/post/create",
    Component: PostCreatePage,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
