import React from 'react'
//import * as FAIcons from 'react-icons/fa'
import * as AIIcons from 'react-icons/ai'
//import * as IOIcons from 'react-icons/io'

export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AIIcons.AiFillHome/>,
        cName: 'nav_text'
    },

    {
        title: 'Search',
        path: '/search',
        icon: <AIIcons.AiOutlineSearch/>,
        cName: 'nav_text'
    },

    {
        title: 'Chat',
        path: '/chat',
        icon: <AIIcons.AiOutlineWechat/>,
        cName: 'nav_text'
    },

    {
        title: 'Profile',
        path: '/profile',
        icon: <AIIcons.AiOutlineUser/>,
        cName: 'nav_text'
    },

    {
        title: 'Login',
        path: '/login',
        icon: <AIIcons.AiOutlineLogin/>,
        cName: 'nav_text'
    },

    {
        title: 'About',
        path: '/about',
        icon: <AIIcons.AiOutlineInfoCircle/>,
        cName: 'nav_text'
    },

    {
        title: 'Register',
        path: '/register',
        icon: <AIIcons.AiOutlineUserAdd/>,
        cName: 'nav_text'
    }
]