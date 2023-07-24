import React from 'react'
import {Alert, Platform, Text, View} from 'react-native'
import {Button, FAB, Headline, Subheading} from 'react-native-paper'
import globalStyles from '../../styles/global'
import styles from './styles'
import axios from 'axios'

const ClientDetails = ({navigation, route}) => {
  const {
    setCheckApi,
    item: {id, name, mail, phone, company},
  } = route.params

  const showConfirmationDialog = () => {
    Alert.alert(
      'Do yo want to delete this client?',
      'It is not possible to revert this action',
      [
        {text: 'Delete', onPress: deleteClient},
        {text: 'Cancel', style: 'cancel'},
      ],
    )
  }

  const deleteClient = async () => {
    const url =
      Platform.OS === 'ios'
        ? `http://localhost:3000/clients/${id}`
        : `http://10.0.0.2:3000/clients${id}`

    try {
      await axios.delete(url)
      setCheckApi(true)
      navigation.navigate('Home')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{name}</Headline>
      <Text style={styles.text}>
        Company: <Subheading style={styles.subheading}>{company}</Subheading>
      </Text>
      <Text style={styles.text}>
        Mail: <Subheading style={styles.subheading}>{mail}</Subheading>
      </Text>
      <Text style={styles.text}>
        Phone: <Subheading style={styles.subheading}>{phone}</Subheading>
      </Text>
      <Button
        mode="contained"
        icon="cancel"
        style={styles.button}
        onPress={showConfirmationDialog}>
        Delete Client
      </Button>
      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('NewClient', {
            client: route.params.item,
            setCheckApi,
          })
        }
      />
    </View>
  )
}

export default ClientDetails
