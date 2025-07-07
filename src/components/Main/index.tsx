import React, { type PropsWithChildren } from "react";
import Container from "@mui/material/Container";

function Main({ children }: PropsWithChildren) {
  return (
    <Container maxWidth="lg" className="py-20" component="main">
      {children}
    </Container>
  );
}

export default Main;
