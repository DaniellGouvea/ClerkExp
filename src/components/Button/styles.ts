import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: "center",
        gap: 7,
        padding: 22,
        borderRadius: 16
    },
    v1:{
        width: "100%",
        backgroundColor: "#000"
    },
    v2:{
        width: "50%",
        backgroundColor: "#000",
        marginTop: 20
    },
    icon:{
        color:'#fff',
        fontSize: 20
    },
    text:{
        color:'#fff',
        fontSize: 16
    }
})