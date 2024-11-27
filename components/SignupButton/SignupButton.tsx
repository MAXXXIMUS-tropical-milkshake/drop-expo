import React from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import styles from "./SignupButtonStyles.tsx";
import { AuthRepository } from "@/repositories/AuthRepository.tsx";
import { router } from "expo-router";
import { useUserContext } from "@/contexts/UserContext.tsx";

type SignupProps = {
  username: string;
  email: {
    email: string;
    code: string;
  };
  password: string;
  first_name: string;
  last_name: string;
  pseudonym: string;
};

function SignupButton(props: SignupProps): React.JSX.Element {
  const { setUser } = useUserContext();

  const onSignup = async () => {
    const data = await AuthRepository.sendEmail({
      email: props.email.email,
      is_verified: false,
    });

    if (data.success) {
      console.log(props);
      setUser(props);
      console.log;
      router.push({
        pathname: "/(auth)/verify",
        params: { email: props.email.email },
      });
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
  );
}

export default SignupButton;
