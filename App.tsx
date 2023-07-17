import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from './views/Home'
import NewClient from './views/NewClient'
import ClientDetails from './views/ClientDetails'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper'

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, primary: '#171717'},
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="NewClient"
          component={NewClient}
          options={{
            title: 'New Client',
          }}
        />
        <Stack.Screen
          name="ClientDetails"
          component={ClientDetails}
          options={{
            title: 'Client Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
