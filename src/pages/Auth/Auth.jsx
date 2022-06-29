import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {  LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts'
import { signInWithEmailAndPassword  } from "firebase/auth";
import { createUserWithEmailAndPassword   } from "firebase/auth";
import {auth} from '../../firebase'
import styles from './Auth.module.scss'
import {observer} from 'mobx-react-lite'
import { AuthContext } from '../../context/AuthContext';

const Auth = observer(() => {
    const location = useLocation()
    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const isLogin = location.pathname === LOGIN_ROUTE
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword (auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({type:'LOGIN', payload:user})
                navigate(SHOP_ROUTE)
            })
            .catch(() => {
                setError(true)
            });
    }
    const handleReg = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword (auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({type:'LOGIN', payload:user})
                navigate(SHOP_ROUTE)
            })
            .catch(() => {
                setError(true)
            });
    }

  return (
    <div className={styles.auth}>
         <form className={styles.form} onSubmit={isLogin ? handleLogin : handleReg}>
            {isLogin ? <h1>Авторизация</h1>
                :
                <h1>Регистрация</h1>
            }
            <input 
                type='email' 
                placeholder='Введите email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password' 
                placeholder='Введите password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /> 
            <div>
                {isLogin 
                    ? 
                    <div>
                        Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся</Link>
                    </div>
                    :
                    <div>
                        Есть аккаунт? <Link to={LOGIN_ROUTE}>Зайди</Link>
                    </div>
                }
                {isLogin ? <button type='submit'>Вход</button> : <button type='submit'>Регистрация</button>}
            </div>
            {error && <span>Неправильный email или пароль</span>}
        </form>
    </div>
  )
})

export default Auth