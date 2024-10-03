import { Link, LinkProps } from "expo-router";
import { View, Text } from "react-native";
import { styles } from "./styles";

type Settings = {
    titulo?:string
    rota?:string
}

export function SettingsSection({titulo, rota}:Settings){
    return (
        <Link href={rota ? rota : "./"}>
                    <View style={styles.configsView}>
                            <Text>
                                {titulo}
                            </Text>
                    </View>
                </Link>
    )
}