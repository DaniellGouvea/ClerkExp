import { useEffect, useState } from "react";
import { Text, View, Platform, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingHandle, setIsLoadingHandle] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false); // Novo estado para controlar a exibição dos inputs
  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  const { setActive, isLoaded, signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  async function onGoogleSignIn() {
    try {
      setIsLoadingGoogle(true);
      const redirectUrl = Linking.createURL("/");
      const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

      if (oAuthFlow.authSessionResult?.type === "success") {
        await oAuthFlow.setActive!({ session: oAuthFlow.createdSessionId });
      } else {
        setIsLoadingGoogle(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingGoogle(false);
    }
  }

  async function handleSignIn() {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoadingHandle(true);
      const signInResponse = await signIn.create({
        identifier: emailAddress,
        password: password,
      });

      if (signInResponse.status === "complete") {
        await setActive({ session: signInResponse.createdSessionId });
        router.replace("/");
      } else {
        setIsLoadingHandle(false);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setIsLoadingHandle(false);
    }
  }

  useEffect(() => {
    if (Platform.OS !== "web") {
      WebBrowser.warmUpAsync();
    }

    return () => {
      if (Platform.OS !== "web") {
        WebBrowser.coolDownAsync();
      }
    };
  }, []);

  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../../assets/images/logo4.jpeg")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Bem Vindo</Text>

        {!showEmailInput ? (
          <>
            <TouchableOpacity
              style={styles.buttonLoginGoogle}
              onPress={onGoogleSignIn}
              disabled={isLoadingGoogle}
            >
              {isLoadingGoogle ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="logo-google" style={styles.icon} />
                  <Text style={styles.text}>Entrar com Google</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => setShowEmailInput(true)} // Mostra os inputs de e-mail e senha
            >
              <Text style={styles.text}>Entrar com E-mail</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonCadastro}
              onPress={() => router.push("/cadastro")}
            >
              <Text style={styles.textCadastro}>Cadastre-se</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={emailAddress}
              onChangeText={setEmailAddress}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.buttonEntrar}
              onPress={handleSignIn}
              disabled={isLoadingHandle}
            >
              {isLoadingHandle ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.text}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginTop: -50,
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    fontSize: 35,
    textAlign: "center",
  },
  buttonLoginGoogle: {
    backgroundColor: "#FB8107",
    padding: 10,
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonLogin: {
    backgroundColor: "#FB8108",
    padding: 10,
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonCadastro: {
    borderColor: "#FB8107",
    borderWidth: 2,
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  buttonEntrar: {
    backgroundColor: "#FB8107",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textCadastro: {
    color: "#000",
  },
  text: {
    color: "#FFF",
    textAlign: "center",
  },
  logo: {
   width:400,
    height:400
  },
  icon: {
    marginRight: 8,
    color: "#fff",
  },
});
