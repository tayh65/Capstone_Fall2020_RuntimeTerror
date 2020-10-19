import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { SideBarData } from './NavBarData.component';
import "../css/NavBar.css"
import {IconContext} from 'react-icons';


function NavBar() {
    const [sidebar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{color: "#fff"}}>
            <div className="navbar">
                <Link to="#" className="menu_bars">
                    <FaBars onClick= {showSideBar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav_menu'}>
                <ul className='nav_menu_items'>
                    <li className='navbar_toggle'>
                        <Link to='#' className='menu_bars'>
                            <AiOutlineClose />
                        </Link>

                    </li>
                    {SideBarData.map((item, index) => {
                        return (
                            <li key= {index} className = {item.cName}>
                                <Link to= {item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default NavBar
