import React from 'react';
import { 
        View, 
        Text, 
        StyleSheet, 
        TouchableOpacity
    } from 'react-native';
import Colors from '../constants/colors';

const MainButton = (props) => {

    let ButtonComponent = TouchableOpacity;
  
    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.8} onPress={ () => { props.onPress(); }}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>                        
            </ButtonComponent>
        </View>
    );

};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontSize: 'open-sans',
        fontSize: 18
    },
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',        
    }
});

export default MainButton;
