import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import SignupForm from '../components/signupScreen/SignupForm';

const INSTAGRAM_LOGO =
    'https://static.tildacdn.com/tild3436-3336-4930-a631-316139616166/what-is-png-file-for.png';

const SignupScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }}
                />
            </View>
            <SignupForm navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 70,
    },
});

export default SignupScreen;
