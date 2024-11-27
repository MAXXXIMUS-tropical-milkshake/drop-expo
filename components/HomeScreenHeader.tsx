import React, { useState } from "react";
import {Dimensions, Text, TouchableOpacity, View, StyleSheet, TextInput} from "react-native";
import FiltersModal, {FiltersModalProps} from "@/components/FiltersModal.tsx";
import {router} from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";


export default function HomeScreenHeader(modalProps: FiltersModalProps): React.JSX.Element {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <View style={styles.headerContainer}>

            <TouchableOpacity style={styles.button} onPress={() => modalProps.setVisible(true)}>
                <Text style={styles.buttonText}>setting</Text>
            </TouchableOpacity>

            <View style={styles.searchButton}>
                <Icon name="search" size={13} color='white' style={styles.icon}/>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="search"
                    placeholderTextColor='#888'
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/(root)/upload")}>
                <Text style={styles.buttonText}>upload beat</Text>
            </TouchableOpacity>

            <FiltersModal visible={modalProps.visible} setVisible={modalProps.setVisible}/>

        </View>);
}

const styles = StyleSheet.create({
    headerContainer: {
        height: Dimensions.get("window").height * 0.07,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },
    button: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#1a1a1a",
        borderRadius: 50,
        alignItems: "center",
        paddingHorizontal: 0,
        // width: 160,
    },
    buttonText: {
        margin: 18,
        alignSelf: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
    searchButton: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#1a1a1a",
        borderRadius: 50,
        alignItems: "center",
        // paddingHorizontal: 0,
        width: 100,
        overflow: "hidden", 
        paddingHorizontal: 10,
        maxWidth: 250,
    },
    searchInput: {
        flex: 1,
        margin: 18,
        alignSelf: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 7,
    },
    icon: {
        width: 20,
        textAlign: "center",
    },
});