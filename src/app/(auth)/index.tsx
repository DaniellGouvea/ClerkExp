import { Button } from "@/components/Button"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { StyleSheet, Text, View } from "react-native"

export default function Home(){

    const { user } = useUser()
    const { signOut } = useAuth()

    return(
        <View>
            <Text>Olá, {user?.fullName}</Text>
            <Button
            icon="exit"
            title="Sair"
            onPress={() => signOut()}
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: "center",
        alignItems: "center",
        gap: 12

    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
})