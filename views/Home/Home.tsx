import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {View} from 'react-native'
import {Client} from '../../typings'
import {FlatList} from 'react-native-gesture-handler'
import {Button, FAB, Headline, List} from 'react-native-paper'
import globalStyles from '../../styles/global'

const Home = ({navigation}) => {
  const [clients, setClients] = useState<Client[]>([])
  const [checkApi, setCheckApi] = useState(true)

  useEffect(() => {
    const getClients = async () => {
      try {
        const result = await axios.get('http://localhost:3000/clients')
        setClients(result.data)
        setCheckApi(false)
      } catch (err) {
        console.error(err)
      }
    }

    if (checkApi) {
      getClients()
    }
  }, [checkApi])

  return (
    <View style={globalStyles.container}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NewClient', {setCheckApi})}>
        New Client
      </Button>

      <Headline style={globalStyles.title}>
        {clients.length ? 'Clients' : 'No clients yet'}
      </Headline>

      <FlatList
        data={clients}
        keyExtractor={client => client.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            description={item.company}
            onPress={() =>
              navigation.navigate('ClientDetails', {item, setCheckApi})
            }
          />
        )}
      />
      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NewClient', {setCheckApi})}
      />
    </View>
  )
}

export default Home
