import React from 'react'
import './Header.css'
import {BiLogOut} from 'react-icons/bi'
const Header = () => {
  return (
    <div className='head'>
        <div>Todolist</div>
        <div className='hor'>
            <div>username</div>
            <div className='logout'><BiLogOut size={35}/></div>
        </div>
    </div>
  )
}

export default Header