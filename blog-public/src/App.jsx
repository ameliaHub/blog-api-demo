import Navbar from "./components/Navbar/Navbar.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import PostList from "./components/PostList/PostList.jsx";
import PostDetail from "./components/PostDetail/PostDetail.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import AdminRoute from "./guard/AdminRoute.jsx";
import CreatePost from "./components/CreatePost/CreatePost.jsx";
import ManagePost from "./components/ManagePost/ManagePost.jsx";
import EditPost from "./components/EditPost/EditPost.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <AdminRoute>
              <CreatePost />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage"
          element={
            <AdminRoute>
              <ManagePost />
            </AdminRoute>
          }
        />
        <Route path="/admin/edit/:id" element={<EditPost />} />
      </Routes>
    </>
  );
}

export default App;
