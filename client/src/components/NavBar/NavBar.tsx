import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthTokenContext } from '../../context/AuthTokenContext'


const NavBar = () => {

  const {logout} = useContext(AuthTokenContext)

  return (
    <div>
      <header className="bg-blue-500 p-3 w-full">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          <div>
            <Link className="text-white font-bold text-xl p-4" to={"/"}>AISplitter</Link>
          </div>

          {/* <div className="w-full bg-red-500 p-3 flex justify-between items-center"> */}
          <div className="">
            <ul className="flex px-7 gap-6 items-center text-white">              
              <li><Link className="text-white hover:text-gray-600" to={"/youtube-transcripts"}>YoutubeTranscript</Link></li>
              <li><Link className="text-white hover:text-gray-600" to={"/collection"}>Collections</Link></li>
              
              
            </ul>
          </div>
          
          <div>
            <button className='bg-[#a6c1ee] px-5 py-3 rounded-md text-black' onClick={logout}>LogOut</button>
          </div>


        </nav>
      </header>

    </div>
  )
}

export default NavBar