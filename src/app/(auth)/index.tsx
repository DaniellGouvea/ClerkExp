import { useAuth, useUser, ClerkProvider } from "@clerk/clerk-expo"
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    StatusBar} from "react-native"
import {db}  from "../../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore'

import { Button } from "@/components/Button"
import { ListaItens } from "@/components/listaItens"


export default function Home() {
    const { user } = useUser()
    const { signOut } = useAuth()
    
    const produto = {
        nome: "Tênis leve e respirável com amortecimento extra para máxima performance em suas atividades físicas.",
        quantidade: 40,
        preco: 40.6,
        img: "https://blog.alterdata.com.br/wp-content/uploads/2022/12/tendenciaslojaderoupa.jpeg"
    }

    //Teste de implementação do Firestore
    async function teste(){
        try {
            const docRef = await addDoc(collection(db, "produto"),
        produto
    )
        const querySnapshot = await getDocs(collection(db, "produto"))
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

            <View style={styles.container} >
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
                    {/* <Button
                    icon="accessibility"
                    title="teste"
                    onPress={teste}
                    /> */}

                    <ListaItens/>
                </View>         

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        backgroundColor: '#ebebeb'
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
