import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Secondpage from './Components/Secondpage'
import BikeEntry from './Components/BikeEntry'
import Thirdpage from './Components/Thirdpage'
import PaymentPage from './Components/PaymentPage'
import Login from './Components/Login'
import PaymentSuccessPage from './Components/PaymentSuccessPage'
import UserLogin from './Components/UserLogin'
import Reviewpage from './Components/Reviewpage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-bootstrap'
export default function App() {
  return (
    <>
      
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/1' element={<BikeEntry/>}/>
        <Route path='/2' element={<Secondpage/>} />
        <Route path='/3' element={<Thirdpage/>} />
        <Route path='/payment' element={<PaymentPage/>} />
        <Route path='/paymentsuccess' element={<PaymentSuccessPage/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/review' element={<Reviewpage/>} />
      </Routes>
      <ToastContainer autoClose={5000}/>
    </>
  )
}
