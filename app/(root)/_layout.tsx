import {Redirect, router, Slot, Stack, Tabs} from 'expo-router';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import HomeScreenHeader from '@/components/HomeScreenHeader.tsx';
import {HapticTab} from '@/components/HapticTab.tsx';
import {IconSymbol} from '@/components/ui/IconSymbol.tsx';
import TabBarBackground from '@/components/ui/TabBarBackground.tsx';
import {Colors} from '@/constants/Colors.ts';
import {useColorScheme} from '@/hooks/useColorScheme.ts';
import BeatUploadScreenHeader from "@/components/BeatUploadScreenHeader.tsx";
import HomeScreen from "@/screens_unused";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [filtersModalVisible, setFiltersModalVisible] = useState(false);
    if (false) {
        return <Redirect href="/signup"/>;
    }
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {display: 'none'}
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Feed',
                    header: () => HomeScreenHeader({
                        visible: filtersModalVisible,
                        setVisible: setFiltersModalVisible
                    }),
                }}
            />
            <Tabs.Screen name={"upload"}
                         getId={() => "Upload"}
                         options={{
                             header: () => BeatUploadScreenHeader()
                         }}
            />
        </Tabs>
    );
}