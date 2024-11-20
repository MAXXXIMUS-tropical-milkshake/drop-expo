import TrackPlayer, { Track } from "react-native-track-player"
import React from "react"
import {View, SafeAreaView, Text, TouchableOpacity, StyleSheet} from "react-native"
import { Platform } from "react-native"
import { useState } from "react"
import TrackForm from "@/components/TrackForm/TrackForm.tsx"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ShareButton from "@/components/ShareButton/ShareButton.tsx"

const apiUrl: string =
  Platform.OS == "web"
    ? "http://0.0.0.0:9321/v1/"
    : "http://10.0.2.2:9321/v1/"

function AudioTestPage(): React.JSX.Element {
  const [playing, setPlaying] = useState(false);
  const [form, setForm] = useState({
    id: "",
  });
  const addTrack = async (id: string = "-1") => {
    let accessToken : string = await AsyncStorage.getItem('accessToken') as string;
    if (id == "-1") {
      let req = await fetch(apiUrl + "feed/audio", {
      headers: {
        'Authorization' : accessToken
      }});
      if (req.status === 401) {
        const refreshToken = await AsyncStorage.getItem('refreshToken') as string;
        console.log(refreshToken)
        fetch("http://10.0.2.2:9431/v1/auth/token/refresh", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken : refreshToken })
        }).then((response) => {
          console.log(response.status)
          if (response.status === 200) {
            return response.json();
          }
        }).then((data) => {
          console.log(data);
          accessToken = data.accessToken;
          AsyncStorage.setItem("accessToken", data.accessToken);
          AsyncStorage.setItem("refreshToken", data.refreshToken);
        });
      }
      console.log(accessToken);
      req = await fetch(apiUrl + "feed/audio", {headers: {
        'Authorization' : accessToken
      }});
      id = (await req.json()).id;
    }
    const url : string = apiUrl + "audio/" + id + "/stream";
    const track: Track = {
      url: url
    }
    console.log(url);
    console.log(id);
    console.log(await AsyncStorage.getItem('accessToken'));
    await TrackPlayer.add(track);
  }
  const handlePlay = async () => {
    if (playing) {
      TrackPlayer.pause();
      setPlaying(false);
      return;
    }
    await TrackPlayer.play();
    setPlaying(true);
  }
  const skipTrack = async () => {
    await TrackPlayer.skipToNext();
  }
  return (
    <SafeAreaView style={styles.container}>
      <TrackForm form={form} setForm={setForm} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePlay()}
          >
            <Text>{!playing ? "Play" : "Pause"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addTrack(form.id)}
          >
            <Text>Set track</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => skipTrack()}
          >
            <Text>Skip to next track</Text>
          </TouchableOpacity>
          <ShareButton/>
        </View>
    </SafeAreaView>
  )
}

export default AudioTestPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  }
})

