import React from 'react'
import {Button} from 'react-native-paper'

const Navbar = ({navigation}) => {
  return (
    <Button
      textColor="#fff"
      icon="plus-circle"
      onPress={() => navigation.navigate('NewClient')}>
      New Client
    </Button>
  )
}

export default Navbar
