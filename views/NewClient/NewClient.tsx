import React, {useState} from 'react'
import {View} from 'react-native'
import {
  Button,
  DefaultTheme,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper'
import {theme} from '../../App'
import globalStyles from '../../styles/global'
import styles from './styles'

const NewClient = () => {
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [alert, setAlert] = useState(false)

  const handlePress = () => {
    const values = [name, mail, phone, company]

    if (values.some(val => val.trim() === '')) {
      setAlert(true)
    }
  }

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
