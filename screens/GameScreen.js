import React, { useState, useRef, useEffect } from 'react';
import { 
        View, 
        Text, 
        StyleSheet, 
        Alert, 
        ScrollView, 
        FlatList, 
        Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  * as ScreenOrientation  from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
    
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  
  const [deviceAvailableWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceAvailableHeight, setvAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
 
  useEffect( () => {

      const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setvAvailableDeviceHeight(Dimensions.get('window').height);
      };

      Dimensions.addEventListener('change', updateLayout);

      return () => {
        Dimensions.removeEventListener('change', updateLayout);        
      };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Opps!", 'Not correct!', [
        { text: 'OK!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);    
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
  };


  let listContainerStyle= styles.listContainer;

  if (deviceAvailableWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (deviceAvailableHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                
                {/* <Card style={styles.buttonContainer}> */}
                <View style={styles.controls}>
                            <MainButton onPress={  () => { nextGuessHandler('lower');  } }>                    
                                <Ionicons name="md-remove" size={24} color="white" />
                            </MainButton>
                            
                            <NumberContainer>{currentGuess}</NumberContainer>

                            <MainButton onPress={  () => { nextGuessHandler('greater'); } }>
                            <Ionicons name="md-add" size={24} color="white" />
                            </MainButton>
                </View>

                {/* </Card> */}
                <View style={listContainerStyle}>

                    <FlatList 
                        keyExtractor={ (item) => item } 
                        data={pastGuesses} 
                        renderItem={renderListItem.bind(this, pastGuesses.length )} 
                        contentContainerStyle={styles.list}
                    />        

                </View>
            </View>
        );
  }

  return (
    

            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                
                <Card style={styles.buttonContainer}>
                
                            <MainButton onPress={  () => { nextGuessHandler('lower');  } }>                    
                                <Ionicons name="md-remove" size={24} color="white" />
                            </MainButton>
                            
                            <NumberContainer>{currentGuess}</NumberContainer>

                            <MainButton onPress={  () => { nextGuessHandler('greater'); } }>
                            <Ionicons name="md-add" size={24} color="white" />
                            </MainButton>
                

                </Card>
                <View style={listContainerStyle}>

                    <FlatList 
                        keyExtractor={ (item) => item } 
                        data={pastGuesses} 
                        renderItem={renderListItem.bind(this, pastGuesses.length )} 
                        contentContainerStyle={styles.list}
                    />        

                </View>
            </View>

  );


};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //marginTop: 20,
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  controls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '80%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1,    
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default GameScreen;