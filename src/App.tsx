import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName={(context) =>
            context?.type === "success"
              ? "bg-green-600 text-white"
              : context?.type === "error"
                ? "bg-red-600 text-white"
                : context?.type === "info"
                  ? "bg-blue-600 text-white"
                  : context?.type === "warning"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-800 text-white"
          }
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
