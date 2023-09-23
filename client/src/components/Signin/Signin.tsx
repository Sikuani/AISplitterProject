import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthTokenContext } from "../../context/AuthTokenContext";

const Signin = () => {
  
  const { login } = useContext(AuthTokenContext); // destructuring
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username,
          password,
        },
      });

      const { token } = response.data;

      //! checking  token is not empty
      if (!token) {
        throw new Error("No token returned");
      }
      login(token);
      setUsername("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // error is optional
        setErrorMessage("Invalid username or password");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <form
        method="POST"
        className="flex flex-col m-4 p-4 text-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLoading && (
          <div className="bg-blue-200 my-4 py-4 rounded-md">
            <p className="text-blue-600">Loading...</p>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-200 my-4 py-4 rounded-md">
            <p className="text-red-600">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500  mx-auto py-2 px-6 mt-4 text-white rounded font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;
