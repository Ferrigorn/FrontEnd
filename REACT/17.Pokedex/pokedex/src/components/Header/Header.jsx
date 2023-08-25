import Navbar from "../Navbar/Navbar"
import Title from "../Title/Title"
import "./Header.css"

import React from 'react'

const Header = () => {
  return (
    <header>
        <Title>Larry's Pokemon</Title>
        <Navbar/>
    </header>
  )
}

export default Header