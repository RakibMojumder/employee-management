import { Box, CssBaseline } from "@mui/material";
import Dashboard from "./components/Dashboard";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <CssBaseline />
        <Dashboard />
      </Box>
    </QueryClientProvider>
  );
}

export default App;
