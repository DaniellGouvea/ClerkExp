import { readDocument } from '@/storage/firebaseOperations';
import { Ionicons } from '@expo/vector-icons';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import QuantidadeSelector from './QuantidadeSelector';

const BottomModal = ({ visible, onClose, idProduto }: any) => {
  const [document, setDocument] = useState<DocumentData>();
  const idString = idProduto.toString();

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDocument('produto', idString);
      setDocument(data);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <View style={[styles.modalView, { height: screenHeight * 0.45 }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <ProdutoModal document={document} />
        </View>
      </Modal>
    </View>
  );
};

const ProdutoModal = ({ document }: { document: DocumentData }) => {
  return (
    <View style={styles.modalContent}>
      <View style={styles.productInfo}>
        <Image
          style={styles.productImage}
          resizeMode="cover"
          source={{
            uri: document ? document['img'] : 'Carregando...',
          }}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>
            {document['preco'] ? `R$${document['preco']}` : 'R$ 80.90'}
          </Text>
          <Text style={styles.productStock}>
            {document['quantidade'] ? `Estoque: ${document['quantidade']}` : 'Estoque: 00'}
          </Text>
        </View>
      </View>
      <QuantidadeSelector />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
  },
  productInfo: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    height: 100,
    width: 100,
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
  },
  productDetails: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  productPrice: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
  },
  productStock: {
    fontSize: 16,
    color: '#777',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BottomModal;
