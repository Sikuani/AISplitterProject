/**
 * Crear el context
 * Creamos la funcion provider (values)porn
 * 1. crear el estado del token
 * 2. obtener el token
 * 3. crear una funcion que indique si existe un token (boolean)
 * 4. crear una funcion login (setState(token))
 * 5. crear una funcion logout (setState("")) * 
 */

import { ReactNode, createContext, useState } from "react";

type AuthTokenContextType = {
  getToken: () => string;
  hasToken: () => boolean;
  login: (token: string) => void;
  logout: () => void
}

type AuthTokenProviderProps = {
  children: ReactNode;
}

export const AuthTokenContext = createContext<AuthTokenContextType>({
  getToken: () => "", // use: sign-in
  hasToken: () => false, // use: protected component
  login: () => null, // use: sign-in -- it doesn't return anything */
  logout: () => null // use: protected component/ NavBar -- it doesn't return anything */
});

export function AuthTokenProvider({children}: AuthTokenProviderProps)  {
  //!Storing the JWT token (api, backend) in the context API.
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // set get y remove

  const getToken = () => token; //return the JWT token

  const hasToken = () => token ? true : false;

  //const hasToken = () => !!token // Otra sintasis para significar lo mismo 

  const login = (token: string) => {
    localStorage.setItem("token", token)
    setToken(token);
  }
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  }


  return (
    <AuthTokenContext.Provider value={{
      getToken,
      hasToken,
      login,
      logout
    }}
    >
      {children}
    </AuthTokenContext.Provider>
  )

}
