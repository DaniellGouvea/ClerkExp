import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

const banners = [
  require("../../assets/images/banner.png"),
  require("../../assets/images/banner5.png"),
  require("../../assets/images/banner7.png"),
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // Troca a cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={banners[currentIndex]}
        style={styles.image}
        accessibilityLabel="Descrição da imagem do banner"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 15,
  },
  overlayText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 5,
    borderRadius: 5,
  },
});
