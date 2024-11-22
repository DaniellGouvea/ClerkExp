import { View, TextInput, Alert, StyleSheet } from "react-native";
import { styles } from "@/app/(public)/styles";
import { useState } from "react";
import { Button } from "@/components/Button";
import { readDocument, updateDocument } from "@/storage/firebaseOperations";
import { useAuth } from "@clerk/clerk-expo";

type ProdutoType = {
    img: string;
    nome: string;
    preco: string;
    quantidade: string;
};

export default function EditProd() {
    const { userId } = useAuth()

    const [image, setImage] = useState('');
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [id, setId] = useState("")

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    

    function editarProduto() {
        setIsLoading(true)
        // Validação simples para garantir que os campos não estejam vazios
        if (!image || !nome || !preco || !quantidade) {
            setIsLoading(false)
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            console.log('Por favor, preencha todos os campos.');
            return;
        }
        
        const produto: ProdutoType = {
            img: image,
            nome: nome,
            preco: preco,
            quantidade: quantidade,
        };

        console.log(produto);


            updateDocument("produto", id, produto, userId)
                .then(() => {
                    setIsLoading(false)
                    // Limpar os campos após a criação
                    setImage('');
                    setNome('');
                    setPreco('');
                    setQuantidade('');
                    
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert('Erro', 'Ocorreu um erro ao editar o produto.');
                    console.log('Ocorreu um erro ao editar o produto.')
                    setIsLoading(false)
                });
    }

    
    const getProdutoById = async (produtoId: string) => {
        setIsLoading(true)
        const produto = await readDocument('produto', produtoId);
        if (produto) {
            console.log('Produto encontrado:', produto);
            setIsEditing(true)
            setImage(produto["img"])
            setNome(produto["nome"])
            setPreco(produto["preco"])
            setQuantidade(produto["quantidade"])
            setIsLoading(false)
            return produto;
        } else {
            console.log('Produto não encontrado');
            setIsLoading(false)
            return null;
        }
    };
    

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isEditing ?(<>
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
                    icon="create-outline"
                    title="Confirmar Edição"
                    onPress={editarProduto}
                    variant="secondary"
                    isLoading = {isLoading}
                />
            </>):(
                <>
                <TextInput
                    value={id}
                    style={[styles.input, localStyles.input]}
                    placeholder="ID do Produto"
                    onChangeText={setId}
                />
                <Button 
                    title="Editar"
                    icon="pencil-outline"
                    variant="secondary"
                    isLoading = {isLoading}
                    onPress={()=>(getProdutoById(id))}
                    // só Mudar após os dados serem puxado
                    // tentar entender o erro com firebase que tá dando
                />
                </>
        )}
        </View>
    );
}

const localStyles = StyleSheet.create({
    input:{
       margin: 10
    }
})
