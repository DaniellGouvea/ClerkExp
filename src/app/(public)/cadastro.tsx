import { useState } from 'react'
import { TextInput, View, Alert, Text, TouchableOpacity } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'
import { Button } from '@/components/Button'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  // Estado para o nível de autorização
  const [role, setRole] = useState('user')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    if (password === confirmPassword) {
      try {
        // Criação da conta com o nível de autorização (role)
        await signUp.create({
          emailAddress,
          password,
          firstName,
          unsafeMetadata: { role } // Armazena o nível de autorização no campo publicMetadata
        })

        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        setPendingVerification(true)
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2))
      }
    } else {
      Alert.alert("Senha Incorreta", "Confirme com a mesma senha digitada anteriormente")
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code })
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
      {!pendingVerification && (
        <>
          <View style={{ position: "absolute", top: 17, left: 10 }}>
            <Link href={"/(public)"}>
              <Ionicons name="arrow-back" size={50} color="black" />
            </Link>
          </View>

          <Text style={[styles.title, { bottom: 70 }]}>
            Crie Agora A Sua Conta
          </Text>

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

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={[styles.roleButton, role === 'user' && styles.selectedRoleButton]}
              onPress={() => setRole('user')}
            >
              <Text style={styles.roleButtonText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === 'admin' && styles.selectedRoleButton]}
              onPress={() => setRole('admin')}
            >
              <Text style={styles.roleButtonText}>Admin</Text>
            </TouchableOpacity>
          </View>

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
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRoleButton: {
    backgroundColor: '#007bff', // Altera a cor quando selecionado
    borderColor: '#007bff',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#000',
  }
})
