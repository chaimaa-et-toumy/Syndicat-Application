import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
function ProtectRoute() {
    const token_  = localStorage.getItem('token')
  return (
    token_ ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectRoute