import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Image, Text, Pressable, TextInput } from 'react-native';
import ReactPhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

export default function App(props) {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const messageBodyText = 'Вы можете получать от нас SMS-уведомления в целях безопасности и выполнения входа.';
  const { onPress, title = 'Далее' } = props;
  const validate = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  };

  const phoneRouter = () => (
    <View style={styles.authBlock}>
      <View style={styles.authBlockItem}>
        <ReactPhoneInput country={'by'} defaultCountry="by" />
        <Text style={styles.message}>{messageBodyText}</Text>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </View>
    </View>
  );

  const emailRouter = () => (
    <View style={styles.authBlock}>
      <View style={styles.authBlockItem}>
        <TextInput style={styles.emailTextInput} placeholder="Электронный адрес" onChangeText={validate} />
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    phone: phoneRouter,
    email: emailRouter,
  });

  const [routes] = React.useState([
    { key: 'phone', title: 'ТЕЛЕФОН' },
    { key: 'email', title: 'ЭЛЕКТРОННЫЙ АДРЕС' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.logoBlock}>
        <Image
          style={styles.logo}
          source={require('./images/logo_auth.png')}>
        </Image>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => <TabBar {...props} style={styles.tabBar} />}
      />
      <View style={styles.existingAccount}>
        <Text style={styles.messageAccount}>Уже есть аккаунт? Войдите</Text>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoBlock: {
    padding: 20,
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 120,
  },
  authBlock: {
    flex: 3
  },
  authBlockItem: {
    padding: 20
  },
  message: {
    paddingTop: 20,
    textAlign: 'center',
    color: '#686868'
  },
  messageAccount: {
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    color: '#686868'
  },
  tabBar: {
    backgroundColor: '#2196f3',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    backgroundColor: '#2196f3',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    color: 'white',
  },
  existingAccount: {
    borderTopWidth: 1,
    borderTopColor: '#cfcfcf'
  },
  emailTextInput: {
    padding: 13,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#cfcfcf',
    fontSize: 16
  }
});
