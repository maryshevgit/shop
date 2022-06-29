import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { authRoutes, publicRoutes } from '../../routes'
import { SHOP_ROUTE } from '../../utils/consts'


const AppRouter = () => {
    const {currentUser} = useContext(AuthContext)

  return (
    <Routes>
        {currentUser && authRoutes.map(route => 
            <Route path={route.path} key={route.path} element={route.element} />
        )}
        {publicRoutes.map(route =>
            <Route path={route.path} key={route.path} element={route.element} />
        )}
        <Route
            path='*'
            element={<Navigate to={SHOP_ROUTE} replace />}
        />
    </Routes>
  )
}

export default AppRouter