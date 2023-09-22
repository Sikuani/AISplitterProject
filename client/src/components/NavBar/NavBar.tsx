import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthTokenContext } from "../../context/AuthTokenContext";

const NavBar = () => {
  const { logout } = useContext(AuthTokenContext);

  return (
    <div>
      <header className="bg-blue-500 p-3 w-full">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          <div>
            <Link className="text-white font-bold text-xl p-4" to={"/"}>
              AISplitter
            </Link>
          </div>

          {/* <div className="w-full bg-red-500 p-3 flex justify-between items-center"> */}
          <div className="md:static absolute bg-slate-500 md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
            <ul className="flex md:flex-row flex-col px-7 md:items-center md:gap-[4vw] gap-8 text-white">
              <li>
                <Link
                  className="text-white hover:text-gray-600"
                  to={"/youtube-transcripts"}
                >
                  YoutubeTranscript
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-gray-600"
                  to={"/collection"}
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <button
              className="bg-[#a6c1ee] px-5 py-3 rounded-md text-black"
              onClick={logout}
            >
              LogOut
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="menu w-7 h-7 cursor-pointer md:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
