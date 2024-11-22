import { View, Image, StyleSheet } from "react-native";
import React from "react";

export default function RoupasBanner() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/promotion1.png")} style={styles.image} />
                <Image source={require("../../assets/images/video.svg")} style={styles.emAltaIcon} />
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/promotion2.png")} style={styles.image} />
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
        position: 'relative', 
        width: '48%', 
    },
    image: {
        width: '100%', 
        height: 150,
        resizeMode: 'contain',
        borderRadius: 20,
    },
    emAltaIcon: {
        position: 'absolute',
        top: 140, 
        right: 68, 
      
        resizeMode: 'contain',
    },
});
