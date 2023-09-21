import { Routes, Route } from "react-router-dom"

import Signin from "../Signin/Signin"
import ProtectedRoute from "../Routing/ProtectedRoute";
import TextSplitter from "../TextSplitter/TextSplitter"
import NavBar from "../NavBar/NavBar";
import YTranscripts from '../YTranscript/YTranscripts';
import Collections from "../Collections/Collections";

function App() {
  
  return (
    <div className="w-screen h-screen">
      
      <NavBar/>
      <Routes>
        
        {/*Public routes*/}
        <Route path="/sign-in" element={<Signin/>}/>

        {/*Protected routes*/}
        <Route path="/" element={<ProtectedRoute><TextSplitter/></ProtectedRoute>}/>
        <Route path="/youtube-transcripts" element={<ProtectedRoute><YTranscripts/></ProtectedRoute>}/>
        <Route path="/collection" element={<ProtectedRoute><Collections/></ProtectedRoute>}/> //! gereral collection
        <Route path="/collection/:id" element={<ProtectedRoute><h1>/collection #id</h1></ProtectedRoute>}/> //!specific collection
        
      </Routes>
    </div>
  )
}

export default App
