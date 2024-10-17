import { readDocument } from "@/storage/firebaseOperations"
import { useLocalSearchParams, useRouter } from "expo-router"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import {Text, View, Image, StatusBar} from "react-native"

import { Button } from "@/components/Button"
import BottomModal from "../../../components/modal"
import { Ionicons } from "@expo/vector-icons"



export default function TesteLink(){
    const [modalVisible, setModalVisible] = useState(false);

    const [document, setDocument] = useState<DocumentData>()
    const { id } = useLocalSearchParams()

    const idString = id.toString()
    
    const statusBarHeight = StatusBar.currentHeight;
    
    const router = useRouter()

    useEffect(() => {

         const fetchData = async () => {
            const data = await readDocument('produto', idString)
            setDocument(data)
         }
         
         fetchData()
    }, [])

    return (
        <View style={{flex:1, backgroundColor: '#ebebeb'}}>

            <Ionicons name="arrow-back"  size={24} color="#fff" style={{
                position: 'absolute', 
                top: statusBarHeight,              
                left: 10,             
                zIndex: 10, }} 
                onPress={() => (router.back())}
                />
            <ImageProduto {...document}/>

            <DescriptionProduto {...document} />
            <View style={{ justifyContent: "flex-start",alignItems: 'center', marginBottom: 20}}>
                <Text style={{ textAlign: 'center' }} selectable>
                    {idString}
                </Text>
            </View>
            <Button
            icon="bag-add-outline"
            title="Comprar"
            onPress={() => setModalVisible(true)}
            />

            <BottomModal  
            visible ={modalVisible} 
            onClose ={() => setModalVisible(false)}
            idProduto = {id}
            />
        </View>
    )
}


function ImageProduto (document:DocumentData){

    return (
        <View>
                <Image
                        style={{ height: 350, width: '100%', backgroundColor: "#c7c7c7"}}
                        resizeMode="cover"
                        source={{
                        uri: document? document["img"] : "Carregando...",
                        }}
                    />
            </View>
    )


}

function DescriptionProduto (document:DocumentData) {
    return(
        <View style={{backgroundColor: '#fff', padding: 10, borderTopWidth: 1, borderBottomWidth: 1}}>
            
            {/* Nome */}
            <Text style={{
                alignSelf: 'flex-start', 
                justifyContent: 'center',
                marginTop: 5,
                backgroundColor: document["nome"] ? '#fff' : '#ebebeb',
                color: document["nome"] ? "#000" :  '#ebebeb',
                
            }}
             >
                {document["nome"]? document["nome"] : 'Pequeno exemplo de nome de produto'}
            </Text>
            {/* Preço */}
            <Text style={{
                alignSelf: "flex-start", 
                justifyContent: 'center',
                fontSize: 20,
                alignContent: 'flex-end',
                marginTop: 5,
                fontWeight: 'bold',
                paddingLeft: 5,
                color: document["preco"] > 0 ? "#c21b1b" : '#ebebeb',
                backgroundColor: document["preco"] > 0 ? "#fff" : "#ebebeb"
                }}>
                {document["preco"] ? `R$${document["preco"]}` : 'R$ 80.90'}

            </Text>
            {/* quantidade */}
            <Text style={{
                alignSelf: 'flex-start', 
                marginTop: 5,
                justifyContent: 'center',
                backgroundColor: document["quantidade"] > 0 ? '#fff' : '#ebebeb',
                color: document["quantidade"] > 0 ? "#000" :  '#ebebeb'
                }}
                >
                {document["quantidade"]? `Estoque: ${document["quantidade"]}` : 'Estoque: 00'}
            </Text>
            <Text>
                Codigo do Vendedor: {document["ownerId"]}
            </Text>
        </View>
    )
}