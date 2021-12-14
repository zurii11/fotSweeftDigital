import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';

export default function Home({ navigation }) {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getUsers = () => {
        setIsLoading(true);
        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${currentPage}/15`)
		.then(res => {
            setUsers([...users, ...res.data.list]);
            setIsLoading(false);
        });
    };

    const loadPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const renderItem = ({ item }) => {
        return (
            <View onStartShouldSetResponder={() => true} onResponderRelease={() => {
                    navigation.navigate("Profile", { id: item.id, visited: [] });
                    return true;
                }} style={styles.item}>
                <Image style={styles.image} source={{ uri: item.imageUrl }}/>
                <Text style={styles.textName}>{`${item.prefix} ${item.name} ${item.lastName}`}</Text>
                <Text style={styles.textDesc}>{item.title}</Text>
            </View>
        );
    };

    const renderLoader = () => {
        return (
            isLoading ?
            <View  style={styles.loader}>
                <ActivityIndicator size="large" color="#aaa" />
            </View> : null
        );
    };
    
    useEffect(() => {
        getUsers();
    }, [currentPage]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={styles.container.backgroundColor} />
            <FlatList 
                data={users}
                renderItem={renderItem}
                ListFooterComponent={renderLoader}
                onEndReached={loadPage}
                onEndReachedThreshold={0}
                style={{ width: '100%' }}
            />
        </SafeAreaView>
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
