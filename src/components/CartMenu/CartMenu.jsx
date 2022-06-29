import React, { useContext, useEffect, useState } from 'react'
import { calcTotalPrice } from '../../utils/consts'
import styles from './CartMenu.module.scss'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const CartMenu = observer(({ items, deleteItem }) => {
    const {device} = useContext(Context)
  return (
    <div className={`${styles.cart_menu} ${device.basketItems ? styles.active : '' }`}>
        <div className={styles.menu__header}>
            <h1>Корзина</h1>
            <CancelPresentationIcon onClick={() => device.setBasketItems(!device.basketItems)} />
        </div>
        <div className={styles.menu__body}>
            {items.length > 0 
                ?   items.map((item, id) => 
                        <div className={styles.menu__item} key={id} >
                            <div className={styles.body}>
                                <img alt={item.name} src={item.file} />
                                <div className={styles.menu__info}>
                                    <div style={{marginBottom: '10px'}}>
                                        {item.name}
                                    </div>
                                    {item.price} руб.
                                </div>
                            </div>
                            <div className={styles.delete} onClick={() => deleteItem(item.id)}>
                                <DeleteIcon />
                            </div>
                        </div>
                    )
                :   'Корзина пуста'
            }
        </div>
        {items.length > 0 
            ?   <div className={styles.arrange}>
                    <div className={styles.total_price}>
                        <span>Итого:</span>
                        <span>{calcTotalPrice(items)} руб.</span>
                    </div> 
                    <button className={styles.button}>
                        Оформить заказ
                    </button>  
                </div> 
            :   null
        }
    </div>
  )
})

export default CartMenu