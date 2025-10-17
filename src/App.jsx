import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import Arc42Section from "./pages/Arc42/Arc42Section.jsx";
import Home from "./pages/Home.jsx";
import { AppDataProvider } from "./context/AppDataContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="arc42" element={<Navigate to="/arc42/arc42-01" replace />} />
            <Route path="arc42/:sectionId" element={<Arc42Section />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppDataProvider>
    </BrowserRouter>
  );
}

export default App;
