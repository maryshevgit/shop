import React, { useContext } from 'react'
import styles from './Sidebar.module.scss'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE,  FAVORITE_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import Favorite from '@mui/icons-material/Favorite';

const Sidebar = observer(() => {
  const navigate = useNavigate()

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(AuthContext)
  const {device} = useContext(Context)

  const logOut = () => {
    dispatch({type:'LOGOUT'})
    navigate(LOGIN_ROUTE)
  }
  return (
    <div className={styles.sidebar} >
      {currentUser ? <button onClick={logOut}><LogoutIcon /></button> : <Link to={LOGIN_ROUTE}><PersonIcon /></Link> }
      <ShoppingBagIcon onClick={() => device.setBasketItems(!device.basketItems)} />
      {currentUser && <Link to={ADMIN_ROUTE}><AdminPanelSettingsIcon /></Link>}
      {currentUser && <Link to={FAVORITE_ROUTE}><Favorite /></Link>}
    </div>
  )
})

export default Sidebar