import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Pressable,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import { firebase, db } from '../../firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';

const SignupForm = ({ navigation }) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string()
            .required()
            .min(6, 'Your password has to at least 6 characters'),
    });
    const getRandomProfilePicture = async () => {
        const responce = await fetch('https://randomuser.me/api');
        const data = await responce.json();
        return data.results[0].picture.large;
    };
    const onSignup = async (email, password, username) => {
        try {
            const authUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log('====================================');
            console.log('Firebase User Created Successfully', email, password);
            console.log('====================================');

            db.collection('users')
                .doc(authUser.user.email)
                .set({
                    owner_uid: authUser.user.uid,
                    username: username,
                    email: authUser.user.email,
                    profile_picture: await getRandomProfilePicture(),
                });
        } catch (error) {
            Alert.alert('My friend ...', error.message);
        }
    };
    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username);
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    isValid,
                }) => (
                    <>
                        <View
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.email.length < 1 ||
                                        Validator.validate(values.email)
                                            ? '#ccc'
                                            : 'red',
                                },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Phone number, username or email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.username.length < 1 ||
                                        values.username.length >= 2
                                            ? '#ccc'
                                            : 'red',
                                },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Username'
                                autoCapitalize='none'
                                keyboardType='username'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.password.length < 1 ||
                                        values.password.length >= 6
                                            ? '#ccc'
                                            : 'red',
                                },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                keyboardType='email-address'
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <Pressable
                            titleSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={{ color: '#6BB0F5' }}>
                                    {' '}
                                    Log In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
        justifyContent: 'center',
    },
    button: (isValid) => ({
        marginTop: 50,
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    }),
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    },
});

export default SignupForm;
