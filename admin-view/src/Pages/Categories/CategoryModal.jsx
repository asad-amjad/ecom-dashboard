import React, { useEffect, useState } from 'react'
import { CContainer, CFormInput, CInputGroup } from '@coreui/react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { any } from 'prop-types'

import Helpers from '../../utils/Helpers'
import { fetchCategories } from '../../Redux/Actions'
import { useDispatch, useSelector } from 'react-redux'

const CategoryModal = ({ isOpen, toggle, modalType, callBack }) => {
  const [name, setName] = useState('')
  const [categoryDetails, setCategoryDetails] = useState({})
  const dispatch = useDispatch()
  const getCategoryDetails = (categories, id) => categories.find((k) => k._id === id)
  const categoriesReducer = useSelector((state) => state.categoriesReducer)

  const getSubCategoryDetails = (entireObj, keyToFind, valToFind) => {
    let foundObj
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue
      }
      return nestedValue
    })
    return foundObj
  }

  const checkAndFetch = (modalType) => {
    const { type, id } = modalType
    switch (type) {
      case 'EDIT_CATEGORY':
        return setCategoryDetails(getCategoryDetails(categoriesReducer.categories, id))
      case 'EDIT_SUB_CATEGORY':
        return setCategoryDetails(getSubCategoryDetails(categoriesReducer, '_id', modalType.id))
      default:
        return null
    }
  }

  useEffect(() => {
    checkAndFetch(modalType)
    setName('')
  }, [modalType])

  useEffect(() => {
    setName(categoryDetails.name)
  }, [categoryDetails])

  const selectUrl = {
    ADD_CATEGORY: '/category/add',
    EDIT_CATEGORY: `/category/${categoryDetails._id}/update`,
    ADD_SUB_CATEGORY: '/sub-category/add',
    EDIT_SUB_CATEGORY: `/sub-category/${categoryDetails._id}/update`,
  }

  const selectCallAction = {
    ADD_CATEGORY: Helpers.axiosPostCall,
    ADD_SUB_CATEGORY: Helpers.axiosPostCall,

    EDIT_CATEGORY: Helpers.axiosPutCall,
    EDIT_SUB_CATEGORY: Helpers.axiosPutCall,
  }

  const selectDataToSave = {
    ADD_CATEGORY: { name, sub_categories: [] },
    EDIT_CATEGORY: { name },

    ADD_SUB_CATEGORY: { name, parent_category: modalType.id },
    EDIT_SUB_CATEGORY: { name },
  }

  const handleSubmit = (type) => {
    selectCallAction[type](selectUrl[type], selectDataToSave[type]).then((response) => {
      if (response) {
        dispatch(fetchCategories())
        toggle({ type: 'CLICK', id: '' })
      }
    })
  }

  return (
    <Modal isOpen={isOpen} toggle={() => toggle({ type: 'CLICK', id: '' })} className="">
      <ModalHeader toggle={() => toggle({ type: 'CLICK', id: '' })}>{modalType.type}</ModalHeader>
      <ModalBody>
        <CContainer>
          <CInputGroup className="mb-3">
            <CFormInput
              placeholder="Enter Name"
              type="text"
              value={name || ''}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </CInputGroup>
        </CContainer>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            handleSubmit(modalType.type)
          }}
        >
          {modalType.type}
        </Button>{' '}
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
  // details: any,
  callBack: any,
}

export default CategoryModal
