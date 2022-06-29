import axios from 'axios'
import React, { useContext } from 'react'
import { Context } from '../..'
import CartMenu from '../../components/CartMenu/CartMenu'
import styles from './OneDevice.module.scss'

const OneDevice = () => {
  const {device, oneDevice, setCart, cart, isCartMenuVisible, setIsCartMenuVisible} = useContext(Context)

  const addToCart = async(item) => {
    await axios.post('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/basket', {
      name: item.name,
      price: item.price,
      file: item.file
    })
    .then(response => {
      setCart(response.data)
    })
    .catch((err) => console.log(err))
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

  return (
    <div className={styles.device} onClick={(e) => e.stopPropagation()}>
      <h1>{oneDevice.name}</h1>
      <div className={styles.device__body} onClick={() => device.setBasketItems(false)}>
        <div className={styles.device__img}>
          <img src={oneDevice.file} alt={oneDevice.name} />
        </div>
        <div className={styles.device__basket}>
          {oneDevice.price} руб.
          <button onClick={() => addToCart(oneDevice)}>Добавить в корзину</button>
        </div>
      </div>
      <CartMenu deleteItem={deleteItem} items={cart} isCartMenuVisible={isCartMenuVisible} setIsCartMenuVisible={setIsCartMenuVisible}/>
    </div>
  )
}

export default OneDevice