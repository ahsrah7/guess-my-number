import { Text, View ,StyleSheet, Alert, FlatList,useWindowDimensions} from "react-native"
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import Colors from "../constants/colors";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandonBetween(min,max,exclude){
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude){
        return generateRandonBetween(min,max,exclude);
    }else{
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;
const GameScreen = ({userNumber,onGameOver,onGuessCounts,guessRounds})=>{
    const {height, width}  = useWindowDimensions();
    const initialGuess = generateRandonBetween(1,100,userNumber);
    const [currentGuess,setCurrentGuess] = useState(initialGuess);
    const [logs,setLogs] = useState([initialGuess]);

    useEffect(()=>{
        if(currentGuess === userNumber){
            onGameOver();
        }
    },[currentGuess,userNumber,onGameOver])

    useEffect(()=>{
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    function nextGuessHandler(direction){        
        if((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert("Don't lie!",'You know that this is wrong....',[
                {text:"Sorry!",style: 'cancel'}
            ])
            return ;
        }


        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandonBetween(minBoundary,maxBoundary,currentGuess);
        onGuessCounts();
        setCurrentGuess(newRndNumber);
        setLogs(currentGuess=>[newRndNumber,...currentGuess])
    }


    let content = <>
    <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <Text style={styles.instructionText}>
                Higher or lower ?
            </Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>-</PrimaryButton>
                </View>
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>+</PrimaryButton>
            </View>
            </View>
        </Card>
    </>

    if(width > 600){
        content = <>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>-</PrimaryButton>
                </View>
             <NumberContainer>{currentGuess}</NumberContainer> 
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>+</PrimaryButton>
            </View>

            </View>
        </>
    }

    return <View style={styles.screen}>
        <Title style={styles.title}>Opponent's Pick</Title>
        {content}
        <View style={styles.listContainer}>
            <FlatList keyExtractor={item=>item} data={logs}
            renderItem={({index,item}) => <GuessLogItem roundNumber={logs.length - index} guess={item} />} />
        </View>
    </View>
}



export default GameScreen;



const styles = StyleSheet.create({
    title: {
        color: 'white',
        borderColor: 'white',
    },
    instructionText: {
        color:Colors.accent500,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    screen:{
        flex: 1,
        padding: 12,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',

    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})