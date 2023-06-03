import React, { useState } from 'react'
import './Header.css'
import {BiLogOut} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const Navigate=useNavigate();
  const logOutHandler=()=>{
    localStorage.removeItem('userid');
    Navigate('/login');
  }
  return (
    <div className='head'>
        <div id='title'>TODOLIST</div>
        <div className='hor'>
            <div>{localStorage.getItem('userid')}</div>
            <div onClick={logOutHandler} className='logout'><BiLogOut size={30}/></div>
        </div>
    </div>
  )
}

export default Header