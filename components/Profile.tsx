import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View, StyleSheet, Text, Image } from "react-native";
import axios from "axios";

export default function Profile({ navigation, route }) {
    const [user, setUser] = useState({});
    const [company, setCompany] = useState({});
    const [address, setAddress] = useState({});
    const [friends, setFriends] = useState([]);
    const [visited, setVisited] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
   
    const getUser = () => {
       axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${route.params.id}`)
       .then(res => {
           setUser(res.data);
           setCompany(res.data.company);
           setAddress(res.data.address);
           setVisited([...route.params.visited, res.data]);
           getFriends(res.data.id);
        })
    };

    const getFriends = (id: number) => {
        setIsLoading(true);
        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${currentPage}/15`)
		.then(res => {
            setFriends([...friends, ...res.data.list]);
            setIsLoading(false);
        });
    };

    const loadPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const renderItem = ({ item }) => {
        return (
            <View onStartShouldSetResponder={() => true} onResponderRelease={() => {
                    navigation.push("Profile", { id: item.id, visited: visited });
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

    const VisitedList = () => {
        return (
            <View>
                <Text style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    {visited.map((person, index) => <Text style={styles.textLink} key={index} onPress={() => {
                        navigation.push("Profile", { id: person.id, visited: visited})
                    }}>
                    {`${person.prefix} ${person.name} ${person.lastName} ${index < visited.length-1 ? "> " : ""}`}</Text>)}
                </Text>
            </View>
        );
    };

    const listHeader = () => {
        return (
        <View>
            <Image style={styles.image} source={{ uri: user.imageUrl }} />
            <Text style={styles.textName}>{`${user.prefix} ${user.name} ${user.lastName}`}</Text>
            <Text style={styles.textDesc}>{user.title}</Text>
            <VisitedList />
            <View>
                <View style={styles.info}>
                    <Text style={styles.textDesc}>Info</Text>
                </View>
                <Text style={styles.textDesc}>Email: {user.email}</Text>
                <Text style={styles.textDesc}>Ip: {user.ip}</Text>
                <Text style={styles.textDesc}>Job Area: {user.jobArea}</Text>
                <Text style={styles.textDesc}>Job Type: {user.jobType}</Text>
                <Text style={styles.textDesc}>Job Descriptor: {user.jobDescriptor}</Text>
                <View style={styles.info}>
                    <Text style={styles.textDesc}>Address</Text>
                </View>
                <Text style={styles.textDesc}>{`Company: ${company.name} ${company.suffix}`}</Text>
                <Text style={styles.textDesc}>Street: {address.streetAddress}</Text>
                <Text style={styles.textDesc}>City: {address.city}</Text>
                <Text style={styles.textDesc}>State: {address.state}</Text>
                <Text style={styles.textDesc}>Country: {address.country}</Text>
                <Text style={styles.textDesc}>ZIP: {address.zipCode}</Text>
            </View>
        </View>
        );
    };
    
    useEffect(() => {
        if (currentPage > 1) {
			 getFriends(user.id);
		}
    }, [currentPage]);

    useEffect(() => {
        getUser();
    }, [])


    return (
        <SafeAreaView>
            <FlatList 
                data={friends}
                renderItem={renderItem}
                ListHeaderComponent={listHeader}
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

    textLink: {
        marginVertical: 10,
        marginHorizontal: 10,
        fontWeight: "normal",
        fontSize: 16,
        textDecorationLine: "underline",
        color: "blue",
    },

    loader: {
        marginVertical: 30,
        alignItems: "center",
    },

    info: {
        width: '95%',
        marginHorizontal: '2.5%',
        marginTop: 25,
        marginBottom: 5,
        borderBottomColor: "#806fd1",
        borderBottomWidth: 1.5
    },
});
