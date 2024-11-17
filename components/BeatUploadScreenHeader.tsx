import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";

export default function BeatUploadScreenHeader(): React.JSX.Element {
    return <View>
        <Link push href="/(tabs)/HomeScreen">
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </Link>
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