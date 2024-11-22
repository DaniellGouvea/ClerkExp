import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons"; // ou outra biblioteca de ícones

export default function ProdutosIcones() {
    const icons = [
        { name: "shopping-cart", label: "Carrinho" },
        { name: "star", label: "Ofertas" },
        { name: "local-offer", label: "Promoções" },
        { name: "category", label: "Categorias" },
    
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categorias</Text>
            <View style={styles.iconContainer}>
                {icons.map((icon, index) => (
                    <View key={index} style={styles.iconWrapper}>
                        <Icon name={icon.name} size={30} color="#f56e00" style={{fontFamily: "poppins-regular"}}/>
                        <Text style={styles.iconLabel}>{icon.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        fontFamily:"poppins-regular",
    },
    iconContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    iconWrapper: {
        alignItems: "center",
        margin: 10,
    },
    iconLabel: {
        marginTop: 4,
        textAlign: "center",
    },
});
