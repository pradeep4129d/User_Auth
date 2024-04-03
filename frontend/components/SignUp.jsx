import React, { useEffect, useState } from 'react'
import "./SignUp.css"
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { useLogin } from './context';

const SignUp = (props) => {
  const {setlogin}=useLogin()
  useEffect(()=>{
    const token=JSON.parse(sessionStorage.getItem('jwt'));
    if(token){
      setlogin(true)
    }
    else
    setlogin(false)
  },[])
  const {className,heading,description,path,styles}=props;
  const [classname1,setClassname]=useState('')
  const [classname2,setClassname2]=useState('')
  const [data ,setdata]=useState({username:'',password:''})
  const [nav,setnav]=useState({bool:false,pathto:''})
  const [popup,setpopup]=useState(false)
  const [isloading ,setisloading]=useState(false)
  const navigate=useNavigate()
  
  const handleChange=(e)=>{
    (e.target.value==='')? setClassname(''):setClassname('data')
    setdata({...data,username:e.target.value})
  }
  const handleChange2=(e)=>{
    (e.target.value==='')? setClassname2(''):setClassname2('data')
    setdata({...data,password:e.target.value})
  }
  const submit=async(e)=>{
    e.preventDefault()
    if(heading==='Sign Up'){
    try {
      setisloading(true)
      const responce = await fetch('http://localhost:3000/Auth/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const res=await responce.json()
      console.log(res)
      if(res.success){
        sessionStorage.setItem('jwt',JSON.stringify(res.token))
        setisloading(false)
        setlogin(true)
        setpopup(true)
        navigate('/')
      }
      else{
        setisloading(false)
        if(res.success)
        {
          alert("User Already Exits")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(heading==='Login'){
    try {
      setisloading(true)
      const responce=await fetch('http://localhost:3000/Auth/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const res=await responce.json()
      console.log(res)
      if(res.success)
      {
        
        sessionStorage.setItem('jwt',JSON.stringify(res.token))
        setisloading(false)
        setlogin(true)
        navigate('/')
      }
      else{
        setisloading(false)
        if(res.success)
        {
          alert("Invalid Credentials")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
  return (
    <>
    <div className={`signin-container ${className}`}>
      <h1 className={`signin ${styles}`}>
        {heading}
      </h1>
      <form  onSubmit={submit} className='form'>
        <input type="text" required='true' value={data.username} className={`input1 ${classname1}`} onChange={handleChange} />
        <label htmlFor="text" className='email'>Username</label>
        <input type='password' required='true' value={data.password} className={`input2 ${classname2}`} onChange={handleChange2} />
        <label htmlFor='password' className='password'>Password</label>
        <button className={`sub-btn ${styles}`} type='submit'>
          {heading}
        </button>
        <Link to={path} className='rem'>{description}</Link>
        { nav.bool  && <Navigate to={nav.pathto}/>}
      </form>
      </div>
    {(popup) && (<div className="popup">
      <div className='popup-container'>
        <p>Account Created Successfully</p>
        <p>please login to your account</p>
        <button className='continue' onClick={()=>{
          setpopup(false)
        }}>Continue</button>
      </div>
    </div>)}
    {
      (isloading) && (<p className='loading'>...loading</p>)
    }
    </>
  );
};
export default SignUp;