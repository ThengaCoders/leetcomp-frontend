import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const activeStyle = { fontWeight: '700', textDecoration: 'underline' }

  return (
    <header style={{padding: '1rem', borderBottom: '1px solid #ddd', display:'flex', gap: '1rem', alignItems:'center'}}>
      <h1 style={{margin:0}}>MyApp</h1>
      <nav style={{marginLeft: '1rem'}}>
        <NavLink to="/" style={({isActive}) => isActive ? activeStyle : undefined}>Home</NavLink>
        {' | '}
        <NavLink to="/rooms/search" style={({isActive}) => isActive ? activeStyle : undefined}>Search</NavLink>
        {' | '}
        <NavLink to="/rooms/create" style={({isActive}) => isActive ? activeStyle : undefined}>Create</NavLink>
        {' | '}
        <NavLink to="/rooms/" style={({isActive}) => isActive ? activeStyle : undefined}>MyRooms</NavLink>
        {' | '}
        <NavLink to="/rooms/1" style={({isActive}) => isActive ? activeStyle : undefined}>Room 1</NavLink>
      </nav>
    </header>
  )
}