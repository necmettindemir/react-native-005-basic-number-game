import React, { useState, useEffect } from 'react';
import {View, Text,
        StyleSheet,         
        Button, 
        TouchableWithoutFeedback,
        Keyboard,
        Alert,
        Dimensions,
        ScrollView,
        KeyboardAvoidingView
    } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const StartGameScreen = props => {


    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(0);
    
    const initButtonWidth = Dimensions.get('window').width/4;
    const [buttonWidth, setButtonWidth] = useState(initButtonWidth);

   
    
    const numberInputHandler = (text) => {        
        setEnteredValue(text);
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect( () => {

        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width/4);
        };
    
        Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });


    const confirmInputHandler = () => {

        const chosenNumber = parseInt(enteredValue);

        if (  isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 99) {
         
            Alert.alert(
                            'Invalid number!',
                            'Number has to be in 1-99',
                            [{ 
                                text:'OK', 
                                style:'destructive',
                                onPress:resetInputHandler
                            }]
                        );
            
            return;

        }
            
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');    
        Keyboard.dismiss();    

    };


    let confirmedOutput;

    if (confirmed) {
        
        confirmedOutput = (
            <Card style={styles.summaryContainer}>                
                <NumberContainer>{ selectedNumber}</NumberContainer>
                <MainButton 
                    title="START GAME" 
                    onPress={ () => props.onStartGame(selectedNumber)}>
                            START GAME!
                </MainButton>
            </Card>
        );

    }

    return (
        <ScrollView>
            <KeyboardAvoidingView 
                    behavior="position" 
                    keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss(); }}>
                <View style={styles.screen}>
                    
                
                        <BodyText style={styles.title}>Start a New Game</BodyText>
                        

                        <Card style={ styles.inputContainer }>
                            
                            <TitleText style={styles.title}>Select a Number</TitleText>
                                    
                            <Input style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText= {numberInputHandler}
                                value={enteredValue}
                            />
                            
                            <View style={ styles.buttonContainer}>

                                <View styles={{width: buttonWidth}}>

                                    <Button 
                                        title="Reset"  
                                        onPress= {  () => { resetInputHandler(); } } 
                                        color={Colors.accent} 
                                    />
                                </View>

                                <View styles={{width: buttonWidth}}>
                                    <Button 
                                        title="Confirm"  
                                        onPress= {  () => { confirmInputHandler(); } } 
                                        color={Colors.primary}
                                    />
                                </View>

                            </View>
                        </Card>

                        {confirmedOutput}

                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,   
        fontFamily: 'open-sans-bold'     
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent:'space-between',
        paddingHorizontal: 15,

    },
     input: {      
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
});

export default StartGameScreen;