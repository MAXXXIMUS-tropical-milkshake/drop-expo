
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
import { AudioRepository, FeedResponse } from "@/repositories/AudioRepository";
import { useAudioPlayer } from "expo-audio";
import { Middleware } from "@/repositories/Middleware";
import { router } from "expo-router";
import { Result } from "@/repositories/Response";
import { useSession } from "@/context/AuthContext";

const sh = Dimensions.get("window").height * 0.5;
const aspectRatio = 2 / 3;
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

function Item(it: number, {id}: {id: string}, isPaused: boolean, setIsPaused: (isPaused: boolean) => void): React.JSX.Element {
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
          fillColor: "#a23ba5",
        }}
        style={{
          width: aspectRatio * sh,
          height: sh,
          alignSelf: "center",
          margin: 0,
        }}
      >
        <View>
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
        </View>
      </SquircleView>
    </Animated.View>
  );
}

type Card = {
  index: number;
  id: string;
  name: string;
  artist: string;
};

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

  const [[isAccessTokenLoading, accessToken], setAccessToken] = useStorageState("accessToken");
  const [[isRefreshTokenLoading, refreshToken], setRefreshToken] = useStorageState("refreshToken");

  const [trackID, setTrackID] = React.useState<string | null>(null);
  const [curIndex, setCurIndex] = React.useState<number | null>(null);

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    const preload = async () => {
      const card1 = await Middleware.withRefreshToken(
        {
          accessToken: accessToken,
          setAccessToken: setAccessToken,
          refreshToken: refreshToken,
          setRefreshToken: setRefreshToken,
        },
        AudioRepository.feed,
      );
      const card2 = await Middleware.withRefreshToken(
        {
          accessToken: accessToken,
          setAccessToken: setAccessToken,
          refreshToken: refreshToken,
          setRefreshToken: setRefreshToken,
        },
        AudioRepository.feed,
      );

      if (card1.success && card2.success) {
        setTrackID(card1.data.id);
        setIsPaused(false);
        setCurIndex(0);
        setIt([{index: 0, id: card1.data.id, name: card1.data.name, artist: card1.data.beatmaker.pseudonym}, {index: 1, id: card2.data.id, name: card2.data.name, artist: card2.data.beatmaker.pseudonym}]);
        return;
      }

      setCurIndex(null);
      router.push("/(auth)/login");
    };

    preload().catch((e) => console.error(e));
  }, [isAccessTokenLoading, isRefreshTokenLoading]);

  useEffect(() => {
    const play = async () => {
      if (!trackID) return;
      player?.pause();
      player?.replace({uri: `http://localhost:8083/v1/audio/${trackID}/stream`});
      player?.play();
      console.log("playing");
    };

    play().catch((e) => console.error(e));
  }, [curIndex, isAccessTokenLoading, isRefreshTokenLoading]);

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
          data={it}
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
          overscrollEnabled={false}
          loop={false}
          modeConfig={{
            parallaxScrollingOffset: 50,
          }}
          vertical={true}
          onSnapToItem={onSnapToItem}
          renderItem={({ item }) => {
            return Item(item.index, {id: item.id}, isPaused, setIsPaused);
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
});
