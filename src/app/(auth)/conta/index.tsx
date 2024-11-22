import { Button } from "@/components/Button";
import { useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";

export default function contaConfig ( ) {

    const { signOut } = useAuth()

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Button
                        icon="exit"
                        title="Sair"
                        onPress={() => signOut()}
                    /> 
        </View>
    )
}