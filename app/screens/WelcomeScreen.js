import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, Image, Text, Button, Alert} from 'react-native';

function WelcomeScreen({navigation}) {
    // Declare a new state variable, which we'll call "count" and set it to 0 
    // State variables are saved even when function is exited
    // useState() returns the current state and a function that updates it 
    const [count, setCount] = useState(0);
    return (
       <ImageBackground 
       style={styles.background}
       source={require('../assets/background.jpg')}
       >
           <Button 
            style={styles.timerButton}
            onPress={
                ()=>navigation.navigate('Timer')
            }
            title="Set Timer"
           />
       </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:"flex-end", 
        justifyContent:"center"
    },
    timerButton:{
        color:"navy"
    },
    

})

export default WelcomeScreen;