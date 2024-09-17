import { Button } from "@/components/Button"
import { useAuth, useUser, ClerkProvider } from "@clerk/clerk-expo"
import { StyleSheet, Text, View, Image } from "react-native"
import {db}  from "../../../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore'


export default function Home() {
    const { user } = useUser()
    const { signOut } = useAuth()
    

    //Teste de implementação do Firestore
    async function teste(){
        try {
            const docRef = await addDoc(collection(db, "users"),
        {
            first: "Gilberto",
            middle: "Martins",
            last: "de Oliveria",
            born: 1983
        })
        const querySnapshot = await getDocs(collection(db, "users"))
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`)
        })

        console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    

    


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
            <Button
            icon="rainy"
            title="teste"
            onPress={teste}
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
