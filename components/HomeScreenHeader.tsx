import React, {useState} from "react";
import {Dimensions, Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import FiltersModal, {FiltersModalProps} from "@/components/FiltersModal.tsx";
import {router} from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import {SquircleView} from "react-native-figma-squircle";

export default function HomeScreenHeader(modalProps: FiltersModalProps): React.JSX.Element {
    const [searchQuery, setSearchQuery] = useState("");
    const squircleFormParams =
        {
            cornerRadius: 60,
            cornerSmoothing: 1,
            fillColor: "#1a1a1a",

        };
    return (
        <View style={styles.headerContainer}>
            <SquircleView
                style={styles.squircleContainer}
                squircleParams={squircleFormParams}
            >
                <TouchableOpacity onPress={() => modalProps.setVisible(true)} style={styles.touchable}>
                    <Text style={styles.buttonText}>setting</Text>
                </TouchableOpacity>
            </SquircleView>

            <SquircleView
                style={[styles.squircleContainer, styles.searchContainer]}
                squircleParams={squircleFormParams}
            >
                <View style={styles.searchForm}>
                    <Icon name="search" color="white" style={{
                        fontSize: 20,
                        padding: 0,
                        margin: 10,
                    }}/>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="search"
                        placeholderTextColor="#888"
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>
            </SquircleView>

            <SquircleView
                style={styles.squircleContainer}
                squircleParams={squircleFormParams}
            >
                <TouchableOpacity onPress={() => router.push("/(root)/upload")} style={styles.touchable}>
                    <Text style={styles.buttonText}>upload beat</Text>
                </TouchableOpacity>
            </SquircleView>

            <FiltersModal visible={modalProps.visible} setVisible={modalProps.setVisible}/>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: Dimensions.get("window").height * 0.07,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    squircleContainer: {
        width: "12%",
        margin: "1%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    touchable: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        textAlign: "center",
    },
    searchContainer: {
        width: "25%",
    },
    searchForm: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        alignSelf: "center",
        color: "white",
        fontWeight: "700",
        padding: 0,
        margin: 10,
        minWidth: 100,
    },
});
