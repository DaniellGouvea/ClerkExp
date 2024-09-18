import { readDocuments } from "@/storage/firebaseOperations";
import { Link } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import { 
  ActivityIndicator, 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet,
  Dimensions} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatGrid } from "react-native-super-grid";




export function ListaItens(){

  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await readDocuments('produto')
      setDocuments(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])


  if (isLoading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }
  return(
    <View style ={{flex:1}}>
      <FlatGrid
      itemDimension={width*0.4}  // Controla o tamanho dos itens
      data={documents}
      keyExtractor={(item) => item.id}
      spacing={10}  // Espaçamento entre os itens
      renderItem={({ item }) => (
        <Link href= '/(auth)\testeLink'>
        <View style={styles.container}>
          
          <Image
            style={{ height: 170, width: '100%' }}
            resizeMode="cover"
            source={{
              uri: item["img"],
            }}
          />
          
            <Descricao {...item}/>
          
        </View>
        </Link>
        
      )}
      ListEmptyComponent={<Text>Nenhum documento encontrado.</Text>}
    />
    </View>
  )
}

export function Descricao(item: DocumentData){


  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '…';
    }
    return text;
  }

  const nomeTruncado = truncateText(item["nome"],52);

  return(
    <View style={styles.description}>
        <View style={{alignItems: "flex-start"}}>
          <Text style = {styles.itemName} allowFontScaling={false}>{nomeTruncado}</Text>
        </View>
        <View style={{alignItems: "flex-start"}}>
          <Text style = {styles.price} allowFontScaling={false}>R${item["preco"]}</Text>
        </View>
    </View>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: width * 0.47,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  description:{
    backgroundColor: "#fff",
    flex:1,
    width: '100%',
    height: 40,
    padding: 5
  },
  price:{
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#c21b1b',
  },
  itemName: {
  }

})