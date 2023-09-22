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

  //const hasToken = () => !!token // Another way to check if the token exists 

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
