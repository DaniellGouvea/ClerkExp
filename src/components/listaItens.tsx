import { readDocuments } from "@/storage/firebaseOperations";
import { Link } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { 
  ActivityIndicator, 
  View, 
  Text, 
  Image, 
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatGrid } from "react-native-super-grid";

export function ListaItens() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => { 
      const fetchData = async () => {
        const data = await readDocuments('produto');
        setDocuments(data);
      };
  
      fetchData();
      setRefreshing(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await readDocuments('produto');
      setDocuments(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatGrid
      itemDimension={Math.floor(width * 0.45)} // Ajuste de dimensão do item
      data={documents}
      keyExtractor={(item) => item.id}
      spacing={10}
      renderItem={({ item }) => (
        <Link
          href={{
          pathname: '/(auth)/products/[id]',
          params: { id: item.id },
          }}>
        <View style={styles.itemContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: item["img"] }}
          />
            <Descricao {...item} />
        </View>
        </Link>
      )}
      ListEmptyComponent={<Text>Nenhum documento encontrado.</Text>}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
      }
    />
    </View>
  );
}

export function Descricao(item: DocumentData) {
  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '…';
    }
    return text;
  }

  const nomeTruncado = truncateText(item["nome"], 50);

  return (
    <View style={styles.description}>
          <Text style={styles.itemName} allowFontScaling={false} numberOfLines={2} ellipsizeMode="tail">
            {nomeTruncado}
            </Text>
          <Text style={styles.price} allowFontScaling={false}>R${item["preco"]}</Text>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: 'hidden',
    width: width * 0.47,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: height * 0.18,
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 10,
  },
  itemName: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  price: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#c21b1b',
    textAlign: 'left',
    marginTop: 'auto',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },
});
