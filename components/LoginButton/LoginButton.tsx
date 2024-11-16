import React from "react"
import { TouchableOpacity, View, Text, Alert } from "react-native"
import styles from "./LoginButtonStyles.tsx"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationProp, ParamListBase } from "@react-navigation/native"

type LoginProps = {
  email: string
  password: string
  navigation: NavigationProp<ParamListBase>
}

function LoginButton(props: LoginProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          const email = props.email
          const password = props.password
          fetch("http://10.0.2.2:9431/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then((response) => {
              if (response.status === 401) {
                Alert.alert("Wrong email or password")
                return null;
              }
              if (response.status === 400) {
                Alert.alert("Wrong format of email or password")
                return null;
              }
              if (response.status === 200) {
                return response.json();
              }
            })
            .then(async (data) => {
              if (data === null) {
                return null;
              }
              Alert.alert("Авторизация успешна.");
              await AsyncStorage.setItem("accessToken", data.accessToken);
              await AsyncStorage.setItem("refreshToken", data.refreshToken);
              console.log(data.accessToken);
            })
            .catch((error) => {
              console.error(
                "There was a problem with the fetch operation:",
                error
              )
            })
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default LoginButton
