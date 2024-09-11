import { useState } from 'react'
import { TextInput, View, Alert } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'


import { Button } from '@/components/Button'
import { styles } from './styles'


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')  
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const onSignUpPress = async () => {
    // Verifica se a biblioteca Clerk foi carregada
    if (!isLoaded) {
      return
    }

    // Verifica se password e confirmPassword coincidem
    if(password === confirmPassword){

      try {
        // Tenta criar uma conta
        await signUp.create({
          emailAddress,
          password,
          firstName
        })

        // Inicia a verificação do Email
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        

        setPendingVerification(true)

      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2))
      }
    } else {
      console.log("Confirme com a mesma senha digitada anteriormente")
      Alert.alert("Senha Incorreta", "Confirme com a mesma senha digitada anteriormente")
    }
  }

  const onPressVerify = async () => {
    // Verifica se a biblioteca Clerk foi carregada
    if (!isLoaded) {
      return
    }

    
    try {
      // Tenta verificar o código de verificação 
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })
      // Se bem sucedido a sessão é ativada
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }

  }

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center", gap: 10}}>
      {!pendingVerification && (
        <>
        <TextInput
            autoCapitalize="none"
            value={firstName}
            placeholder="Nome completo"
            onChangeText={(firstName) => setFirstName(firstName)}
            style={styles.input}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            onChangeText={(email) => setEmailAddress(email)}
            style={styles.input}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          />
          <TextInput
            autoCapitalize="none"
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          />
          <TextInput
            autoCapitalize="none"
            value={confirmPassword}
            placeholder="Confirmar Senha"
            secureTextEntry={true}
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            style={styles.input}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          />
          <Button 
          title="Cadastrar" 
          onPress={onSignUpPress} 
          icon='log-in-outline'
          variant='secondary'
          />
        </>
      )}
      {pendingVerification && (
        <>
          <TextInput 
          value={code} 
          placeholder="Código" 
          onChangeText={(code) => setCode(code)} 
          style={styles.input}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          />
          <Button 
          title="Verificar Email" 
          onPress={onPressVerify}
          variant='secondary'
          icon='checkmark-circle-outline'
           />
        </>
      )}
    </View>
  )
}