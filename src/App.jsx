import { Box, CssBaseline } from "@mui/material";
import Dashboard from "./components/Dashboard";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
