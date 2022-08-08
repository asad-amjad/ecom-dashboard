import React from 'react'
import { AppFooter } from '../components/index'
import AppHeader from '../StoreLayout/AppHeader'
import AppSidebar from '../StoreLayout/AppSidebar'
import AppContent from '../StoreLayout/AppContent'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
