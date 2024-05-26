import './index.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { RootState } from '../../store/store';
import { login } from '../../store/loginSlicer';
import { updateFromLocalStorage } from '../../store/watchListSlicer';
import { useNavigate } from 'react-router-dom';

function LoginCard() {

  const dispatch = useDispatch()
  const { loggedIn } = useSelector((state: RootState) => state.login);
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn, navigate]
  )


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(login(email))
    dispatch(updateFromLocalStorage())
    setEmail('')
    navigate('/')
  }


  return (
    <div className='mm--login-card--container'>
        <div className='mm-login-card--form-container'>
        <h1 className='mm-login-card--form-title'>Login</h1>
        <form className='mm--login-card--form' onSubmit={onSubmit}>
            <input className='mm--login-card--form-email' value={email} type="email" name="email" placeholder='Enter your email here...' onChange={(e)=>{
                setEmail(e.currentTarget.value)
            }}/>
            <button disabled={!email} className='mm--login-card--form-submit' type="submit">Submit</button>
        </form>
        </div>
    </div>
  )
}

export default LoginCard