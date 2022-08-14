import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cilDelete, cilBrush, cilNoteAdd, cilPlus } from '@coreui/icons'
import { confirmAlert } from 'react-confirm-alert'
import { CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DataTable from 'react-data-table-component'

import { Button } from 'reactstrap'

import Helpers from '../../utils/Helpers'
import '../Products/react-confirm-alert.css'
import './Category.scss'
import CategoryModal from './CategoryModal'

const Category = () => {
  const [categories, setCategories] = useState([])
  const [modalState, setModalState] = useState(false)
  const [modalType, setModalType] = useState({ type: 'CLICK', id: '' })
  const [details, setDetails] = useState({})
  const navigate = useNavigate()

  const fetchCategories = () => {
    Helpers.axiosGetCall(`/category`).then((response) => {
      setCategories(response)
    })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const deleteProduct = async (id) => {
    Helpers.axiosDeleteCall(`/category/${id}/delete`).then((response) => {
      if (response.message == 'Success') {
        fetchCategories()
      }
    })
  }

  const checkConfirm = (id) => {
    confirmAlert({
      message: 'Are you sure to delete this Product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteProduct(id),
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    })
  }
  const getCategoryDetails = (categories, id) => categories.find((k) => k._id === id)
  const getsubCategoryDetails = (categories, id) => categories.find((k) => k._id === id)
  const callBack = () => {
    fetchCategories()
  }
  const toggle = ({ type, id }) => {
    setModalType({ type: type, id: id })
    setModalState(!modalState)

    if (type === 'EDIT_CATEGORY') {
      setDetails(getCategoryDetails(categories, id))
    }

    if (type === 'EDIT_SUB_CATEGORY') {
      Helpers.axiosGetCall(`/sub-category/${id}`).then((response) => {
        setDetails(response)
      })
    }
    if (type === 'ADD_SUB_CATEGORY') {
      // Helpers.axiosGetCall(`/category`).then((response) => {
      //   setDetails(response)
      // })
    }

    if (type === 'CLICK') {
      setDetails({})
    }
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: 'Sub categories',
      cell: (row) => (
        <div className="SubCategoryChip-ChipCard">
          {row.sub_categories.length !== 0 ? (
            row.sub_categories.map(({ _id, name }) => {
              return (
                <div key={_id} className="SubCategoryChip-Chip">
                  <CIcon
                    className="SubCategoryChip-EditButton"
                    icon={cilBrush}
                    size="sm"
                    onClick={() => toggle({ type: 'EDIT_SUB_CATEGORY', id: _id })}
                  />
                  <span className="SubCategoryChip-Label">{name}</span>
                  <CIcon icon={cilDelete} size="sm" className="SubCategoryChip-DeleteButton" />
                </div>
              )
            })
          ) : (
            <CIcon
              icon={cilPlus}
              onClick={() => toggle({ type: 'ADD_SUB_CATEGORY', id: row._id })}
              size="sm"
              title={`Add new sub cateogry for '${row.name}'`}
            />
          )}
        </div>
      ),
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <CIcon icon={cilBrush} onClick={() => toggle({ type: 'EDIT_CATEGORY', id: row._id })} />
          <CIcon icon={cilDelete} onClick={() => checkConfirm(row._id)} />
        </div>
      ),
    },
  ]

  return (
    <div className="Category">
      <Button
        color="info"
        onClick={() => toggle({ type: 'ADD_CATEGORY', id: null })}
        className="mb-2 float-end text-light"
      >
        Add New Category
      </Button>

      <DataTable
        title="Categoires and Sub Categories"
        columns={columns}
        data={categories}
        // defaultSortFieldID={1}
        pagination
        // paginationComponent={BootyPagination}
        // selectableRows
        // selectableRowsComponent={BootyCheckbox}
      />

      <CategoryModal
        isOpen={modalState}
        toggle={toggle}
        modalType={modalType}
        details={details}
        callBack={callBack}
      />
    </div>
  )
}

export default Category
