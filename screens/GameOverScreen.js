import React from 'react';
import {Text, 
        View, 
        Button, 
        StyleSheet, 
        Image, 
        Dimensions, 
        ScrollView
} from 'react-native';
import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {

    return (

        
            <ScrollView>
                <View style={styles.screen}>
                    <TitleText>Game over!</TitleText>

                    <View style={styles.imageContainer}>
                        <Image 
                            source={ require('../assets/success.png') }  
                            //source={ { uri: 'https://media-exp1.licdn.com/dms/image/C4E0BAQGfFsoJqupz8Q/company-logo_200_200/0/1519856152289?e=2159024400&v=beta&t=aK802tfikaS9KwsHz0pBuIDjYmqWncurvya4nb_rGDQ'} }  
                            style={styles.image} 
                            resizeMode='cover'
                        />
                    </View>

            
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.resultText}>
                                Your phone needed <Text style={styles.highligt}>{props.guessRounds}</Text> rounds 
                                to guess the number <Text style={styles.highligt}> {props.userNumber} </Text></BodyText>            
                    </View>
                    
                    <MainButton             
                        onPress={ ()=> {props.onRestart();}} 
                        style={styles.button}>
                            START AGAIN!    
                    </MainButton>

                </View>
            </ScrollView>
              
    );

};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10 
    },
     imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 40

    },  
    image: {
        width: '100%',        
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highligt: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});

export default GameOverScreen;

