import React from 'react'

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const Products = React.lazy(() => import('../Pages/Products/Products'))
const ProductAction = React.lazy(() => import('../Pages/Products/Actions'))
const Categories = React.lazy(() => import('../Pages/Categories/Categories'))
const CategoryAction = React.lazy(() => import('../Pages/Categories/CategoryAction'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', element: Dashboard },
  { path: '/products', element: Products, exact: true },
  { path: '/products/action', element: ProductAction },
  { path: '/products/action/:id', element: ProductAction }, //@TODO

  { path: '/categories', name: 'Theme', element: Categories, exact: true },
  { path: '/categories/action', name: 'Theme', element: CategoryAction, exact: true },
]

export default routes
