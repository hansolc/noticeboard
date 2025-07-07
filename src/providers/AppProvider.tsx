import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store";
import queryClient from "./tanstack/client";

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ReduxProvider>
);
