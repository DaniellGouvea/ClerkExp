import { readDocument } from '@/storage/firebaseOperations';
import { Ionicons } from '@expo/vector-icons';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import QuantidadeSelector from './QuantidadeSelector';

const BottomModal = ({ visible, onClose, idProduto }:any) => {

  const [document, setDocument] = useState<DocumentData>()
  const idString = idProduto.toString()

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {

    const fetchData = async () => {
       const data = await readDocument('produto', idString)
       setDocument(data)
    }
    
    fetchData()
}, [])


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <View style={[styles.modalView, { height: screenHeight * 0.3 }]}>
          <Ionicons name="close" size={24} color="black" style={{bottom: 64}} onPress={onClose}/>
          <ProdutoModal {...document}></ProdutoModal>
        
        </View>
      </Modal>
    </View>
  );
};

const ProdutoModal = (document:DocumentData) => {
  return (
    <View style= {{backgroundColor: '#f1f1f1', width: '100%'}}>
      <View style={{ backgroundColor: '#f1f1f1', padding: 10, borderBottomWidth:1, borderColor: '#000'}}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ height: 100, width: 100, backgroundColor: '#c7c7c7' }}
            resizeMode="cover"
            source={{
              uri: document ? document['img'] : 'Carregando...',
            }}
          />
          <View style={{ justifyContent: 'center', marginLeft: 10 }}>
            <Text style={{ color: '#c21b1b', fontSize: 18, fontWeight: 'bold' }}>
              {document['preco'] ? `R$${document['preco']}` : 'R$ 80.90'}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {document['quantidade'] ? `Estoque: ${document['quantidade']}` : 'Estoque: 00'}
            </Text>
          </View>
      </View>
    </View>
    <View>
      <QuantidadeSelector></QuantidadeSelector>
    </View>
      
    </View>
  )
}

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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default BottomModal;
