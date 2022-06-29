import axios from 'axios'
import React, {  useContext, useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './Shop.module.scss'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import CartMenu from '../../components/CartMenu/CartMenu'
import { useNavigate } from 'react-router-dom';
import { ONEDEVICE_ROUTE } from '../../utils/consts';

const Shop = observer(() => {
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])
  const {device} = useContext(Context)
  const [isCartMenuVisible, setIsCartMenuVisible] = useState(false);
  const navigate = useNavigate()
  const {setOneDevice} = useContext(Context)

  useEffect(() => {
    const getDevices = async () => {
      setLoading(true)
      return await axios.get(`https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/types/${device.selectedType}/devices`)
      .then(response => {
        setData(response.data)
      })
      .catch((err) => console.log(err))
      .finally(() => (setLoading(false)));
    }
    getDevices()
  }, [device.selectedType])


  useEffect(() => {
    const handleSearch = async (e) => {
      setLoading(true)
      return await axios.get(`https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/types/${device.selectedType}/devices?q=${value}`)
      .then(response => {
        const newResponse = response.data.filter(user => 
          user.name.toLowerCase().includes(value) || user.name.includes(value)
        )
        setData(newResponse)
      })
      .catch((err) => console.log(err))
      .finally(() => (setLoading(false)));
    }
    handleSearch()
  }, [value])

  useEffect(() => {
      setLoading(true)
      axios.get('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/basket')
      .then(response => {
        setCart(response.data)
      })
      .catch((err) => console.log(err))
      .finally(() => (setLoading(false)));
  }, [])

  const addToCart = async(item) => {
    setLoading(true)
    await axios.post('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/basket', {
      name: item.name,
      price: item.price,
      file: item.file
    })
    .then(response => {
      setCart(response.data)
    })
    .catch((err) => console.log(err))
    .finally(() => {(setLoading(false))});
    await axios.get('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/basket')
    .then(response => {
      setCart(response.data)
    })
    .catch((err) => console.log(err))
    .finally(() => {(device.setBasketItems(true))});
  }

  const deleteItem = (id) => {
    axios.delete(`https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/basket/${id}`)
    setCart(prevState => prevState.filter(cart => cart.id !== id))
  }

  const addToFavorite = async(item) => {
    return await axios.post('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/favorites',{
      name: item.name,
      price: item.price,
      file: item.file
    })
    .then(response => {
      setCart(response.data)
    })
    .catch((err) => console.log(err))
    .finally(() => {(setLoading(false))});
  }

  const getOneDevice = async(item) => {
    setLoading(true)
    navigate(ONEDEVICE_ROUTE)
    return await axios.get(`https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/types/${item.type}/devices/${item.id}`)
    .then(response => {
      setOneDevice(response.data)
    })
    .catch((err) => console.log(err))
    .finally(() => (setLoading(false))); 
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
        {loading && <Loader />}
        <input 
          placeholder='Поиск...' 
          value={value}
          onChange={e => setValue(e.target.value)}
          className={styles.search}
        />
        <div className={styles.shop} onClick={() => device.setBasketItems(false)} >
        {data.map((device, id) => 
          <div key={id} className={styles.shop__item} >
            <div className={styles.img} onClick={() => getOneDevice(device)}>
              <img alt={device.name} src={device.file} />
            </div>
            <div className={styles.info} >
              <div className={styles.name}>
                {device.name}
              </div>
            </div>
            <div className={styles.price}>
              {device.price} p.
            </div>
            <div className={styles.shop__bottom}>
              <button className={styles.basket} onClick={() => addToCart(device)}>
                В корзину
              </button>
              <div className={styles.like} onClick={() => addToFavorite(device)}>
                <FavoriteIcon />
              </div>
            </div>
          </div>
        )}
        </div>
        <CartMenu deleteItem={deleteItem} items={cart} isCartMenuVisible={isCartMenuVisible} setIsCartMenuVisible={setIsCartMenuVisible}/>
    </div>
  )
})

export default Shop