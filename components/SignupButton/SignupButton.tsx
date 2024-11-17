import React from "react"
import { TouchableOpacity, View, Text, Alert } from "react-native"
import styles from "./SignupButtonStyles.tsx"
import { AuthRepository } from "@/repositories/AuthRepository.tsx"

type SignupProps = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  nickname: string
  navigation: any
}

function SignupButton(props: SignupProps): React.JSX.Element {
  const onSignup = async () => {
    const data = await AuthRepository.signup(props);

    if (data.success) {
      Alert.alert("Success");
    } else {
      Alert.alert(data.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSignup}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SignupButton
