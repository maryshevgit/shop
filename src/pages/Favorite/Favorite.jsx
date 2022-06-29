import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import styles from '../Shop/Shop.module.scss'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

const Favorite = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/favorites')
        .then(response => {
          setData(response.data)
        })
        .catch((err) => console.log(err))
        .finally(() => (setLoading(false)));
    }, [])

    const favoriteDel = (id) => {
        axios.delete(`https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/favorites/${id}`)
        setData(prevState => prevState.filter(favorite => favorite.id !== id))
    }

  return (
    <div className={styles.favorite}>
        <h1 style={{padding: '30px'}}>Мои закладки</h1>
        {loading && <Loader />}
        <div className={styles.shop} >
            {data.map((device, id) => 
                <div key={id} className={styles.shop__item}>
                    <div className={styles.img}>
                        <img alt={device.name} src={device.file} />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>
                            {device.name}
                        </div>
                    </div>
                    <div className={styles.price}>
                        {device.price} р.
                    </div>
                    <div className={styles.shop__bottom}>
                        <div className={styles.like}  onClick={() => favoriteDel(device.id)} >
                            <HeartBrokenIcon />
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Favorite