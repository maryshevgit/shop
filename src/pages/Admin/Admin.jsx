import React, { useState } from 'react'
import CreateDevice from '../../components/Modals/CreateDevice'
import CreateType from '../../components/Modals/CreateType'
import styles from './Admin.module.scss'

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  return (
    <div className={styles.admin}>
      <button onClick={() => setTypeVisible(true)}>Добавить тип</button>
      <button onClick={() => setDeviceVisible(true)}>Добавить устройство</button>
      <CreateType active={typeVisible} setActive={setTypeVisible} />
      <CreateDevice active={deviceVisible} setActive={setDeviceVisible} />
    </div>
  )
}

export default Admin