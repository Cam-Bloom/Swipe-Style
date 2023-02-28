import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import LoadingSpinner from "../components/LoadingSpinner";
import {LoadingContext} from '../contexts/loadingContext'


const RootNavigator = () => {
  const { user } = useContext(UserContext);
  const {loading, setLoading} = useContext(LoadingContext)


  return (
    <NavigationContainer>
      {loading ? <LoadingSpinner/> : user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
