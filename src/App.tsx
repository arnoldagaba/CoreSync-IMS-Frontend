import { ThemeProvider } from "@/contexts/ThemeContext";
import { ReactNode } from "react";

function App({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}

export default App;
