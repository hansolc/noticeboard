import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store";
import queryClient from "./tanstack/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GlobalAlert from "@components/Alert";
import AuthModal from "@components/AuthModal";
import { Container } from "@mui/material";

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        theme={createTheme({
          breakpoints: {
            values: {
              mobile: 0,
              desktop: 1280,
            },
          },
        })}
      >
        <GlobalAlert />
        <AuthModal />
        <Container maxWidth="desktop" className="py-20 max-xl:max-w-[500px]">
          {children}
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  </ReduxProvider>
);
