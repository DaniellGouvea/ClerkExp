import { View, TextInput, Alert, StyleSheet } from "react-native";
import { styles } from "@/app/(public)/styles";
import { useState } from "react";
import { Button } from "@/components/Button";
import { createDocument } from "@/storage/firebaseOperations";
import { useNavigation } from '@react-navigation/native';



type ProdutoType = {
    img: string;
    nome: string;
    preco: string;
    quantidade: string;
};

export default function AdicionarProd() {
    const navigation = useNavigation()
    const [image, setImage] = useState('');
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const [isLoading, setIsLoading] = useState(false)

    
    function criarProduto() {
        setIsLoading(true)
        // Validação simples para garantir que os campos não estejam vazios
        if (!image || !nome || !preco || !quantidade) {
            setIsLoading(false)
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const produto: ProdutoType = {
            img: image,
            nome: nome,
            preco: preco,
            quantidade: quantidade,
        };

        console.log(produto);

        // Enviar os dados para o banco de dados
        createDocument('produto', produto)
            .then(() => {
                setIsLoading(false)
                Alert.alert('Sucesso', 'Produto criado com sucesso!');
                // Limpar os campos após a criação
                setImage('');
                setNome('');
                setPreco('');
                setQuantidade('');
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error);
                Alert.alert('Erro', 'Ocorreu um erro ao criar o produto.');
            });
    }

    

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TextInput
                value={image}
                style={styles.input}
                placeholder="Url Imagem"
                onChangeText={setImage}
            />

            <TextInput
                value={nome}
                style={styles.input}
                placeholder="Nome"
                onChangeText={setNome}
            />

            <TextInput
                value={preco}
                style={styles.input}
                placeholder="Preço"
                onChangeText={setPreco}
            />

            <TextInput
                value={quantidade}
                style={styles.input}
                placeholder="Quantidade"
                onChangeText={setQuantidade}
            />

            <Button
                icon="american-football-sharp"
                title="Criar"
                onPress={criarProduto}
                variant="secondary"
                isLoading = {isLoading}
            />
            <Button
            icon="alert"
            title="voltar"
            onPress={()=>(navigation.goBack())}
            //Trocar isso por um seta sla
            //Criar Nivel de Responsabilidade para ter acesso ou não a tela de edição
            />
        </View>
    );
}
