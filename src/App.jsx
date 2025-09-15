import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InviteUser from "./pages/InviteUser";
import ManageTenants from "./pages/ManageTenants";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
  <BrowserRouter>
  <AuthProvider>
  <Navbar/>
  <Routes>
  <Route path="/" element={ <Login />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
  <Route path="/invite" element={<ProtectedRoute role="Admin"><InviteUser/></ProtectedRoute>}/>
  <Route path="/tenants" element={<ProtectedRoute role="Admin"><ManageTenants/></ProtectedRoute>}/>
  </Routes>
  </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
