import React, {useState} from "react";

import {
    Dimensions, StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import TrackForm from "@/components/TrackForm/TrackForm.tsx";
import {SafeAreaView} from "react-native-safe-area-context";
import {SquircleView} from 'react-native-figma-squircle';
import Carousel from "react-native-reanimated-carousel";
import {ICarouselInstance} from "react-native-reanimated-carousel";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {interpolate} from "react-native-reanimated";

const sh = Dimensions.get("window").height * 0.5;
const aspectRatio = 2 / 3;
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

function Item(it: number): React.JSX.Element {
    return (
        <Animated.View style={{
            display: 'flex', flex: 1, alignSelf: 'center', marginBottom: 0.05 * h, marginTop: 0.2 * h
        }}>
            <SquircleView
                squircleParams={{cornerRadius: 60, cornerSmoothing: 1, fillColor: "#a23ba5"}}
                style={{
                    width: aspectRatio * sh,
                    height: sh,
                    alignSelf: 'center',
                    margin: 0,
                }}>
                <View>
                    <TrackForm form={{id: ""}} setForm={() => {
                    }}></TrackForm>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log("handle play")}
                    >
                        <Text>{it.toString()}</Text>
                    </TouchableOpacity>
                </View>
            </SquircleView>
        </Animated.View>
    );
}

function HomeScreen(): React.JSX.Element {
    const it: number[] = [1, 2, 3, 4, 5];
    const ref = React.useRef<ICarouselInstance>(null);
    const animationStyle = React.useCallback(
        (value: number) => {
            "worklet";
            const translateY = interpolate(value, [-1, 0, 1], [-sh * 1.1, 0, sh * 1.1]);
            const scale = interpolate(value, [-1, 0, 1], [0.93, 1.07, 0.93])
            const opacity = interpolate(value, [-0.75, 0, 1], [0.5, 1, 0.5]);
            return {
                transform: [{translateY}, {scale}],
                opacity
            };
        },
        [],
    );
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaView style={{display: 'flex', flex: 1, height: "100%", flexDirection: 'column'}}
                          id={"carousel-component"}>
                <Carousel
                    ref={ref}
                    customAnimation={animationStyle}
                    scrollAnimationDuration={500}
                    width={w} height={h}
                    data={it}
                    style={{height: h, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: w}}
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
                    onSnapToItem={(index: number) => console.log("current index:", index)}
                    renderItem={({item}) => {
                        return Item(item);
                    }}/>
            </SafeAreaView>
        </GestureHandlerRootView>
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

