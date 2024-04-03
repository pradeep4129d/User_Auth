import React, { useEffect, useState } from 'react'
const Profile = () => {
  const [data,setdata]=useState({})
  const [isloading,setisloading]=useState(true)
  useEffect(()=>{
    const token=JSON.parse(sessionStorage.getItem('jwt'));
    const fetchdata=async()=>{
      try {
        const responce=await fetch('http://localhost:3000/Auth/getuser',{
          method:'GET',
          headers:{'Content-Type':'application/json',
                  'authorization':token}
        })
        const res=await responce.json()
        console.log(res)
        if(res.success){
          setisloading(false)
          setdata(res.userdata)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata()
  },[])
  if(isloading){
    return <div className="profile">...loading</div>
  }
  else{
    return (
      <div className="profile">
        <div className="details">
          <div className='i-con'><ion-icon name="person-circle-outline"></ion-icon></div>
          <div className="data">
          <p>User Details</p>
          <p>Username:{data.username}</p>
          <p>Password:{data.password}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile