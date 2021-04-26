import React from "react";
import { createStackNavigator } from "react-navigation";
import PageHeader from "../components/Headers/PageHeader";
//import Login from "../screens/Login";
import Logout from "../screens/Logout";

export default (LogoutStackNavigator = createStackNavigator({
  Logout: {
    screen: Logout,
    navigationOptions: {
      header: ({ navigation }) => (
        <PageHeader onPress={() => navigation.openDrawer()} />
      )
    }
  }
}));
