import React, {useEffect, useState} from 'react'
import {Platform, View} from 'react-native'
import {
  Button,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper'
import {theme} from '../../App'
import axios from 'axios'
import globalStyles from '../../styles/global'
import styles from './styles'

const NewClient = ({navigation, route}) => {
  const {setCheckApi} = route.params

  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [alert, setAlert] = useState(false)

  const handlePress = async () => {
    const values = [name, mail, phone, company]

    const baseAPIURL =
      Platform.OS === 'ios'
        ? 'http://localhost:3000/clients'
        : 'http://10.0.0.2:3000/clients'

    if (values.some(val => val.trim() === '')) {
      setAlert(true)
      return
    }

    try {
      const clientData = {name, mail, phone, company}
      const apiUrl = route.params.client
        ? `${baseAPIURL}/${route.params.client.id}`
        : baseAPIURL

      if (route.params.client) {
        await axios.put(apiUrl, clientData)
      } else {
        await axios.post(apiUrl, clientData)
      }

      navigation.navigate('Home')
      setCompany('')
      setMail('')
      setName('')
      setPhone('')
      setCheckApi(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (route.params.client) {
      const {name, phone, company, mail} = route.params.client

      setCompany(company)
      setMail(mail)
      setName(name)
      setPhone(phone)
    }
  }, [])

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>Add new client</Headline>
      <TextInput
        label="Name"
        placeholder="Julian"
        style={styles.input}
        onChangeText={val => setName(val)}
        value={name}
      />
      <TextInput
        label="Phone"
        placeholder="+54 9 1158311456"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={val => setPhone(val)}
        value={phone}
      />
      <TextInput
        label="Mail"
        placeholder="mail@mail.com"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={val => setMail(val)}
        value={mail}
      />
      <TextInput
        label="Company"
        placeholder="Apple"
        style={styles.input}
        onChangeText={val => setCompany(val)}
        value={company}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={handlePress}>
        Save
      </Button>

      <Portal>
        <Dialog visible={alert} onDismiss={() => setAlert(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>All fields are mandatory</Paragraph>
            <Button onPress={() => setAlert(false)}>OK</Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  )
}

export default NewClient
