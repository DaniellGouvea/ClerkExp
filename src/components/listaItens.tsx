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
    setTimeout(async () => { 
      const data = await readDocuments('produto');
      setDocuments(data);
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
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatGrid
        itemDimension={Math.floor(width * 0.45)}
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
                source={{ uri: item["img"] || 'https://via.placeholder.com/150' }}
              />
              <Descricao {...item} />
              <Text style={styles.buyButton}>Comprar</Text>
            </View>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum documento encontrado. Tente atualizar ou voltar mais tarde.</Text>
        }
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
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
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
  loadingText: {
    marginTop: 10,
    fontSize: RFValue(14),
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    width: '100%',
    height: height * 0.18,
    borderRadius: 12,
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  itemName: {
    fontSize: RFValue(12),
    marginTop:5

  },
  price: {
    fontSize: RFValue(14),
   
    color: '#f56e00',
    marginTop: 5,
    
  },

  emptyText: {
    textAlign: 'center',
    padding: 20,
    fontSize: RFValue(16),
    color: '#666',
  },
  buyButton: {
    marginTop: 10,
    backgroundColor: '#f56e00',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 5,

  },
});
