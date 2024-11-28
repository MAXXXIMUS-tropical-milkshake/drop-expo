import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TrackForm from "@/components/TrackForm/TrackForm.tsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { SquircleView } from "react-native-figma-squircle";
import Carousel from "react-native-reanimated-carousel";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { interpolate } from "react-native-reanimated";
import { AudioRepository } from "@/repositories/AudioRepository";
import { useAudioPlayer } from "expo-audio";
import { Middleware } from "@/repositories/Middleware";
import { router } from "expo-router";
import { useSession } from "@/context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";

const sh = Dimensions.get("window").height * 0.5;
const aspectRatio = 2 / 3;
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
type Card = {
  index: number;
  id: string;
  name: string;
  artist: string;
};

function Item(
  it: number, 
  {id, name, artist}: {id: string; name: string; artist: string}, 
  isPaused: boolean, 
  setIsPaused: (isPaused: boolean) => void): React.JSX.Element {
  return (
      <Animated.View
          style={{
            display: "flex",
            flex: 1,
            alignSelf: "center",
            marginBottom: 0.05 * h,
            marginTop: 0.2 * h,
          }}
      >
        <SquircleView
            squircleParams={{
              cornerRadius: 60,
              cornerSmoothing: 1,
              fillColor: "#ff3d4d",
            }}
            style={{
              width: aspectRatio * sh,
              height: sh,
              alignSelf: "center",
              margin: 0,
              padding: 20,
            }}
          >
          <View>
            <Text style={styles.trackTitle}>{name || "Untitled"}</Text>
            <Text style={styles.artistName}>{artist || "Unknown Artist"}</Text>
          </View>

          <View style={styles.centerContent}>
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={() => setIsPaused(!isPaused)}
            >
              <Icon
                name={isPaused ? "play" : "pause"}
                size={27}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* <View>
            <TrackForm form={{ id: id }} setForm={() => {}}></TrackForm>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (isPaused) setIsPaused(false);
                  else setIsPaused(true);
                }}
            >
              <Text>{it.toString()}</Text>
            </TouchableOpacity>
          </View> */}

          <View style={styles.footer}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="paper-plane" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="download" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="share" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </SquircleView>
      </Animated.View>
  );
}


function Index(): React.JSX.Element {
  const [it, setIt] = useState<Card[]>([]);

  const ref = React.useRef<ICarouselInstance>(null);
  const animationStyle = React.useCallback((value: number) => {
    "worklet";
    const translateY = interpolate(value, [-1, 0, 1], [-sh * 1.1, 0, sh * 1.1]);
    const scale = interpolate(value, [-1, 0, 1], [0.93, 1.07, 0.93]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0.5, 1, 0.5]);
    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  }, []);


  const player = useAudioPlayer("");

  const {isLoading, accessToken, refreshToken, refresh} = useSession();

  const [trackID, setTrackID] = React.useState<string | null>(null);
  const [curIndex, setCurIndex] = React.useState<number | null>(null);

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    const preload = async () => {
      const card1 = await Middleware.withRefreshToken(
          {
            accessToken: accessToken,
            refresh: refresh,
            refreshToken: refreshToken,
          },
          AudioRepository.feed,
      );
      const card2 = await Middleware.withRefreshToken(
          {
            accessToken: accessToken,
            refresh: refresh,
            refreshToken: refreshToken,
          },
          AudioRepository.feed,
      );

      if (card1.success && card2.success) {
        setTrackID(card1.data.id);
        setIsPaused(false);
        setCurIndex(0);
        setIt([{index: 0, id: card1.data.id, name: card1.data.name, artist: card1.data.beatmaker.pseudonym},
          {index: 1, id: card2.data.id, name: card2.data.name, artist: card2.data.beatmaker.pseudonym}]);
        return;
      }

      setCurIndex(null);
      router.push("/(auth)/login");
    };

    preload().catch((e) => console.error(e));
  }, [isLoading]);

  useEffect(() => {
    const play = async () => {
      if (!trackID) return;
      player?.pause();
      const url = `http://${Platform.OS === 'web' ? 'localhost' : '10.0.2.2'}:8083/v1/audio/${trackID}/stream`;
      player?.replace({uri: url});
      player?.play();
      console.log("playing");
    };

    play().catch((e) => console.error(e));
  }, [curIndex, isLoading]);

  const [isPaused, setIsPaused] = React.useState(true);
  useEffect(() => {
    if (isPaused) player?.pause();
    else player?.play();
  }, [isPaused])

  const onSnapToItem = async (index: number) => {
    if (!accessToken || !refreshToken) {
      return;
    }

    setTrackID(it[index].id);
    setCurIndex(index);
    setIsPaused(false);
    if (index === it.length - 1) {
      const data = await Middleware.withRefreshToken(
          {
            accessToken: accessToken,
            refresh: refresh,
            refreshToken: refreshToken,
          },
          AudioRepository.feed,
      );
      if (data.success)
        setIt((prev) => [...prev, {index: it.length, id: data.data.id, name: data.data.name, artist: data.data.beatmaker.pseudonym}]);
      else if (data.data.status === 401) {
        setCurIndex(null);
        router.push("/(auth)/login");
      } else
        Alert.alert(data.data.message);
    }
  };

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView
            style={{
              display: "flex",
              flex: 1,
              height: "100%",
              flexDirection: "column",
            }}
            id={"carousel-component"}
        >
          <Carousel
              ref={ref}
              customAnimation={animationStyle}
              scrollAnimationDuration={500}
              width={w}
              height={h}
              data={[{index: 1 as number, id: "1"}]}
              style={{
                height: h,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                width: w,
              }}
              windowSize={2}
              snapEnabled={true}
              pagingEnabled={true}
              mode="parallax"
              overscrollEnabled={true}
              loop={false}
              modeConfig={{
                parallaxScrollingOffset: 50,
              }}
              vertical={true}
              onSnapToItem={onSnapToItem}
              renderItem={({ item }) => {
                return Item(item.index, {id: item.id, name: item.name, artist: item.artist}, isPaused, setIsPaused);
              }}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
  );
}

export default Index;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  artistName: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
    marginTop: 5,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  pauseButton: {
    width: "27%",
    height: "23%",
    borderRadius: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  iconButton: {
    backgroundColor: "#1a1a1a",
    width: "23%",
    height: "240%",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
