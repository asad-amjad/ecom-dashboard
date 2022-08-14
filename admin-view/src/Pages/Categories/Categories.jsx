import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cilDelete, cilBrush } from '@coreui/icons'
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
  const [products, setProducts] = useState([])
  const [modalState, setModalState] = useState(false)
  const [modalType, setModalType] = useState({ type: '', id: '' })

  const navigate = useNavigate()
  const fetchPrducts = () => {
    Helpers.axiosGetCall(`/category`).then((response) => {
      setProducts(response)
    })
  }

  useEffect(() => {
    fetchPrducts()
  }, [])

  const deleteProduct = async (id) => {
    Helpers.axiosDeleteCall(`/category/${id}/delete`).then((response) => {
      if (response.message == 'Success') {
        fetchPrducts()
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

  const toggle = ({ type, id }) => {
    setModalType({ type: type, id: id })
    setModalState(!modalState)
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
          {row.sub_categories.map(({ _id, name }) => {
            return (
              <div key={_id} className="SubCategoryChip-Chip">
                <CIcon
                  className="SubCategoryChip-EditButton"
                  icon={cilBrush}
                  onClick={() => toggle({ type: 'SUB_CATEGORY_EDIT', id: _id })}
                />
                <span className="SubCategoryChip-Label">{name}</span>
                <CIcon icon={cilDelete} className="SubCategoryChip-DeleteButton" />
              </div>
            )
          })}
        </div>
      ),
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <CIcon icon={cilBrush} onClick={() => toggle({ type: 'CATEGORY_EDIT', id: row._id })} />
          <CIcon icon={cilDelete} onClick={() => checkConfirm(row._id)} />
        </div>
      ),
    },
  ]

  return (
    <div className="Category">
      <Button
        color="info"
        onClick={() => toggle({ type: 'ADD_NEW_CATEGORY', id: null })}
        className="mb-2"
      >
        Add New Category
      </Button>

      <DataTable
        title="Categoires"
        columns={columns}
        data={products}
        // defaultSortFieldID={1}
        // pagination
        // paginationComponent={BootyPagination}
        // selectableRows
        // selectableRowsComponent={BootyCheckbox}
      />

      <CategoryModal isOpen={modalState} toggle={toggle} modalType={modalType} />
    </div>
  )
}

export default Category
