import {Stack, Tabs} from "expo-router";
import React, {useState} from "react";

export default function ProtectedLayout() {
    const [filtersModalVisible, setFiltersModalVisible] = useState(false);
    return (
        <Stack>
            <Stack.Screen name={"/login"}/>
            <Stack.Screen name={"/signup"}/>
            <Stack.Screen name={"/verify"}/>
        </Stack>
    );
}
