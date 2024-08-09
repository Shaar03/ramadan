import "./App.css";
import Schedule from "@/components/schedule/Schedule";
import Login from "@/components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "@/utils/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/schedule" element={<Schedule />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
