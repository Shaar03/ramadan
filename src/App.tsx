import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "@/utils/ProtectedRoutes";
import LoginPage from "./routes/auth/login/page";
import SchedulePage from "./routes/schedule/page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/schedule" element={<SchedulePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
