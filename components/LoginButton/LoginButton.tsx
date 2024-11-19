import React from "react"
import { TouchableOpacity, View, Text, Alert } from "react-native"
import styles from "./LoginButtonStyles.tsx"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthRepository } from "@/repositories/AuthRepository.tsx"
import { useSession } from "@/app/ctx.tsx"

type LoginProps = {
  email: string
  password: string
}

function LoginButton(props: LoginProps): React.JSX.Element {
  const { signIn } = useSession();

  const onLogin = async () => {
    const data = await signIn(props);
          
    if (data) {
      Alert.alert("Success");
    } else { Alert.alert("Not success =(");
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
