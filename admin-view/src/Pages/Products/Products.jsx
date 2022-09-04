import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cilDelete, cilBrush } from '@coreui/icons'
import { confirmAlert } from 'react-confirm-alert'
import { CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DataTable from 'react-data-table-component'

import Helpers from '../../utils/Helpers'
import './react-confirm-alert.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from 'src/Redux/Actions'

const Products = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productsReducer = useSelector((state) => state.productsReducer)
  const { products } = productsReducer || []

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const deleteProduct = async (id) => {
    Helpers.axiosDeleteCall(`/product/${id}/delete`).then((response) => {
      if (response.message == 'Success') {
        dispatch(fetchProducts())
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
      name: 'Company',
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Image',
      button: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          {console.log(row.imageName)}
          <img src={`${process.env.PUBLIC_URL}/uploads/${row.imageName}`} width="50px" />
        </div>
      ),
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <CIcon icon={cilBrush} onClick={() => navigate(`/products/action/${row._id}`)} />
          <CIcon icon={cilDelete} onClick={() => checkConfirm(row._id)} />
        </div>
      ),
    },
  ]

  return (
    <CContainer>
      <DataTable title="Products" columns={columns} data={products} />
    </CContainer>
  )
}

export default Products
