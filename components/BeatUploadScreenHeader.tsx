import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link, router} from "expo-router";

export default function BeatUploadScreenHeader(): React.JSX.Element {
    return <View style={{height: 200}}>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

    </View>;
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