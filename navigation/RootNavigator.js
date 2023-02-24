import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from 'react';
import {UserContext} from '../contexts/userContext'
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const RootNavigator = () => {
    const {user} = useContext(UserContext)

  return (
    <NavigationContainer>
        { user ? <AppStack /> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default RootNavigator