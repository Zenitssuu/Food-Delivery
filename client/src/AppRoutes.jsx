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
import UserProfilePage from "./pages/UserProfilePage.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import ManageResturantPage from "./pages/ManageResturantPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import OrderStatusPage from "./pages/OrderStatusPage.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <Home />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/allrestaurants/search/:city"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />

      <Route
        path="/detail/:restaurant"
        element={
          <Layout>
            <DetailPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />

        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageResturantPage />
            </Layout>
          }
        />

        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default AppRouter;
