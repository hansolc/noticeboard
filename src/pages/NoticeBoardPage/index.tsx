import SearchPostField from "./components/SearchPostField";
import PostList from "./components/PostList";
import { useAppSelector } from "../../providers/redux/hooks";
import type { RootState } from "../../providers/redux/store";
import { Button } from "@mui/material";

function NoticeBoardPage() {
  const user = useAppSelector((state: RootState) => state.user.user);
  return (
    <>
      <div className="flex justify-between max-xl:flex-col max-xl: pb-10 gap-10">
        <SearchPostField />
        {user && user.role !== "guest" && (
          <Button variant="contained">+ Create</Button>
        )}
      </div>
      <main>
        <PostList />
      </main>
    </>
  );
}

export default NoticeBoardPage;
