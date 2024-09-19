import { readDocument } from "@/storage/firebaseOperations"
import { useLocalSearchParams } from "expo-router"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Button, Text, View, Image, StatusBar } from "react-native"

export default function TesteLink({}){

    const [document, setDocument] = useState<DocumentData>()
    const { id } = useLocalSearchParams()

    const idString = id.toString()

     useEffect(() => {

         const fetchData = async () => {
            const data = await readDocument('produto', idString)
            setDocument(data)
         }
         
         fetchData()
     }, [])

    return (
        <View style={{flex:1 ,paddingTop: StatusBar.currentHeight, backgroundColor: '#ebebeb', alignItems: "center", justifyContent: 'center'}}>
        <Image
            style={{ height: 170, width: '100%' }}
            resizeMode="cover"
            source={{
              uri: document? document["img"] : "Carregando...",
            }}
          />
        <Text style={{color: "red", backgroundColor: 'blue', alignSelf: 'center', justifyContent: 'center'}}>
            {document? document["nome"] : 'Carregando...'}
        </Text>
        <Text style={{color: "red", backgroundColor: 'blue', alignSelf: 'center', justifyContent: 'center'}}>
            {document? document["preco"] : 'Carregando...'}
        </Text>
        <Text style={{color: "red", backgroundColor: 'blue', alignSelf: 'center', justifyContent: 'center'}}>
            {document? document["quantidade"] : 'Carregando...'}
        </Text>
            <Button
            title="emer"
            />
        </View>
    )
}