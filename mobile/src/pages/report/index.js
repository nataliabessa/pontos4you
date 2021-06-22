import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'

export default function Report () {
  const navigation = useNavigation()
  const [customFonts] = useFonts({
    'Montserrat-Alternates': require('../../assets/fonts/MontserratAlternates-Light.ttf')
  })
  const [businessName, setBusinessName] = useState('')
  const [data, setData] = useState([])

  if (!customFonts) {
    return null
  }

  async function handleReport (businessName) {
    try {
      const token = AsyncStorage.getItem('accessToken')

      const response = await api.put('/points', { businessName }, { headers: { 'x-access-token': token } })

      setData(response)
    } catch (error) {
      Alert.alert(error)
    }
  }

  function navigateBack () {
    navigation.goBack()
  }

  function renderRow (businessName, points) {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'black', alignSelf: 'stretch' }}>
          <Text style={{ color: '#fff' }}>{businessName}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue', alignSelf: 'stretch' }}>
          <Text style={{ color: '#fff' }}>{points}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Relatório de Pontos</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>Informe o cliente :</Text>
        <TextInput
          onChangeText={(value) => setBusinessName(value)}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
        />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
                data.map(({ businessName, points }) => {
                  return renderRow(businessName, points)
                })
            }
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateBack}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleReport(businessName)}
        >
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  headerText: {
    color: '#00E394',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '15%',
    marginLeft: '3%'
  },

  text: {
    fontFamily: 'Montserrat-Alternates',
    fontSize: 20,
    lineHeight: 30
  },

  body: {
    marginTop: '15%',
    marginLeft: '3%',
    marginRight: '3%',
    flexDirection: 'column'
  },

  input: {
    marginTop: 8,
    fontSize: 20,
    marginBottom: 24,
    color: '#737380',
    backgroundColor: '#FFF',
    height: 30
  },

  button: {
    borderRadius: 15,
    backgroundColor: '#250048'
  },

  buttonView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    marginTop: '25%'
  },

  buttonText: {
    padding: 10,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
