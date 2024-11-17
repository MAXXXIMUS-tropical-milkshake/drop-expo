import {Tabs} from 'expo-router';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import HomeScreenHeader from '@/components/HomeScreenHeader.tsx';
import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import BeatUploadScreenHeader from "@/components/BeatUploadScreenHeader.tsx";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const [filtersModalVisible, setFiltersModalVisible] = useState(false);
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="HomeScreen"
                options={{
                    title: 'Feed',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="paperplane.fill" color={color}/>,
                    headerShown: true,
                    header: () => HomeScreenHeader({visible: filtersModalVisible, setVisible: setFiltersModalVisible}),
                }}
            />
            <Tabs.Screen
                name="BeatUploadScreen"
                options={{
                    title: 'Upload',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="doc.fill.badge.ellipsis" color={color}/>,
                    headerShown: true,
                    header: () => BeatUploadScreenHeader()
                }}
            />

        </Tabs>
    );
}
