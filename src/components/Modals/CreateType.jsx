import React, { useState } from 'react'
import styles from '../../pages/Admin/Admin.module.scss'
import axios from 'axios'
import Loader from '../Loader/Loader'

const CreateType = ({active, setActive}) => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState('')
    
    const addType = async () => {
        setLoading(true)
        return await axios.post('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/types', {
            name: value
        })
        .then(response => {
            console.log(response)
        })
        .catch((err) => console.log(err))
        .finally(() => {
            setLoading(false)
            setActive(false)
        });
    }
    
  return (
    <div className={`${styles.modal} ${active ? styles.active : ''}`} onClick={() => setActive(false)}>
        {loading && <Loader />}
        <div className={styles.body} onClick={e => e.stopPropagation()}>
            <input 
                placeholder='Введите название типа' 
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <div className={styles.btns}>
                <button onClick={addType}>Добавить</button>
                <button onClick={() => setActive(false)}>Закрыть</button>
            </div>
        </div>
    </div>
  )
}

export default CreateType