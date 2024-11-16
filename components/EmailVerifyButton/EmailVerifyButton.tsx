import React from "react"
import { TouchableOpacity, View, Text, Alert } from "react-native"
import styles from "./EmailVerifyButtonStyles.tsx"

type VerifyProps = {
  code: string
}

function EmailVerifyButton(props: VerifyProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          const code = props.code;
          fetch("http://10.0.2.2:9431/v1/auth/email/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: code,
            }),
          })
            .then((response) => {
              if (response.status === 401) {
                Alert.alert("Wrong email or password")
                return null
              }
              if (response.status === 400) {
                Alert.alert("Wrong format of email or password")
                return null
              }
              if (response.status === 200) {
                return response.json()
              }
            })
            .then(async (data) => {
              if (data === null) {
                return null
              }
              Alert.alert("Верификация успешна.")
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
          <Text style={styles.buttonText}>Verify</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default EmailVerifyButton;
