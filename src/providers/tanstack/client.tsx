import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { store } from "../redux/store";
import { show } from "../redux/features/alertSlice";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      store.dispatch(show({ message, severity: "error" }));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      store.dispatch(show({ message, severity: "error" }));
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
