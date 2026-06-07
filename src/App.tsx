import AppRoutes from "./routes/appRoutes";
import ErrorBoundary from "./components/ui/errorBoundary";
import { Toaster } from "sonner";

function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
      <Toaster
        position="bottom-right"
        richColors
        closeButton
      />
    </ErrorBoundary>
  );
}

export default App;