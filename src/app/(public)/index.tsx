import { useEffect, useState } from "react";
import { Text, View, Platform, TextInput } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { ExpoRoot, Link, router } from "expo-router";

import { Button } from "@/components/Button";
import { styles } from "./styles";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingHandle, setIsLoadingHandle] = useState(false);
  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  const { setActive, isLoaded, signIn } = useSignIn()
  const [emailAddress, setEmailAdress] = useState("")
  const [password, setPassword] = useState("")
  

  

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
      console.log(error)
      setIsLoadingGoogle(false);
    }
  }

  async function handleSignIn (){

    if(!isLoaded) {
      return
    }

    try {
      setIsLoadingHandle(true)
      const signInResponse = await 
          signIn.create({
            identifier: emailAddress,
            password: password
          })
          
      if( signInResponse.status === "complete") {
        await setActive ( { session: signInResponse.createdSessionId } )
        router.replace('/')
      }else {
        setIsLoadingHandle(false)
      }


    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setIsLoadingHandle(false)
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
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Button
        icon="logo-google"
        title="Entrar com Google"
        onPress={onGoogleSignIn}
        isLoading={isLoadingGoogle}
      />
      <TextInput 
      value= {emailAddress}
      onChangeText={(email) => setEmailAdress(email)}
      style ={[styles.input, { width: 250, marginTop: 20}]} 
      placeholder="Email"
      autoCapitalize="none"
      ></TextInput>

      <TextInput 
      value= {password}
      onChangeText={(password) => setPassword(password)}
      style ={[styles.input, { width: 250}]} 
      placeholder="Senha"
      secureTextEntry={true}
      autoCapitalize="none"
      ></TextInput>

      <Button
      icon="log-in-outline"
      title="Entrar"
      variant="secondary"
      onPress={handleSignIn}
      isLoading = {isLoadingHandle}
      ></Button>
      <Link href={"./cadastro"}>
        <Text>Ainda não tem uma conta? <Text style ={{fontWeight: "bold"}}> Cadastre-se </Text></Text>
      </Link>
    </View>
  );
}
