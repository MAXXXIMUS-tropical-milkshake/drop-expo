import React, { useState } from "react";
import { Dimensions, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import FiltersModal, { FiltersModalProps } from "@/components/FiltersModal.tsx";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { SquircleView } from "react-native-figma-squircle";

export default function HomeScreenHeader(modalProps: FiltersModalProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.headerContainer}>
      <SquircleView
        style={styles.squircleContainer}
        squircleParams={{
          cornerRadius: 60,
          cornerSmoothing: 1,
          fillColor: "#1a1a1a",
        }}
      >
        <TouchableOpacity onPress={() => modalProps.setVisible(true)} style={styles.touchable}>
          <Text style={styles.buttonText}>setting</Text>
        </TouchableOpacity>
      </SquircleView>

      <SquircleView
        style={[styles.squircleContainer, styles.searchContainer]}
        squircleParams={{
          cornerRadius: 60,
          cornerSmoothing: 1,
          fillColor: "#1a1a1a",
        }}
      >
        <View style={styles.searchContent}>
          <Icon name="search" size={15} color="white" />
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
        squircleParams={{
          cornerRadius: 60,
          cornerSmoothing: 1,
          fillColor: "#1a1a1a",
        }}
      >
        <TouchableOpacity onPress={() => router.push("/(root)/upload")} style={styles.touchable}>
          <Text style={styles.buttonText}>upload beat</Text>
        </TouchableOpacity>
      </SquircleView>

      <FiltersModal visible={modalProps.visible} setVisible={modalProps.setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: Dimensions.get("window").height * 0.07,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  squircleContainer: {
    width: "12%",
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
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  searchContainer: {
    width: "25%",
  },
  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 14,
    marginLeft: 10,
  },
});
