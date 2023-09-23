import { Routes, Route } from "react-router-dom"

import Signin from "../Signin/Signin"
import ProtectedRoute from "../Routing/ProtectedRoute";
import TextSplitter from "../TextSplitter/TextSplitter"
import NavBar from "../NavBar/NavBar";
import YTranscripts from '../YTranscript/YTranscripts';
import Collections from "../Collections/Collections";
import Collection from "../Collection/Collection";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from 'react';


function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-screen h-screen">
      
      <NavBar/>
        <div className={`${theme === 'light' ? 'bg-blue-950 text-white' : 'bg-blue-200 text-black'} p-3 w-full h-full` }>
          <Routes>
            {/*Public routes*/}
            <Route path="/sign-in" element={<Signin/>}/>

            {/*Protected routes*/}
            <Route path="/" element={<ProtectedRoute><TextSplitter/></ProtectedRoute>}/>
            <Route path="/youtube-transcripts" element={<ProtectedRoute><YTranscripts/></ProtectedRoute>}/>
            <Route path="/collection" element={<ProtectedRoute><Collections/></ProtectedRoute>}/> //! gereral collection
            <Route path="/collection/:id" element={<ProtectedRoute><Collection/></ProtectedRoute>}/> //!specific collection
          </Routes>
        </div>
    </div>
  )
}

export default App


