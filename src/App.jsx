import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './page/Home'
import AddNote from './page/AddNote'
import NoteDetail from './page/NoteDetail'
import EditNote from './page/EditNote'
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addnote' element={<AddNote />} />
        <Route path='/:slug' element={<NoteDetail />} />
        <Route path='/edit/:slug' element={<EditNote />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
