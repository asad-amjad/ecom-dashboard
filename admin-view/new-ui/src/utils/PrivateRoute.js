import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  return JSON.parse(localStorage.getItem('accessToken')) !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}
export default PrivateRoute
