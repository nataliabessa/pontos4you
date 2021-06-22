import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'

export default function Success () {
  const navigation = useNavigation()
  const [customFonts] = useFonts({
    'Montserrat-Alternates': require('../../assets/fonts/MontserratAlternates-Light.ttf')
  })

  if (!customFonts) {
    return null
  }

  async function handleSuccess () {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.success}>Cadastro concluído com sucesso!</Text>

        <Text style={styles.next}>Para logar clique no botão abaixo</Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSuccess}
        >
          <Text style={styles.buttonText}>Ir para Login</Text>
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

  body: {
    marginTop: '50%',
    marginLeft: '20%',
    marginRight: '20%'
  },

  success: {
    color: '#00E394',
    fontSize: 25,
    fontWeight: 'bold'

  },

  next: {
    color: '#250048',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '30%'
  },

  button: {
    borderRadius: 15,
    backgroundColor: '#250048',
    marginTop: '15%',
    alignItems: 'center',
    width: 200,
    marginLeft: '20%',
    marginRight: '20%'
  },

  buttonText: {
    padding: 10,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  }

})
