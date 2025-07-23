import { useState } from 'react'
import Navbar from './components/Navbar'
import { useLocation,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'



function App() {
  const isOwnerPath = useLocation().pathname.includes("owner")


  return (
    <>
    {!isOwnerPath && <Navbar/>}
    <div className='min-h-[70vh]'>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/rooms" element={<AllRooms/>}></Route>
        <Route path="/rooms/:id" element={<RoomDetails/>}></Route>
      </Routes>
       
    </div>
      <Footer/>
 

     
    </>
  )
}

export default App
