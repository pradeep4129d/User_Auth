import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import './header.css'
import { useLogin } from './context';

const Header = () => {
  const {login,setlogin}=useLogin();
  const [navstate,setnav]=useState('nav-container')
  const [classname1,setClassname1]=useState('')
  useEffect(()=>{
    const token=JSON.parse(sessionStorage.getItem('jwt'));
    if(token){
      setlogin(true)
    }
    else
    setlogin(false)
  },[])
  return (
    <>
    <div className='container'>
        <h2>Authentication</h2>
        <div onClick={()=>{setClassname1('')
      setnav('nav-container')}} className={'close '+navstate}><ion-icon name="close-outline"></ion-icon></div>
        <div onClick={()=>{setnav('m-nav')
        setClassname1('m-nav')
      }} className={'menu '+classname1}><ion-icon name="menu-outline"></ion-icon></div>
        <nav className={navstate}>
            <Link to='/'>Home</Link>
            <Link to='contact'>Contact us</Link>
            {!login && <Link id='ln-btn' to='/SignUp'>Sign up</Link>}
            {login && <Link id='ln-btn' to='/profile'>Profile</Link>}
        </nav>
    </div>
    </>
  )
}
export default Header