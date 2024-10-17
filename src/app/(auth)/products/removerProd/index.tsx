import { TextInput, View, Text, Alert } from "react-native";
import { useState } from "react";
import { styles } from "@/app/(public)/styles";
import { Button } from "@/components/Button";
import { deleteDocument } from "@/storage/firebaseOperations";
import { useAuth } from "@clerk/clerk-expo";

export default function removerProd(){
    const { userId } = useAuth()

    const [id, setId] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    function deleteProduto(id:string){
        setIsLoading(true)
        deleteDocument("produto", id, userId)
        .then(() =>{
            setIsLoading(false)
            setId('')
        })
        .catch((error)=> {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao deletar o produto.');
            console.log('Ocorreu um erro ao deletar o produto.')
        })
    }

     return(
        <View style={{ backgroundColor: "#fff", flex: 1, justifyContent: "center", alignItems: "center" }}>
            
                <>
                    <TextInput
                        value={id}
                        style={[styles.input, localStyles.input]}
                        placeholder="ID do Produto"
                        onChangeText={setId}
                    />
                </>

            <Button
                icon="close-circle-outline"
                title={"Confirmar Exclusão"}
                onPress={() => (deleteProduto(id))}
                variant="secondary"
                isLoading = {isLoading}
            />

        </View>
     )
}

const localStyles = {
    input: {
        width: 200,
        padding: 10,
        borderColor: "#000",
        borderWidth: 1,
        marginBottom: 10,
    },
}