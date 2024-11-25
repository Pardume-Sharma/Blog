import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./index.css";
import AddBlog from "./pages/AddBlog/AddBlog.jsx";
import ListBlogs from "./pages/ListBlogs/ListBlogs.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Error from "./pages/Error/Error.jsx";
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx'
import { useContext } from "react";
import { StoreContext } from "./components/context/StoreContext.jsx";

const App = () => {
  const {url} = useContext(StoreContext);
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <div className="app-content">
          {/* <Sidebar /> */}
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/error" element={<Error />} />
            <Route
              path="/"
              element={
                <PrivateRoute
                  element={<AddBlog url={url} />}
                  requiredRole="superadmin"
                />
              }
            />
            <Route
              path="/listblogs"
              element={
                <PrivateRoute
                  element={<ListBlogs url={url} />}
                  requiredRole="superadmin"
                />
              }
            />
          </Routes>
        </div>

        {/* <Footer/> */}
      </div>
    </>
  );
};

export default App;
