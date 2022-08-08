import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import Helpers from '../../utils/Helpers'

const Category = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    Helpers.axiosPostCall(`/user/login`, { email, password }).then((response) => {
      if (response.accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(response.accessToken)), navigate('/')
      }
    })
  }
  return (
    // <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>List</CContainer>
    // </div>
  )
}

export default Category
