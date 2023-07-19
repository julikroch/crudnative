import 'react-native-gesture-handler'
import React from 'react'
import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from './views/Home'
import NewClient from './views/NewClient/NewClient'
import ClientDetails from './views/ClientDetails'
import Navbar from './components/Navbar'

const Stack = createStackNavigator()

export const theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, primary: '#1774f2'},
}

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: theme.colors.surface,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({navigation, route}) => ({
              headerLeft: props => (
                <Navbar {...props} navigation={navigation} route={route} />
              ),
            })}
          />
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
    </PaperProvider>
  )
}

export default App
