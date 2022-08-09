import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cilDelete, cilBrush } from '@coreui/icons'
import { confirmAlert } from 'react-confirm-alert'
import { CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DataTable from 'react-data-table-component'

import Helpers from '../../utils/Helpers'
import '../Products/react-confirm-alert.css'

const Category = () => {
  const [products, setProducts] = useState([])
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

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row) => row.createdAt,
      sortable: true,
    },

    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <CIcon icon={cilBrush} onClick={() => navigate(`/categories/action/${row._id}`)} />
          <CIcon icon={cilDelete} onClick={() => checkConfirm(row._id)} />
        </div>
      ),
    },
  ]

  return (
    <CContainer>
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
    </CContainer>
  )
}

export default Category
