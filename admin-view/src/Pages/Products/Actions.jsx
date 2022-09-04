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
import axios from 'axios'
import ImageSelector from 'src/Shared/ImageSelector'
import { Row } from 'reactstrap'

const Actions = () => {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [variation, setVariation] = useState('')
  const [price, setPrice] = useState('')
  const [company, setCompany] = useState('')
  const [action, setAction] = useState('ADD')
  const [error, setError] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [displayImages, setDisplayImages] = useState([])
  const [fields, setFields] = useState({
    name: '',

    imageData: [],
  })

  // const singleImagePaths = [];
  //         singleImagePaths.push(
  //           process.env.REACT_APP_API_URL + "/" + newprops.singleRecord.pictures
  //         );

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

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setDisplayImages(pictureDataURLs)
    setFields({ ...fields, imageData: pictureFiles })
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
    // e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('category', selectedCategory)
    formData.append('company', company)
    formData.append('file', selectedImage)
    axios
      .post(process.env.REACT_APP_API_URL + '/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // authorization: `bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })

      .then((res) => {
        // console.log(res)
        if (res) navigate('/products')
      })
      .catch((err) => {
        console.log(err)
      })

    // selectCallAction[action](selectUrl[action], {
    //   name,
    //   price,
    //   company,
    //   if (response) navigate('/products')
    //   category: selectedCategory,
    // }).then((response) => {
    // })
  }

  // const handlePhoto = (e) => {
  //   setPhoto(e.target.files[0])
  // }

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.value)
    // // fetch(e.value)
    // const getSubCategories = find(categoriesReducer.categories, e.value).sub_categories
    // setSubCategories(getSubCategories)
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage(null)
  }

  return (
    <CContainer>
      <Row>
        <CCol>
          {' '}
          <CForm encType="multipart/form-data">
            <p className="text-medium-emphasis">
              {param.id ? 'Edit Your Product' : 'Create a new Product'}
            </p>
            <CRow>
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
            </CRow>
            <CRow className="mb-3">
              <Select
                options={options(categories)}
                onChange={(e) => {
                  handleSelectCategory(e)
                }}
              />
            </CRow>

            <CRow className="mb-4">
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                />
              </CInputGroup>
            </CRow>
            <CRow className="mb-4">
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Enter Company"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value)
                  }}
                />
              </CInputGroup>
            </CRow>

            <CRow className="mt-4">
              <input accept="image/*" type="file" onChange={imageChange} />
            </CRow>

            <CRow className="mt-4">
              <CButton
                onClick={() => {
                  handleSubmit()
                }}
                color="primary"
                className="px-4"
              >
                {action == 'ADD' ? 'Add' : 'Edit'} Product
              </CButton>
            </CRow>
          </CForm>
        </CCol>
        <CCol>
          {/* <ImageUploader
            withIcon={false}
            singleImage={true}
            defaultImage={displayImages}
            buttonText="Choose image"
            buttonClassName="choose_image"
            // disabled={true}
            onChange={onDrop}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            withPreview={true}
          /> */}
          {selectedImage && (
            <ImageSelector
              selectedImage={selectedImage}
              removeSelectedImage={removeSelectedImage}
            />
          )}
        </CCol>
      </Row>
    </CContainer>
  )
}

export default Actions
