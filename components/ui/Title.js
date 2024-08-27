import { StyleSheet, Text,Platform } from "react-native";

const Title = ({children,style})=>{

    return  <Text style={[styles.title,style]}>{children}</Text>
};

export default Title;


const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight:'bold',
        color: '#ddb52f',
        textAlign: 'center',
        borderColor: '#ddb52f',
        // borderWidth: Platform.OS === 'android' ? 0 : 2,
        borderRadius: Platform.select({ios: 2, android: 0}),
        paddingHorizontal: 24,
        paddingVertical: 12,
        maxWidth: '80%'
    }
})