import React, {useState} from "react"
import { TouchableOpacity, View, Text, Alert } from "react-native"
import styles from "./VerifyButtonStyles.tsx"
import { AuthRepository } from "@/repositories/AuthRepository.tsx"
import {router} from 'expo-router'
import { Result } from "@/repositories/Response.tsx"
import { SignupResponse } from "@/repositories/AuthRepository.tsx"
import { useUserContext } from "@/app/context/UserContext.tsx"

type VerifyProps = {
  code: string
}

function VerifyButton({props, setIsValid, isValid}: {props: VerifyProps, setIsValid: any, isValid: boolean}): React.JSX.Element {
  const { user, setValidationDetails } = useUserContext();

  const onVerify = async () => {
    if (user == null) {
      console.log("user is null");
      return;
    }

    user.email.code = props.code;
    const data = await AuthRepository.signup(user);

    var curIsValid = true;

    if (data.success) {
      router.push("/login");
    } else if (data.data.status === 400) {
      if (Array.isArray(data.data.details) && data.data.details.length > 0) {
        setValidationDetails(data.data.details[0]);
      }
      router.back();
    } else if (data.data.status === 401) {
      curIsValid = false;
    } else if (data.data.status === 409) {
      router.back();
    } else {
      Alert.alert(data.data.message);
    }

    if (isValid !== curIsValid) {
      setIsValid(isValid);
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
  )
}

export default VerifyButton;
