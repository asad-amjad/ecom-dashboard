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

const CategoryAction = () => {
  const [name, setName] = useState('')

  const [action, setAction] = useState('ADD')
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const param = useParams()

  const fetchPrduct = (id) => {
    Helpers.axiosGetCall(`/category/${id}`).then((response) => {
      const { name } = response
      setName(name)
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
    ADD: '/category/add',
    EDIT: `/category/${param.id}/update`,
  }

  const selectCallAction = {
    ADD: Helpers.axiosPostCall,
    EDIT: Helpers.axiosPutCall,
  }

  const handleSubmit = () => {
    selectCallAction[action](selectUrl[action], { name }).then((response) => {
      if (response) navigate('/categories')
    })
  }
  return (
    <CContainer>
      <CForm>
        <p className="text-medium-emphasis">
          {param.id ? 'Edit Your Category' : 'Create a new Category'}
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
          <CCol xs={6}>
            <CButton
              onClick={() => {
                handleSubmit()
              }}
              color="primary"
              className="px-4"
            >
              {action == 'ADD' ? 'Add' : 'Edit'} Category
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </CContainer>
    // </div>
  )
}

export default CategoryAction
