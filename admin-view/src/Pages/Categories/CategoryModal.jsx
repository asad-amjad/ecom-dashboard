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

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap'

import Helpers from '../../utils/Helpers'
import { any, func } from 'prop-types'

const CategoryModal = ({ isOpen, toggle, modalType }) => {
  const [name, setName] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const [action, setAction] = useState('ADD')
  const [error, setError] = useState(false)
  // console.log(selectedCategory)
  const navigate = useNavigate()
  const param = useParams()

  // const fetchPrduct = (id) => {
  //   Helpers.axiosGetCall(`/category/${id}`).then((response) => {
  //     const { name } = response
  //     setName(name)
  //   })
  // }

  // useEffect(() => {
  //   if (param.id) {
  //     fetchPrduct(param.id)
  //     setAction('EDIT')
  //   }
  //   fetchCategories()
  // }, [])

  const fetchCategories = () => {
    Helpers.axiosGetCall(`/category`).then((response) => {
      setCategories(response)
    })
  }

  // const path = window.location.hash
  // //Check Redirection from Edit to Add

  // useEffect(() => {
  //   if (param.id) {
  //     fetchPrduct(param.id)
  //     setAction('EDIT')
  //   } else {
  //     setAction('ADD')
  //   }
  // }, [path])

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
    <Modal isOpen={isOpen}toggle={toggle({ type: 'CLOSE', id: null })} className="">
      <ModalHeader toggle={toggle({ type: 'CLOSE', id: null })}>Modal title</ModalHeader>
      <ModalBody>
        {modalType.type}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Do Something
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

CategoryModal.defaultProps = {
  isOpen: any,
  toggle: any,
}

CategoryModal.propTypes = {
  toggle: any,
  isOpen: any,
  modalType: any,
}

export default CategoryModal
