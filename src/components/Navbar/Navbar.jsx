import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { SHOP_ROUTE } from '../../utils/consts'
import styles from './Navbar.module.scss'
import axios from 'axios'
import Loader from '../Loader/Loader';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'

const Navbar = observer(() => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const {device} = useContext(Context)

    useEffect(() => {
        const getTypes = async () => {
            setLoading(true)
            return await axios.get('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/types')
            .then(response => {
              setData(response.data)
            })
            .catch((err) => console.log(err))
            .finally(() => (setLoading(false)));
        }
        getTypes()
    }, [])

    const select = (id) => {
        device.setSelectedType(id)
    }

  return (
    <div className={styles.navbar}>
        {loading && <Loader />}
        <div className={styles.logo}>
            <Link to={SHOP_ROUTE}>ERDEM</Link>
        </div>
        <div className={styles.shop}>
            SHOP
        </div>
        <div className={styles.navigation}>
            {data.map((type, id) =>
                <Link to={SHOP_ROUTE}>
                    <li key={id} onClick={() => select(type.id)} className={styles.navigation__item}>
                        {type.name}
                    </li>
                </Link>
            )}
        </div>
    </div>
  )
})

export default Navbar