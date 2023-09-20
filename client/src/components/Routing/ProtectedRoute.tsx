import { AuthTokenContext } from '../../context/AuthTokenContext';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
}


function ProtectedRoute ({children}: ProtectedRouteProps) {

const {hasToken} = useContext(AuthTokenContext);
const isLoggedIn = hasToken();

return isLoggedIn ? children : <Navigate to="/sign-in"/>

}

export default ProtectedRoute;


