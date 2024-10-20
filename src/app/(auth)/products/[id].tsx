import { readDocument } from "@/storage/firebaseOperations";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View, Image, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import BottomModal from "../../../components/modal";
import { Ionicons } from "@expo/vector-icons";

export default function TesteLink() {
    const [modalVisible, setModalVisible] = useState(false);
    const [document, setDocument] = useState<DocumentData>();
    const { id } = useLocalSearchParams();
    const idString = id.toString();
    const statusBarHeight = StatusBar.currentHeight;
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await readDocument('produto', idString);
            setDocument(data);
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Ionicons 
                name="arrow-back" 
                size={24} 
                color="#fff" 
                style={styles.backButton} 
                onPress={() => router.back()} 
            />
            <ImageProduto {...document} />
            <DescriptionProduto {...document} />
            <View style={styles.idContainer}>
                <Text style={styles.idText} selectable>
                    {idString}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.buyButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
            <BottomModal  
                visible={modalVisible} 
                onClose={() => setModalVisible(false)}
                idProduto={id}
            />
        </View>
    );
}

function ImageProduto({ img }: DocumentData) {
    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={{
                    uri: img || "Carregando...",
                }}
            />
        </View>
    );
}

function DescriptionProduto({ nome, preco, quantidade, ownerId }: DocumentData) {
    return (
        <View style={styles.descriptionContainer}>
            <Text style={styles.productName}>
                {nome || 'Pequeno exemplo de nome de produto'}
            </Text>
            <Text style={styles.productPrice}>
                {preco ? `R$${preco}` : 'R$ 80.90'}
            </Text>
            <Text style={styles.productStock}>
                {quantidade ? `Estoque: ${quantidade}` : 'Estoque: 00'}
            </Text>
            <Text style={styles.sellerId}>
                Código do Vendedor: {ownerId}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop: StatusBar.currentHeight,
    },
    backButton: {
        position: 'absolute', 
        top: 10,              
        left: 10,             
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        borderRadius: 10, 
        padding: 5,
    },
    imageContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
    },
    image: {
        height: 350,
        width: '100%',
        backgroundColor: "#c7c7c7",
    },
    descriptionContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    productName: {
        fontSize: 20,
        fontWeight: '600',
        color: "#000",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#c21b1b",
        marginBottom: 5,
    },
    productStock: {
        fontSize: 16,
        color: "#000",
        marginBottom: 5,
    },
    sellerId: {
        fontSize: 14,
        color: "#666",
    },
    idContainer: {
        justifyContent: "flex-start",
        alignItems: 'center',
        marginBottom: 20,
    },
    idText: {
        textAlign: 'center',
        color: "#000",
    },
    buyButton: {
        margin: 20,
        backgroundColor: '#FB8107', // A vibrant color for the button
        paddingVertical: 15, // Increased padding for a larger touch area
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    buyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // White text for contrast
    },
});
