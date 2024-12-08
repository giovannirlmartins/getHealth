import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../pages/app/home";
import Post from "../pages/app/post";
import Profile from "../pages/app/profile";
import Search from "../pages/app/search";

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={Home}
            />

            <Tab.Screen 
                name="Post"
                component={Post}
            />

            <Tab.Screen 
                name="Search"
                component={Search}
            />

            <Tab.Screen 
                name="Profile"
                component={Profile}
            />

        </Tab.Navigator>

    )
}