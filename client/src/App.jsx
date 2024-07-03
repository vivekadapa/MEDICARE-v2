import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      </QueryClientProvider>
    </>
  );
}
