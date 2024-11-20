import React, {useState} from "react";
import {Dimensions, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import FiltersModal, {FiltersModalProps} from "@/components/FiltersModal.tsx";
import {Link, router} from "expo-router";


export default function HomeScreenHeader(modalProps: FiltersModalProps): React.JSX.Element {
    return (
        <View style={{
            height: Dimensions.get("window").height * 0.05,
            backgroundColor: 'red',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-evenly'
        }}>
            <TouchableOpacity style={styles.button} onPress={() => modalProps.setVisible(true)}>
                <Text style={styles.buttonText}>Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/(root)/upload")}>
                <Text style={styles.buttonText}>Upload beat</Text>
            </TouchableOpacity>
            <FiltersModal visible={modalProps.visible} setVisible={modalProps.setVisible}/>

        </View>);
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        backgroundColor: 'grey',
        flexDirection: 'column',
    },
    buttonText: {
        margin: 10,
        alignSelf: 'center',

    }
});