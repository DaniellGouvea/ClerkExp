import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons"

import { styles } from "./styles"

type Variants = "primary" | "secondary"

interface ButtonProps extends TouchableOpacityProps {
    title: string
    isLoading?: boolean
    icon: keyof typeof Ionicons.glyphMap
    variant?: Variants
}


export function Button( { title, isLoading = false, icon, variant = "primary", ...rest }: ButtonProps ){
    return (
        <TouchableOpacity
            style ={[
                styles.container,
                variant === "primary" && styles.v1,
                variant === "secondary" && styles.v2
            ]}
            disabled={isLoading}
            activeOpacity={0.8}
            {...rest}
        >
            {
            isLoading ? 
            ( 
                <ActivityIndicator  color={"#fff"}/> 
            ) : 
                <>
                    < Ionicons name = {icon} style = {styles.icon}/>
                    <Text style = {styles.text}>{title}</Text>
                </>
            }
            
        </TouchableOpacity>
    )
}