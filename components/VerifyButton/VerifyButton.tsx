import React, { useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import styles from "./VerifyButtonStyles.tsx";
import { AuthRepository } from "@/repositories/AuthRepository.tsx";
import { router } from "expo-router";
import { useUserContext } from "@/app/context/UserContext.tsx";

type VerifyProps = {
  code: string;
};

function VerifyButton({
  props,
  setIsValid,
  isValid,
}: {
  props: VerifyProps;
  setIsValid: any;
  isValid: boolean;
}): React.JSX.Element {
  const { user } = useUserContext();

  const onVerify = async () => {
    if (user == null) {
      console.log("user is null");
      return;
    }

    user.email.code = props.code;
    const data = await AuthRepository.signup(user);

    var isCodeValid = true;

    if (data.success) {
      router.push("/login");
    } else if (data.data.status === 400) {
      Alert.alert(data.data.message);
      router.back();
    } else if (data.data.status === 401) {
      console.log(data.data.status);
      isCodeValid = false;
    } else if (data.data.status === 409) {
      router.back();
    } else {
      Alert.alert(data.data.message);
    }

    if (isValid !== isCodeValid) {
      setIsValid(isCodeValid);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onVerify}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default VerifyButton;
