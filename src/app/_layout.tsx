import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { router, Slot } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/storage/tokenCache";
import { useFonts } from "expo-font";

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InicialLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/(auth)");
    } else {
      router.replace("/(public)");
    }
  }, [isSignedIn, isLoaded]);

  return isLoaded ? (
    <Slot />
  ) : (
    <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'poppins-regular': require("../../fonts/Poppins-Regular.ttf"),
    'poppins-bold': require("../../fonts/Poppins-Bold.ttf"),
    // LEMBRAR DE ADICIONAR MAIS FONTES SEUS CORNOS
  });

  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />;
  }

  return (
    <ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <InicialLayout />
    </ClerkProvider>
  );
}
