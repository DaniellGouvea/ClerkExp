


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Button } from './Button';

const QuantidadeSelector = () => {
  const [quantidade, setQuantidade] = useState('1');

  const aumentarQuantidade = () => setQuantidade((prev) => String(Number(prev) + 1));
  const diminuirQuantidade = () => setQuantidade((prev) => String(Math.max(1, Number(prev) - 1)));

  const handleInputChange = (value:string) => {
    if (value === '') {
      setQuantidade('');
    } else {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue > 0) {
        setQuantidade(String(numericValue));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quantidade</Text>
      <View style={styles.selector}>
        <TouchableOpacity style={styles.button} onPress={diminuirQuantidade}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={quantidade}
          keyboardType="numeric"
          onChangeText={handleInputChange}
          onBlur={() => {
            if (quantidade === '') {
              setQuantidade('1');
            }
          }}
        />
        <TouchableOpacity style={styles.button} onPress={aumentarQuantidade}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>
      <Button icon='wallet' title='Comprar' style ={{ 
          backgroundColor: '#FB8107', 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'center', 
          borderRadius: 5, 
          padding: 5, 
          marginLeft: 70, 
          gap: 4 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginRight: 5,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  button: {
    padding: 5, 
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#cccccc', 
  },
  buttonText: {
    fontSize: 16, 
    textAlign: 'center',
  },
  input: {
    paddingVertical: 5,
    textAlign: 'center',
    width: 40, 
    fontSize: 14, 
  },
});

export default QuantidadeSelector;
