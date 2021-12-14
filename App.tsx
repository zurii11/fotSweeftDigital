import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home.tsx";
import Profile from "./components/Profile.tsx";

const Stack = createNativeStackNavigator();

export default function App() {
     return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    item: {
        width: '90%',
        height: 300,
        backgroundColor: "#ecebef",
        marginHorizontal: '5%',
        marginVertical: 20,
        borderColor: "#806fd1",
        borderWidth: 1.5,
        borderRadius: 7,
        overflow: "hidden",
    },

    image: {
        width: '100%',
        height: 200,
    },

    textName: {
        marginVertical: 10,
        marginHorizontal: 10,
        fontWeight: "bold",
        fontSize: 20,
    },

    textDesc: {
        marginHorizontal: 10,
        fontWeight: "normal",
        fontSize: 16,
    },

    loader: {
        marginVertical: 30,
        alignItems: "center",
    }
});
