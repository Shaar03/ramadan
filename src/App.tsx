import "./App.css";
import Schedule from "@/components/schedule/Schedule";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "@/utils/ProtectedRoutes";
import LoginPage from "./routes/auth/login/page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/schedule" element={<Schedule />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
