import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import logo from '../../assets/icon.png'

export default function Menu () {
  const navigation = useNavigation()
  const [customFonts] = useFonts({
    'Montserrat-Alternates': require('../../assets/fonts/MontserratAlternates-Light.ttf')
  })

  if (!customFonts) {
    return null
  }

  async function handleLogoff () {
    useAsyncStorage.removeItem('accessToken')
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Client')}
        >
          <Text style={styles.buttonText}>Cadastrar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Points')}
        >
          <Text style={styles.buttonText}>Pontuar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Report')}
        >
          <Text style={styles.buttonText}>Vizualizar Pontos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => { handleLogoff() }}
        >
          <Text style={styles.buttonText}>Deslogar</Text>
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
    marginTop: '20%',
    marginBottom: '15%'
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#250048',
    marginHorizontal: '30%',
    borderRadius: 15,
    marginBottom: '15%'
  },

  buttonText: {
    padding: 10,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  }

})
