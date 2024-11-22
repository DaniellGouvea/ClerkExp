import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const OfertaRelampago: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number>(4600);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ofertas Relâmpago</Text>
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
            </View>
            <View style={styles.cardsContainer}>
                <Card title="Produto 1" onPress={() => setModalVisible(true)} />
                <Card title="Produto 2" onPress={() => setModalVisible(true)} />
                <Card title="Produto 3" onPress={() => setModalVisible(true)} />
                <Card title="Produto 4" onPress={() => setModalVisible(true)} />
            </View>
            <PaymentModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
};

interface CardProps {
    title: string;
    onPress: () => void;
}

const Card: React.FC<CardProps> = ({ title, onPress }) => {
    const [itemsSold, setItemsSold] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setItemsSold(prev => (prev < 100 ? prev + Math.floor(Math.random() * 5) : 100));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const isSoldOut = itemsSold >= 100;

    return (
        <View style={styles.card}>
            <View style={styles.cardPlaceholder}>
                <Text style={styles.cardPlaceholderText}>Imagem</Text>
            </View>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${itemsSold}%` }]} />
            </View>
            <Text style={styles.soldText}>{itemsSold} vendidos</Text>
            <TouchableOpacity style={styles.buyButton} disabled={isSoldOut} onPress={onPress}>
                <Text style={styles.buttonText}>{isSoldOut ? "Esgotado" : "Comprar"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const PaymentModal: React.FC<{ visible: boolean; onClose: () => void; }> = ({ visible, onClose }) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('pix');
    const [cardNumber, setCardNumber] = useState<string>('');

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <ScrollView style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Escolha o Método de Pagamento</Text>
                    <TouchableOpacity onPress={() => setPaymentMethod('pix')} style={[styles.paymentOption, paymentMethod === 'pix' && styles.selectedOption]}>
                        <Text>PIX</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPaymentMethod('credit')} style={[styles.paymentOption, paymentMethod === 'credit' && styles.selectedOption]}>
                        <Text>Cartão de Crédito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPaymentMethod('boleto')} style={[styles.paymentOption, paymentMethod === 'boleto' && styles.selectedOption]}>
                        <Text>Boleto</Text>
                    </TouchableOpacity>

                    {paymentMethod === 'credit' && (
                        <TextInput
                            style={styles.cardInput}
                            placeholder="Número do Cartão"
                            value={cardNumber}
                            onChangeText={setCardNumber}
                            keyboardType="numeric"
                        />
                    )}

                    {paymentMethod === 'pix' && (
                        <View style={styles.qrCodeContainer}>
                            <QRCode value="Exemplo de QR Code para pagamento" size={200} />
                        </View>
                    )}

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 10,
    },
    title: {
        fontFamily: "poppins-regular",
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        textAlign: "center",
    },
    timerContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    },
    timer: {
        fontFamily: "poppins-regular",
        fontSize: 24,
        color: "#000",
        fontWeight: 'bold',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '48%',
        marginVertical: 5,
    },
    cardPlaceholder: {
        width: '100%',
        height: 100,
        backgroundColor: '#ddd',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardPlaceholderText: {
        color: '#000',
        fontWeight: 'bold',
    },
    cardTitle: {
        fontFamily: "poppins-regular",
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    progressBarContainer: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        height: 10,
        marginBottom: 10,
    },
    progressBar: {
        backgroundColor: '#f56e00',
        height: '100%',
    },
    soldText: {
        fontFamily: "poppins-regular",
        fontSize: 14,
        marginBottom: 10,
    },
    buyButton: {
        backgroundColor: '#f56e00',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paymentOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    selectedOption: {
        backgroundColor: '#f56e00',
    },
    cardInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    qrCodeContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    closeButton: {
        backgroundColor: '#f56e00',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
});

export default OfertaRelampago;
