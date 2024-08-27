import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView  } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
export default function App() {
  const [userNumber,setuserNumber] = useState(null);
  const [gameIsOver,setGameIsOver] = useState(true);
  const [guessRounds,setGuessRounds] = useState(0);
    useFonts({
      'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
    });
  function guessRoundsHandler(){
    
    setGuessRounds((state)=>state + 1)
  }
  function pickedNumberHandler(pickedNumber){
    setuserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function startNewGameHandler(){
    // setGameIsOver(false);
    setuserNumber(null);
    setGuessRounds(0);
  }
  function gameOverHandler(){
    setGameIsOver(true);
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if(userNumber){
    screen = <GameScreen guessRounds={guessRounds} onGuessCounts={guessRoundsHandler} userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen rounds={guessRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler} />
  }

  
  return (<>
    <StatusBar style='light' />
    <LinearGradient colors={['#4e0329','#ddb52f']} style={styles.rootScreen} >
      <ImageBackground imageStyle={styles.backGroundImage} source={require("./assets/images/background.png")} resizeMode='cover' style={styles.rootScreen} >
      <SafeAreaView style={styles.rootScreen}>
      {screen}
      </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex: 1
  },
  backGroundImage: {
    opacity: 0.15
  }
});
