import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../img/logo.png'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'

const Navbar = ()=>{
    const {currentUser, logout} = useContext(AuthContext);

    return(
        <div className='navbar'>
            <div className='container'>
                <div className="logo">
                    <Link to='/'><img src={Logo} alt="logo"/></Link>
                </div>
                <div className="links">
                    <Link className='link'to='/?cat=art'><h6>ART</h6></Link>
                    <Link className='link'to='/?cat=science'><h6>SCIENCE</h6></Link>
                    <Link className='link'to='/?cat=technology'><h6>TECHNOLOGY</h6></Link>
                    <Link className='link'to='/?cat=cinema'><h6>CINEMA</h6></Link>
                    <Link className='link'to='/?cat=design'><h6>DESIGN</h6></Link>
                    <Link className='link'to='/?cat=food'><h6>FOOD</h6></Link>
                    {/* <span>{currentUser?.username}</span> */}
                    {currentUser ? <span><h6>{currentUser?.username.charAt(0).toUpperCase() + currentUser?.username.slice(1)}</h6></span> : <span></span>}
                    {/* here ?. is the optional chaininng operator i.e. it will try to access username only if 
                     currentUser is not null which it can be in this case*/}
                    {currentUser? <span onClick={logout}><h6>Logout</h6></span> : <Link className='link' to='/login'>Login</Link>}
                    <span className='write'><Link className='link' to='/write'>Write</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Navbar