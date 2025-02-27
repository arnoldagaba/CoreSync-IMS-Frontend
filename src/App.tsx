import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SearchProvider>
          <AppRoutes />
          <ToastContainer />
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
