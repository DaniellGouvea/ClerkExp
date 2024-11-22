import { View, Text, Image, Modal, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header() {
    const { user } = useUser();
    const [cartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([{ id: 1, name: "Produto 1", price: 29.99 }]); // Exemplo de itens

    const totalItems = cartItems.length;

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Shoopy</Text>
                <View style={styles.userContainer}>
                    <TouchableOpacity onPress={() => setCartVisible(true)} style={styles.cartIconContainer}>
                        <Icon name="shopping-cart" size={32} color="#000" />
                        {totalItems > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{totalItems}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <Image 
                        source={{ uri: user?.imageUrl }} 
                        style={styles.userImage} 
                    />
                </View>
            </View>

            {/* Modal do Carrinho */}
            <Modal
                visible={cartVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Carrinho</Text>
                        <ScrollView>
                            {cartItems.length === 0 ? (
                                <Text style={styles.emptyCartText}>O carrinho está vazio</Text>
                            ) : (
                                cartItems.map(item => (
                                    <View key={item.id} style={styles.cartItem}>
                                        <Text style={styles.cartItemName}>{item.name}</Text>
                                        <Text style={styles.cartItemPrice}>R$ {item.price.toFixed(2)}</Text>
                                    </View>
                                ))
                            )}
                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setCartVisible(false)}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#fff",
        elevation: 2,
    },
    headerTitle: {
        fontSize: 30,
        fontFamily: "poppins-regular",
        fontWeight: "bold",
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    cartIconContainer: {
        position: "relative",
        marginRight: 10,
    },
    notificationBadge: {
        position: "absolute",
        right: -5,
        top: -5,
        backgroundColor: "red",
        borderRadius: 999,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 999,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyCartText: {
        textAlign: "center",
        marginVertical: 20,
    },
    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    cartItemName: {
        fontSize: 16,
    },
    cartItemPrice: {
        fontSize: 16,
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#f56e00",
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
