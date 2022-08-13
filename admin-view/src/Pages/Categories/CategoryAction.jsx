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
import Select from 'react-select'

import Helpers from '../../utils/Helpers'

const CategoryAction = () => {
  const [name, setName] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const [action, setAction] = useState('ADD')
  const [error, setError] = useState(false)
  console.log(selectedCategory)
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
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    Helpers.axiosGetCall(`/category`).then((response) => {
      setCategories(response)
    })
  }

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
    selectCallAction[action](selectUrl[action], { name, sub_categories: [] }).then((response) => {
      if (response) navigate('/categories')
    })
  }

  const handleSubmitSubCategory = () => {
    Helpers.axiosPostCall('/sub-category/add', {
      name: subCategory,
      category_id: selectedCategory,
    }).then((response) => {
      if (response) navigate('/categories')
    })
  }

  const options = categories.map((k) => {
    return { value: k._id, label: k.name }
  })

  return (
    <CContainer>
      <CForm>
        <p className="text-medium-emphasis">
          {param.id ? 'Edit Your Category' : 'Create a new Category'}
        </p>

        <CRow>
          <CCol lg={6} md={5} sm={12}>
            <CContainer>
              Category
              <CRow>
                <CCol lg={10} md={12} sm={12}>
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
            </CContainer>
          </CCol>
          <CCol lg={6} md={5} sm={12}>
            Sub Category
            <CContainer>
              <CRow>
                <CCol lg={5} md={5} sm={12}>
                  <Select
                    options={options}
                    onChange={(e) => {
                      setSelectedCategory(e.value)
                    }}
                  />
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Enter Name"
                      type="text"
                      value={subCategory}
                      onChange={(e) => {
                        setSubCategory(e.target.value)
                      }}
                    />
                  </CInputGroup>
                </CCol>

                <CRow>
                  <CCol xs={6}>
                    <CButton
                      onClick={() => {
                        handleSubmitSubCategory()
                      }}
                      color="primary"
                      className="px-4"
                    >
                      Sub Category
                    </CButton>
                  </CCol>
                </CRow>
              </CRow>
            </CContainer>
          </CCol>
        </CRow>

        {/* <CRow>
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
        </CRow> */}
      </CForm>
    </CContainer>
    // </div>
  )
}

export default CategoryAction
