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
import Select from 'react-select'

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import Helpers from '../../utils/Helpers'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategories } from 'src/utils/Operations'
import { fetchCategories } from 'src/Redux/Actions'
import { find, options } from '../../utils/utilities'

const Actions = () => {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [variation, setVariation] = useState('')
  const [price, setPrice] = useState('')
  const [company, setCompany] = useState('')
  const [action, setAction] = useState('ADD')
  const [error, setError] = useState(false)
  const [categories, setCategories] = useState([])

  const [selectedCategory, setSelectedCategory] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const param = useParams()

  const categoriesReducer = useSelector((state) => state.categoriesReducer)

  const fetchPrduct = (id) => {
    Helpers.axiosGetCall(`/product/${id}`).then((response) => {
      const { name, price, company } = response
      setName(name)
      // setCategory(category)
      setPrice(price)
      setCompany(company)
    })
  }
  // console.log(categories)

  // const subCategoriesOption = find(
  //   selectedCategory,
  //   categoriesReducer.categories,
  // ).sub_categories.map((k) => {
  //   return { value: k._id, label: `${k.name}` }
  // })
  const fetch = () => {
    // fetchSubCategories()
    //   .then((response) => {
    //     console.log('fetch', response)
    //     // setCategories(response)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  useEffect(() => {
    fetchSubCategories()
      .then((response) => {
        setCategories(response)
      })
      .catch((err) => {
        console.log(err)
      })

    if (param.id) {
      fetchPrduct(param.id)
      //   setAction('EDIT')
    }
  }, [])

  // useEffect(() => {
  //   if (selectedCategory) {
  //     const getSelectedCategory = find(categoriesReducer.categories, selectedCategory)
  //     setSubCategories(options(getSelectedCategory && getSelectedCategory.sub_categories))
  //   }
  // }, [selectedCategory])

  const path = window.location.hash
  //Check Redirection from Edit to Add

  // useEffect(() => {
  //   if (param.id) {
  //     fetchPrduct(param.id)
  //     setAction('EDIT')
  //   } else {
  //     setAction('ADD')
  //   }
  // }, [path])

  // useEffect(() => {
  //   setSelectedSubCategory('')
  // }, [selectedCategory])

  const selectUrl = {
    ADD: '/product/add',
    EDIT: `/product/${param.id}/update`,
  }

  const selectCallAction = {
    ADD: Helpers.axiosPostCall,
    EDIT: Helpers.axiosPutCall,
  }

  const handleSubmit = () => {
    selectCallAction[action](selectUrl[action], {
      name,
      price,
      company,
      category: selectedCategory,
    }).then((response) => {
      if (response) navigate('/products')
    })
  }
  const handleSelectCategory = (e) => {
    setSelectedCategory(e.value)
    // // fetch(e.value)
    // const getSubCategories = find(categoriesReducer.categories, e.value).sub_categories
    // setSubCategories(getSubCategories)
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
            <Select
              options={options(categories)}
              onChange={(e) => {
                handleSelectCategory(e)
              }}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol lg={5} md={5} sm={12}>
            <CInputGroup className="mb-4">
              {/* <CFormInput
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
              /> */}
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
          <CCol lg={5} md={5} sm={12}>
            <div className="brand-name">
              {/* <select
                onChange={(e) => {
                  setSelectedSubCategory(e.target.value)
                }}
              >
                {options(subCategories).map((i) => (
                  <option key={i.value}>
                    {i.label}
                  </option>
                ))}
              </select> */}
            </div>
          </CCol>
        </CRow>
        <CRow className="mt-4">
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
