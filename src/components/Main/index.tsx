import { type PropsWithChildren } from "react";
import Container from "@mui/material/Container";

function Main({ children }: PropsWithChildren) {
  return (
    <Container
      maxWidth="desktop"
      className="py-20 max-xl:max-w-[500px]"
      component="main"
    >
      {children}
    </Container>
  );
}

export default Main;
