import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import api from '../../services/api'

export default function RegisterPoints () {
  const navigation = useNavigation()
  const [customFonts] = useFonts({
    'Montserrat-Alternates': require('../../assets/fonts/MontserratAlternates-Light.ttf')
  })
  const [businessName, setBusinessName] = useState('')
  const [points, setPoints] = useState('')

  if (!customFonts) {
    return null
  }

  async function handlePoints (businessName, points) {
    try {
      const token = AsyncStorage.getItem('accessToken')

      await api.put('/points', { businessName, points }, { headers: { 'x-access-token': token } })

      Alert.alert('Pontos inseridos com sucesso!')
    } catch (error) {
      Alert.alert(error)
    }
  }

  function navigateBack () {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pontuar Cliente</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>Informe o cliente :</Text>
        <TextInput
          onChangeText={(value) => setBusinessName(value)}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
        />

        <Text style={styles.text}>Pontos Ganhos :</Text>
        <TextInput
          onChangeText={(value) => setPoints(value)}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
        />

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
          onPress={() => handlePoints(businessName, points)}
        >
          <Text style={styles.buttonText}>Pontuar</Text>
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
