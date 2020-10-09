import React from 'react'
import * as FAIcons from 'react-icons/fa'
import * as AIIcons from 'react-icons/ai'
import * as IOIcons from 'react-icons/io'

export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AIIcons.AiFillHome/>,
        cName: 'nav_text'
    },

    {
        title: 'Login',
        path: '/login',
        icon: <AIIcons.AiOutlineLogin/>,
        cName: 'nav_text'
    }
]