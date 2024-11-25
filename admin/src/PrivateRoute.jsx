// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from './components/context/StoreContext'; // Assuming you're using context to store user data

const PrivateRoute = ({ element, requiredRole }) => {
//   const { user } = useContext(StoreContext); 
//   const isAuthenticated = user && user.isLoggedIn;
  
//   const hasRequiredRole = requiredRole ? user.role === requiredRole : true;

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />; 
//   }

//   if (!hasRequiredRole) {
//     return <Navigate to="/error" replace />; 
//   }

  return element;
};

export default PrivateRoute;
