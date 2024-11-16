import React, { ComponentElement, useEffect, useRef, useState } from "react";

import { Platform, StyleSheet, Text, TouchableOpacity, View, } from "react-native"
import TrackForm from "@/components/TrackForm/TrackForm.tsx";
import { SafeAreaView } from "react-native-safe-area-context";
// @ts-ignore
import { Squircle } from 'corner-smoothing';

function FirstItem(it: number): React.JSX.Element {
  return (
    <View style={{ height: '100%', display: 'flex', flex: 1, marginHorizontal: 'auto' }}>
      <Squircle
        cornerRadius={50}
        style={{ backgroundColor: '#7c3aed', padding: '2vh', width: '20vh', height: '26vh', alignSelf: 'center', marginTop: '22.5vh', marginBottom: '8.5vh' }}>
        <View style={{ margin: 'auto', flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', alignSelf: 'center', alignContent: 'center', flexDirection: 'column' }}>
          <TrackForm form={{ id: "" }} setForm={() => { }}></TrackForm>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("handle play")}
          >
            <Text>Play</Text>
          </TouchableOpacity>
        </View>
      </Squircle>
    </View>);
}

function Item(it: number): React.JSX.Element {
  return (
    <View style={{ height: '100%', display: 'flex', flex: 1, marginHorizontal: 'auto' }}>
      <Squircle
        cornerRadius={50}
        style={{ backgroundColor: '#7c3aed', padding: '2vh', width: '20vh', height: '26vh', alignSelf: 'center', marginTop: '8.5vh', marginBottom: '8.5vh' }}>
        <View style={{ margin: 'auto', flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', alignSelf: 'center', alignContent: 'center', flexDirection: 'column' }}>
          <TrackForm form={{ id: "" }} setForm={() => { }}></TrackForm>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("handle play")}
          >
            <Text>Play</Text>
          </TouchableOpacity>
        </View>
      </Squircle>
    </View>);
}

function HomeScreen(): React.JSX.Element {
  const it: number[] = [1, 2, 3, 4];
  const elems = it.map((v) => v == 1 ? FirstItem(v) : Item(v));
  return (
    <SafeAreaView style={{ display: 'flex', flex: 1 }}>

    </SafeAreaView>
  );
}

export default HomeScreen
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

