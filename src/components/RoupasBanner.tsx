import { View, Image, StyleSheet } from "react-native";
import React from "react";

export default function RoupasBanner() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/banner1.png")} style={styles.image} />
                <Image source={require("../../assets/images/video.svg")} style={styles.emAltaIcon} />
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/banner5.jpg")} style={styles.image} />
                <Image source={require("../../assets/images/video.svg")} style={styles.emAltaIcon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        position: 'relative', // Permite a sobreposição da imagem "Em Alta"
        width: '48%', // Ajusta a largura das imagens
    },
    image: {
        width: '100%', // Ajusta a largura das imagens
        height: 150,
        resizeMode: 'contain', // Preencher sem distorcer
        borderRadius: 15,
    },
    emAltaIcon: {
        position: 'absolute',
        top: 140, // Ajuste a posição do ícone
        right: 68, // Ajuste a posição do ícone
      
        resizeMode: 'contain',
    },
});
