import React, { useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'

import api from '../../services/api'

import logo from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native'

export default function Login () {
  const navigation = useNavigation()
  const [customFonts] = useFonts({
    'Montserrat-Alternates': require('../../assets/fonts/MontserratAlternates-Light.ttf')
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!customFonts) {
    return null
  }

  async function handleLogin (email, password) {
    try {
      const response = await api.post('/login', { email, password })
      navigation.navigate('Menu')

      AsyncStorage.setItem({
        key: 'accessToken',
        value: response.token
      })
    } catch (error) {
      Alert.alert(error)
    }
  }

  function navigateRegister () {
    navigation.navigate('User')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>Email :</Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
        />

        <Text style={styles.text}>Senha :</Text>
        <TextInput
          onChangeText={(value) => setPassword(value)}
          autoCorrect={false}
          autoCapitalize='none'
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin(email, password)}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.register}
          onPress={navigateRegister}
        >
          <Text style={styles.registerText}>Não tem uma conta? Cadastre-se agora.</Text>
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

  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20%'
  },

  text: {
    fontFamily: 'Montserrat-Alternates',
    fontSize: 20,
    lineHeight: 30,
    color: 'rgba(0, 0, 0, 0.8)',
    alignContent: 'flex-start'
  },

  body: {
    marginBottom: 16,
    marginTop: '30%',
    flexDirection: 'column',
    justifyContent: 'space-between'
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
    alignItems: 'center',
    backgroundColor: '#250048',
    marginHorizontal: '35%',
    borderRadius: 15,
    marginBottom: 30,
    marginTop: 10
  },

  buttonText: {
    padding: 10,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },

  register: {
    marginTop: '50%',
    alignItems: 'center'
  },

  registerText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Alternates'
  }
})
