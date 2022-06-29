import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../../pages/Admin/Admin.module.scss'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../../firebase';
import Loader from '../Loader/Loader';

const CreateDevice = ({active, setActive}) => {
  const [value, setValue] = useState('')
  const [types, setTypes] = useState([])
  const [selectValue, setSelectValue] = useState(1)
  const [priceValue, setPriceValue] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState('')
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
        setLoading(true)
        return await axios.get('https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/types')
        .then(response => {
          setTypes(response.data)
        })
        .catch((err) => console.log(err))
        .finally(() => (setLoading(false)));
    }
    getTypes()
    console.log(types)
}, [])

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const addDevice = async () => {
    setLoading(true)
    return await axios.post(`https://62b5f3ff42c6473c4b3d7f0b.mockapi.io/types/${selectValue}/devices`, {
        name: value,
        type: selectValue,
        price: priceValue,
        file: data.img,
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
                placeholder='Введите название устройства' 
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
              {types.map(option =>
                <option value={option.id} key={option.id}>{option.name}</option>
              )}
            </select>
            <input 
                placeholder='Введите цену устройства' 
                value={priceValue}
                onChange={e => setPriceValue(e.target.value)}
            />
            <input 
              type='file'
              id='file'
              onChange={e => setFile(e.target.files[0])}
            />
            <div className={styles.btns}>
                <button onClick={addDevice}>Добавить</button>
                <button onClick={() => setActive(false)}>Закрыть</button>
            </div>
        </div>
    </div>
  )
}

export default CreateDevice