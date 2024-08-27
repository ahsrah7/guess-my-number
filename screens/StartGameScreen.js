import { View, TextInput, StyleSheet, Button, Alert, Text ,ScrollView, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';

const StartGameScreen = ({ onPickNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState('');
    const { width, height } = useWindowDimensions();
    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText)
    }

    function resetInputHandler() {
        setEnteredNumber("")
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invaild number!',
                'Number has to be a number between 1 and 99',
                [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }]
            )
            return;
        }
        onPickNumber(chosenNumber);

    }


    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior='position'>
        <View style={{marginTop:marginTopDistance}}>
            <View style={styles.titleContainer}>
            <Title style={styles.title}>Guess My Number</Title>
            </View>
            <Card>
                <Text style={styles.instructionText}>
                    Enter a Number
                </Text>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType='number-pad'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;



const styles = StyleSheet.create({
    title: {
        color: 'white',
        borderColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionText: {
        color:Colors.accent500,
        fontSize: 24,
        fontWeight: 'bold'
    },
    numberInput: {
        width: 50,
        height: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',

    },
    buttonContainer: {
        flex: 1
    }
})