import { readDocument } from '@/storage/firebaseOperations';
import { Ionicons } from '@expo/vector-icons';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import QuantidadeSelector from './QuantidadeSelector';

const BottomModal = ({ visible, onClose, idProduto }: any) => {
  const [document, setDocument] = useState<DocumentData>();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null); // Estado para gerenciar o método de pagamento
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento
  const idString = idProduto.toString();

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDocument('produto', idString);
      setDocument(data);
    };

    fetchData();
  }, []);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Pagamento Bem-Sucedido',
        'Seu pagamento foi processado com sucesso!',
        [{ text: 'OK', onPress: () => onClose() }]
      );
    }, 2000); // Simula um processamento de pagamento de 2 segundos
  };

  const handlePaymentOption = (method: string) => {
    setPaymentMethod(method);
  };

  const renderPaymentContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#FB8107" />;
    }

    switch (paymentMethod) {
      case 'cartao':
        return (
          <View style={styles.paymentContent}>
            <Text style={styles.paymentSubtitle}>Insira os dados do cartão:</Text>
            <TextInput style={styles.input} placeholder="Número do Cartão" keyboardType="number-pad" />
            <TextInput style={styles.input} placeholder="Nome no Cartão" />
            <TextInput style={styles.input} placeholder="Validade (MM/AA)" keyboardType="number-pad" />
            <TextInput style={styles.input} placeholder="CVV" keyboardType="number-pad" />
            <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
              <Text style={styles.confirmButtonText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        );
      case 'pix':
        return (
          <View style={styles.paymentContent}>
            <Text style={styles.paymentSubtitle}>Escaneie o QR Code com seu app de pagamento:</Text>
            <Image
              style={styles.qrCode}
              source={{ uri: 'https://via.placeholder.com/200x200.png?text=QR+Code' }} // Substituir pela geração real
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
              <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
            </TouchableOpacity>
          </View>
        );
      case 'boleto':
        return (
          <View style={styles.paymentContent}>
            <Text style={styles.paymentSubtitle}>Seu boleto foi gerado:</Text>
            <Text style={styles.boletoText}>
              Código de barras: 12345.67890 12345.67890 12345.67890 12345.67890
            </Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
              <Text style={styles.confirmButtonText}>Copiar código e pagar</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View style={styles.paymentMethods}>
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentOption('cartao')}>
              <Ionicons name="card" size={24} color="#FB8107" />
              <Text style={styles.paymentText}>Cartão de Crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentOption('pix')}>
              <Ionicons name="qr-code" size={24} color="#FB8107" />
              <Text style={styles.paymentText}>PIX</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentOption('boleto')}>
              <Ionicons name="document" size={24} color="#FB8107" />
              <Text style={styles.paymentText}>Boleto</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <View style={[styles.modalView, { height: screenHeight * 0.7 }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FB8107" />
          </TouchableOpacity>
          <ProdutoModal document={document} />
          <View style={styles.paymentOptions}>
            <Text style={styles.paymentTitle}>Opções de Pagamento</Text>
            {renderPaymentContent()}
          </View>
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
            uri: document ? document['img'] : 'https://via.placeholder.com/100',
          }}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>{document?.preco ? `R$${document['preco']}` : 'R$ 80.90'}</Text>
          <Text style={styles.productStock}>{document?.quantidade ? `Estoque: ${document['quantidade']}` : 'Estoque: 00'}</Text>
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
  paymentOptions: {
    marginTop: 20,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentOption: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  paymentText: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  paymentContent: { alignItems: 'center', marginTop: 20 },
  paymentSubtitle: { fontSize: 16, color: '#555', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginVertical: 5, borderRadius: 5, width: '100%' },
  confirmButton: { backgroundColor: '#FB8107', padding: 10, borderRadius: 5, marginTop: 10, width: '100%' },
  confirmButtonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  qrCode: { height: 200, width: 200, marginVertical: 10 },
  boletoText: { fontSize: 14, color: '#555', marginBottom: 10 },
});


export default BottomModal; 