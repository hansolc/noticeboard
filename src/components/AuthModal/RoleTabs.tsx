import { Tab, Tabs } from "@mui/material";
import React from "react";
import type { Role } from "../../types/auth";

function RoleTabs({
  role,
  setRole,
}: {
  role: Role;
  setRole: (role: Role) => void;
}) {
  const handleTabChange = (event: React.SyntheticEvent, newValue: Role) => {
    setRole(newValue);
  };
  return (
    <Tabs value={role} onChange={handleTabChange} className="flex">
      <Tab label="User" value="user" className="grow" />
      <Tab label="Guest" value="guest" className="grow" />
      <Tab label="Admin" value="admin" className="grow" />
    </Tabs>
  );
}

export default RoleTabs;
