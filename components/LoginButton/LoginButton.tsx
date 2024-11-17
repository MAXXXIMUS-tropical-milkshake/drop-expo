import React from "react"
import { TouchableOpacity, View, Text, Alert } from "react-native"
import styles from "./LoginButtonStyles.tsx"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthRepository } from "@/repositories/AuthRepository.tsx"

type LoginProps = {
  email: string
  password: string
}

function LoginButton(props: LoginProps): React.JSX.Element {

  const onLogin = async () => {
    const data = await AuthRepository.login(props);
          
    if (data.success) {
      Alert.alert("Success");
      await AsyncStorage.setItem("accessToken", data.data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.data.refreshToken);
    } else { Alert.alert(data.data.message)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogin}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default LoginButton
