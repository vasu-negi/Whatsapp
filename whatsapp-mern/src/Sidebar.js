import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';





function Sidebar() {
    return (
        <div className="sidebar">
        <div className="div sidebar__header">
            <Avatar src = "https://i.imgur.com/PLAobHS.jpeg"/>
            <div className="div sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchOutlined/>
            <input placeholder="Search or start a new Chat" type="text"/>
            </div>
        </div>


        <div className="sidebar__chats">
            <SidebarChat/>
            <SidebarChat/>
        </div>

        </div>

    )
}

export default Sidebar
// use rfce


//use material ui