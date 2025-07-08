import { AppBar, Button, Typography } from "@mui/material";

function GlobalNavigation() {
  return (
    <AppBar component="header">
      <div className="w-full mx-auto max-w-[500px] xl:max-w-[1280px] flex justify-between items-center px-4 py-2">
        <Typography variant="h6">Notice Board</Typography>
        <Button color="inherit">Login</Button>
      </div>
    </AppBar>
  );
}

export default GlobalNavigation;
