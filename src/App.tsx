import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { ProtectedRoute } from "./protectedRoute";
import Layout from "./components/Layout";
import JobDetails from "./pages/details";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/home'
          element={
            <Layout>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path='/job-details/:id'
          element={
            <Layout>
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
