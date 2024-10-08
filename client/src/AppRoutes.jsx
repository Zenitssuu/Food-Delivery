import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Home from './pages/Home';
// import About from './pages/About';
// import NotFound from './pages/NotFound';
import Layout from "./layout/layout.jsx";
import Home from "./pages/Home.jsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
      <Route path="/about" element={<span>Hellow jolu</span>} />
      <Route path="/user-profile" element={<span>User Profile</span>}/>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default AppRouter;
