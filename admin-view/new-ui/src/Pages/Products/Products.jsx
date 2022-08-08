import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import DataTable from 'react-data-table-component'
import { cilDelete, cilBrush } from '@coreui/icons'
import { confirmAlert } from 'react-confirm-alert'

import Helpers from '../../utils/Helpers'

const Products = () => {
  const [products, setProducts] = useState([])

  const fetchPrducts = () => {
    Helpers.axiosGetCall(`/product`).then((response) => {
      setProducts(response)
    })
  }

  useEffect(() => {
    fetchPrducts()
  }, [])

  const deleteProduct = async (id) => {
    Helpers.axiosDeleteCall(`/product/${id}/delete`).then((response) => {
      if (response.message == 'Success') {
        fetchPrducts()
      }
    })
  }

  checkConfirm = (id) => {
    confirmAlert({
      message: 'Are you sure you want to delete this item ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleDelete(id),
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
      name: 'Company',
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <CIcon icon={cilBrush} onClick={() => this.checkConfirm(row._id)} />
          <CIcon icon={cilDelete} onClick={() => deleteProduct(row._id)} />
        </div>
      ),
    },
  ]

  return (
    <CContainer>
      <DataTable
        title="Products"
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

export default Products
