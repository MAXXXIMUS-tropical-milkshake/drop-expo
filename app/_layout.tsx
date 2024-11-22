import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import {Slot} from "expo-router";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useColorScheme} from "@/hooks/useColorScheme.ts";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import {SessionProvider} from '@/contexts/AuthContext';
import {UserProvider} from '@/contexts/UserContext';
import {enableExperimentalWebImplementation} from "react-native-gesture-handler";

enableExperimentalWebImplementation(true);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <UserProvider><SessionProvider>
                <Slot/>
            </SessionProvider></UserProvider>
        </ThemeProvider>
    );
}
