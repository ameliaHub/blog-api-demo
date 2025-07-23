import Navbar from "./components/Navbar/Navbar.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
