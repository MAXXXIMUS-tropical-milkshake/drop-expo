import { Redirect, Tabs } from "expo-router";
import React, { useState } from "react";
import HomeScreenHeader from "@/components/HomeScreenHeader.tsx";
import BeatUploadScreenHeader from "@/components/BeatUploadScreenHeader.tsx";
import { useSession } from "../context/AuthContext";

export default function RootLayout() {
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);

  const { isLoading, refreshToken } = useSession();

  if (isLoading) {
    return;
  }

  if (!refreshToken) {
    return <Redirect href="/signup" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          header: () =>
            HomeScreenHeader({
              visible: filtersModalVisible,
              setVisible: setFiltersModalVisible,
            }),
        }}
      />
      <Tabs.Screen
        name={"upload"}
        getId={() => "Upload"}
        options={{
          header: () => BeatUploadScreenHeader(),
        }}
      />
    </Tabs>
  );
}
