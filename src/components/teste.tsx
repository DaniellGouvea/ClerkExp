import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { readDocuments } from '../storage/firebaseOperations'; // Supondo que as funções estão nesse arquivo
import { DocumentData } from "firebase/firestore"

const DataList: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await readDocuments('produto'); // Altere o nome da coleção
      setDocuments(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Documentos</Text>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemId}>ID: {item.id}</Text>
            <Text>Nome: {JSON.stringify(item["nome"])}</Text>
            <Text>Preço: {JSON.stringify(item["preco"])}</Text>
            <Text>quantidade: {JSON.stringify(item["quantidade"])}</Text>
            <Image
             style= {{height: 250, width: 250, resizeMode:'contain' }}
             source={{
              uri: item["img"]
             }}

            ></Image>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum documento encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemId: {
    fontWeight: 'bold',
  },
});

export default DataList;
