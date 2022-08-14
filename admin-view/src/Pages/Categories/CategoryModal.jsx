import React, { useEffect, useState } from 'react'
import { CContainer, CFormInput, CInputGroup } from '@coreui/react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { any } from 'prop-types'

import Helpers from '../../utils/Helpers'

const CategoryModal = ({ isOpen, toggle, modalType, details, callBack }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    setName(details.name)
  }, [details])

  const selectUrl = {
    ADD_CATEGORY: '/category/add',
    EDIT_CATEGORY: `/category/${details._id}/update`,

    ADD_SUB_CATEGORY: '/sub-category/add',
    EDIT_SUB_CATEGORY: `/sub-category/${details._id}/update`,
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

    ADD_SUB_CATEGORY: { name, category_id: modalType.id },
    EDIT_SUB_CATEGORY: { name },
  }

  const handleSubmit = (type) => {
    selectCallAction[type](selectUrl[type], selectDataToSave[type]).then((response) => {
      if (response) callBack()
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
              value={name}
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
  details: any,
  callBack: any,
}

export default CategoryModal
