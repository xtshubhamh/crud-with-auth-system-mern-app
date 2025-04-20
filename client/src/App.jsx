import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddPage from "../pages/AddPage";
import EditPage from "../pages/EditPage";
import Home from "../pages/Home";
import Login from "./components/auth/Login";
import Dashboard from "./components/auth/Dashboard";
import Register from "./components/auth/Register";

export default function App() {
  return (
    <Router>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center my-6">📝 MERN CRUD App</h1>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
