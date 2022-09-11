import React from 'react'

const Dashboard = React.lazy(() => import('../Pages/Dashboard/Dashboard'))
const Products = React.lazy(() => import('../Pages/Products/Products'))
const ProductAction = React.lazy(() => import('../Pages/Products/Actions'))
const Categories = React.lazy(() => import('../Pages/Categories/Categories'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', element: Dashboard },
  { path: '/products', element: Products, exact: true },
  { path: '/products/action', element: ProductAction },
  { path: '/products/action/:id', element: ProductAction }, //@TODO
  { path: '/categories', element: Categories, exact: true },
]

export default routes
