import { readDocument } from "@/storage/firebaseOperations";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View, Image, StatusBar, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import BottomModal from "../../../components/modal";
import { Ionicons } from "@expo/vector-icons";

interface Comment {
    id: number;
    text: string;
    rating: number;
}

export default function TesteLink() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [document, setDocument] = useState<DocumentData | undefined>(undefined);
    const { id } = useLocalSearchParams<{ id: string }>();
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

    const shippingCost = 10.00; 
    const storeRating = 4.5; 
    const productsSold = 120; 
    const comments: Comment[] = [
        { id: 1, text: "Ótimo produto!", rating: 5 },
        { id: 2, text: "Entregue rapidamente.", rating: 4 },
    ];

    return (
        <ScrollView style={styles.container}>
            <Ionicons 
                name="arrow-back" 
                size={24} 
                color="#fff" 
                style={styles.backButton} 
                onPress={() => router.back()} 
            />
            <ImageProduto img={document?.img} />
            <DescriptionProduto 
                nome={document?.nome} 
                preco={document?.preco} 
                quantidade={document?.quantidade} 
                ownerId={document?.ownerId} 
            />
            <ShippingInfo cost={shippingCost} />
            <StoreInfo rating={storeRating} productsSold={productsSold} />
            <CommentsSection comments={comments} />
            <View style={styles.idContainer}>
                <Text style={styles.idText} selectable>
                    Código: {idString}
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
        </ScrollView>
    );
}

interface ImageProdutoProps {
    img?: string;
}

function ImageProduto({ img }: ImageProdutoProps) {
    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={{
                    uri: img || "https://via.placeholder.com/350x200",
                }}
            />
        </View>
    );
}

interface DescriptionProdutoProps {
    nome?: string;
    preco?: number;
    quantidade?: number;
    ownerId?: string;
}

function DescriptionProduto({ nome, preco, quantidade, ownerId }: DescriptionProdutoProps) {
    return (
        <View style={styles.descriptionContainer}>
            <Text style={styles.productName}>
                {nome || 'Nome do produto indisponível'}
            </Text>
            <Text style={styles.productPrice}>
                {preco ? `R$${preco}` : 'Preço não disponível'}
            </Text>
            <Text style={styles.productStock}>
                {quantidade ? `Estoque: ${quantidade}` : 'Estoque: 0'}
            </Text>
            <Text style={styles.sellerId}>
                Código do Vendedor: {ownerId || 'N/A'}

            </Text>
            
        </View>

    );
}

interface ShippingInfoProps {
    cost: number;
}

function ShippingInfo({ cost }: ShippingInfoProps) {
    return (
        <View style={styles.shippingContainer}>
            <Text style={styles.shippingTitle}>Custo de Frete:</Text>
            <Text style={styles.shippingCost}>R$ {cost.toFixed(2)}</Text>
        </View>
    );
}

interface StoreInfoProps {
    rating: number;
    productsSold: number;
}

function StoreInfo({ rating, productsSold }: StoreInfoProps) {
    return (
        <View style={styles.storeInfoContainer}>
            <Text style={styles.storeRating}>Avaliação da Loja: {rating} ⭐</Text>
            <Text style={styles.productsSold}>Produtos Vendidos: {productsSold}</Text>
        </View>
    );
}

interface CommentsSectionProps {
    comments: Comment[];
}

function CommentsSection({ comments }: CommentsSectionProps) {
    return (
        <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>Comentários:</Text>
            {comments.map(comment => (
                <View key={comment.id} style={styles.comment}>
                    <Text style={styles.commentText}>⭐ {comment.rating}: {comment.text}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginBottom: 20,
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
        marginBottom: 20,
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
    shippingContainer: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    shippingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shippingCost: {
        fontSize: 16,
        color: "#c21b1b",
    },
    storeInfoContainer: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    storeRating: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productsSold: {
        fontSize: 16,
        color: "#666",
    },
    commentsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    comment: {
        paddingVertical: 5,
    },
    commentText: {
        fontSize: 16,
        color: "#333",
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
        backgroundColor: '#FB8107',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    buyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
