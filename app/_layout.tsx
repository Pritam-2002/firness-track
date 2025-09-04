import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from "../context/AppContext";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar barStyle={"dark-content"} />
        <Stack  screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
