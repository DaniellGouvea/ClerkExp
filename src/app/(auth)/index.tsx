import { Button } from "@/components/Button"
import { useAuth, useUser, ClerkProvider } from "@clerk/clerk-expo"
import { StyleSheet, Text, View, Image } from "react-native"

export default function Home() {
    const { user } = useUser()
    const { signOut } = useAuth()

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Você não está autenticado.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                {user.imageUrl && (
                    <Image 
                        source={{ uri: user.imageUrl }} 
                        style={styles.profileImage} 
                    />
                )}
                <Text style={styles.text}>Olá, {user.fullName}</Text>
            </View>
            <Button
                icon="exit"
                title="Sair"
                onPress={() => signOut()}
            />
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
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
