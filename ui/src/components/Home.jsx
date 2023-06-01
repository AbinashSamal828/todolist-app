import React from 'react'
import './Home.css';
import Header from './Header';
import Input from './Input'
import Tasks from './Tasks'

const Home = () => {
  return (
    <div className='background'>
      <div className="container">
        <Header/>
        <Input/>
        <div className='intro'>Here are your tasks..</div>
        <Tasks/>
      </div>
    </div>
  )
}

export default Home