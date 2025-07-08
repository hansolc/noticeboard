import GlobalNavigation from "./components/GlobalNavigation";
import "./global.css";
import { AppProvider } from "./providers/AppProvider";
import { Routes } from "./Routes";

function App() {
  return (
    <AppProvider>
      <GlobalNavigation />
      <Routes />
    </AppProvider>
  );
}

export default App;
