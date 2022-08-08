import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

const Actions = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [company, setCompany] = useState('')
  const [action, setAction] = useState('ADD')
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const param = useParams()

  const fetchPrduct = (id) => {
    Helpers.axiosGetCall(`/product/${id}`).then((response) => {
      const { name, category, price, company } = response
      setName(name)
      setCategory(category)
      setPrice(price)
      setCompany(company)
    })
  }

  useEffect(() => {
    if (param.id) {
      fetchPrduct(param.id)
      setAction('EDIT')
    }
  }, [])

  const path = window.location.hash
  //Check Redirection from Edit to Add

  useEffect(() => {
    if (param.id) {
      fetchPrduct(param.id)
      setAction('EDIT')
    } else {
      setAction('ADD')
    }
  }, [path])

  const selectUrl = {
    ADD: '/product/add',
    EDIT: `/product/${param.id}/update`,
  }

  const selectCallAction = {
    ADD: Helpers.axiosPostCall,
    EDIT: Helpers.axiosPutCall,
  }

  const handleSubmit = () => {
    selectCallAction[action](selectUrl[action], { name, category, price, company }).then(
      (response) => {
        if (response) navigate('/products')
      },
    )
  }
  return (
    <CContainer>
      <CForm>
        <p className="text-medium-emphasis">
          {param.id ? 'Edit Your Product' : 'Create a new Product'}
        </p>
        <CRow>
          <CCol lg={5} md={5} sm={12}>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="Enter Name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg={5} md={5} sm={12}>
            <CInputGroup className="mb-4">
              <CFormInput
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
              />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol lg={5} md={5} sm={12}>
            <CInputGroup className="mb-4">
              <CFormInput
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg={5} md={5} sm={12}>
            <CInputGroup className="mb-4">
              <CFormInput
                type="text"
                placeholder="Enter Company"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value)
                }}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={6}>
            <CButton
              onClick={() => {
                handleSubmit()
              }}
              color="primary"
              className="px-4"
            >
              {action == 'ADD' ? 'Add' : 'Edit'} Product
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </CContainer>
    // </div>
  )
}

export default Actions
