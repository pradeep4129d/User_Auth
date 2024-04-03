import React, { useState } from 'react'
import { useLogin } from './context';

const Home = (props) => {
    const {className}=props;
    const {login}=useLogin()
  return (
    <div className={className}>
      {login ?<p>your Session will expire in if you close the tab</p>:<p>there's nothing to show here please login</p>}
      
    </div>
  )
}

export default Home