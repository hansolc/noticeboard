import SearchPostField from "./components/SearchPostField";
import PostList from "./components/PostList";
import { useAppSelector } from "../../providers/redux/hooks";
import type { RootState } from "../../providers/redux/store";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function NoticeBoardPage() {
  const user = useAppSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between max-xl:flex-col max-xl: pb-10 gap-10">
        <SearchPostField />
        {user && user.role !== "guest" && (
          <Button variant="contained" onClick={() => navigate("/post/create")}>
            + Create
          </Button>
        )}
      </div>
      <main>
        <PostList />
      </main>
    </>
  );
}

export default NoticeBoardPage;
