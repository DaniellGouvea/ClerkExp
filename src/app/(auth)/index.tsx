import { useAuth, useUser, ClerkProvider } from "@clerk/clerk-expo"
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    StatusBar} from "react-native"
import {db}  from "../../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Button } from "@/components/Button"
import { ListaItens } from "@/components/listaItens"
import { Ionicons } from "@expo/vector-icons";




export function Home() {
    
    const { user } = useUser()

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
                
                    <ListaItens/>
                </View>         

    )
}

function SettingsScreen() {
    const { user } = useUser()
    const { signOut } = useAuth()

    function cutAfterSecondSpace(str:string) {
        const spaceIndex = str.indexOf(' ', str.indexOf(' ') + 1); // Encontra o segundo espaço
        return spaceIndex !== -1 ? str.slice(0, spaceIndex) : str; // Corta a string ou retorna a original
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.userInfo}>
                    {user?.imageUrl && (
                        <Image 
                            source={{ uri: user.imageUrl }} 
                            style={styles.profileImage} 
                        />
                    )}
                    <Text style={styles.text}>Olá, {user?.fullName ? cutAfterSecondSpace(user.fullName) : ''}</Text>
                </View>
                <Button
                    icon="exit"
                    title="Sair"
                    onPress={() => signOut()}
                />
      </View>
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  export default function App() {
    const { user } = useUser()

    return (
      <NavigationContainer independent= {true}>
        <Tab.Navigator screenOptions={{
              headerShown: false, // Remove a barra superior
            }}>

          <Tab.Screen 
          name="Inicio" 
          component={Home} 
          options={{
            tabBarIcon:() => (
                <Ionicons name="home-outline" size={22} color="black" />
            )
          }} 
          />

          <Tab.Screen 
          name="Sua Conta" 
          component={SettingsScreen} 
          options={{
            tabBarIcon:() => (
                user?.imageUrl && (
                    <Image 
                        source={{ uri: user?.imageUrl }} 
                        style={[styles.profileImage, {width: 22, height:22}]} 
                    />
                )
            )
          }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
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
