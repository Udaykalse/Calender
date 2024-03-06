import React from 'react'
import Navbar from '../Component/Navbar'
import Schedule from '../Component/Schedule'
import { Route, Routes } from 'react-router'

const routesPath = () => {
  return (
    <div>
     <Routes>
        <Route  path='/' element={<Navbar/>}/>
        <Route path="/schedule" element={<Schedule/>}/>
        </Routes>
    </div>
  )
}

export default routesPath
