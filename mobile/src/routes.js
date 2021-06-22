import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './pages/login'
import Client from './pages/registerClient'
import Points from './pages/registerPoints'
import User from './pages/registerUser'
import Report from './pages/report'
import Success from './pages/success'
import Menu from './pages/menu'

const AppStack = createStackNavigator()

export default function Routes () {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name='Login' component={Login} />
        <AppStack.Screen name='Client' component={Client} />
        <AppStack.Screen name='Points' component={Points} />
        <AppStack.Screen name='User' component={User} />
        <AppStack.Screen name='Report' component={Report} />
        <AppStack.Screen name='Success' component={Success} />
        <AppStack.Screen name='Menu' component={Menu} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
