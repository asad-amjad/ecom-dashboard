import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cilDelete, cilBrush, cilPlus } from '@coreui/icons'
import { confirmAlert } from 'react-confirm-alert'
import { Button } from 'reactstrap'

import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'

import { fetchCategories } from '../../Redux/Actions'
import Helpers from '../../utils/Helpers'
import CategoryModal from './CategoryModal'
import '../Products/react-confirm-alert.css'
import './Category.scss'

const Category = () => {
  const [modalState, setModalState] = useState(false)
  const [modalType, setModalType] = useState({ type: 'CLICK', id: '' })

  const categoriesReducer = useSelector((state) => state.categoriesReducer)
  const { categories } = categoriesReducer || []

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const deleteProduct = async (type, id) => {
    const urlSelect = {
      DELETE_CATEGORY: `/category/${id}/delete`,
      DELETE_SUB_CATEGORY: `/sub-category/${id}/delete`,
    }
    Helpers.axiosDeleteCall(urlSelect[type]).then((response) => {
      if (response.message == 'Success') {
        dispatch(fetchCategories())
      }
    })
  }

  const checkConfirm = ({ type, id }) => {
    confirmAlert({
      message: 'Are you sure to delete this Category?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteProduct(type, id),
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    })
  }

  const toggle = ({ type, id }) => {
    setModalState(!modalState)
    setModalType({ type: type, id: id })
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => <span className="text-capitalize">{row.name}</span>,
      sortable: true,
    },
    {
      name: 'Sub categories',
      cell: (row) => (
        <div className="SubCategoryChip-ChipCard align-items-center">
          {row.sub_categories.map(({ _id, name }) => {
            return (
              <div key={_id} className="SubCategoryChip-Chip">
                <CIcon
                  className="EditButton"
                  icon={cilBrush}
                  size="sm"
                  onClick={() => toggle({ type: 'EDIT_SUB_CATEGORY', id: _id })}
                />
                <span className="SubCategoryChip-Label">{name}</span>
                <CIcon
                  icon={cilDelete}
                  onClick={() => checkConfirm({ type: 'DELETE_SUB_CATEGORY', id: _id })}
                  size="sm"
                  className="DeleteButton"
                />
              </div>
            )
          })}
          <div className="SubCategoryChip-AddNew">
            <CIcon
              className="SubCategoryChip-AddButton"
              icon={cilPlus}
              onClick={() => toggle({ type: 'ADD_SUB_CATEGORY', id: row._id })}
              size="sm"
              title={`Add new sub cateogry for '${row.name}'`}
            />
          </div>
        </div>
      ),
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <CIcon
            className="EditButton"
            icon={cilBrush}
            onClick={() => toggle({ type: 'EDIT_CATEGORY', id: row._id })}
          />
          {row.sub_categories.length == 0 && (
            <CIcon
              icon={cilDelete}
              className="DeleteButton"
              onClick={() => checkConfirm({ type: 'DELETE_CATEGORY', id: row._id })}
            />
          )}
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

      <CategoryModal isOpen={modalState} modalType={modalType} toggle={toggle} />
    </div>
  )
}

export default Category
