import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store";
import queryClient from "./tanstack/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  </ReduxProvider>
);
