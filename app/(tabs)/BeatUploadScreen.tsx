import React from "react";
import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "@/components/LoginForm/LoginFormStyles.tsx";
import * as DocumentPicker from "expo-document-picker";

const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({type: 'audio/*', copyToCacheDirectory: true}).catch((e: any) => console.error(e));
    if (result)
        console.log(result.assets?.map((a) => a.name) ?? []);
};

export default function BeatUploadScreen(): React.JSX.Element {
    return (
        <View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Beat name</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder="qwerty@example.com"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    value={"beatochek"}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder="qwerty@example.com"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    value={"sochnij"}
                />
            </View>
            <TouchableOpacity
                style={{backgroundColor: '#7f7f7f'}}
                onPress={pickDocument}>
                <Text style={styles.inputLabel}>Dropni bitok, brazzer</Text>
            </TouchableOpacity>

        </View>
    );
}