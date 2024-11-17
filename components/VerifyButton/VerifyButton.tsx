import React from "react"
import { TouchableOpacity, View, Text, Alert } from "react-native"
import styles from "./VerifyButtonStyles.tsx"
import { AuthRepository } from "@/repositories/AuthRepository.tsx"

type VerifyProps = {
  code: string
}

function VerifyButton(props: VerifyProps): React.JSX.Element {
  const onVerify = async () => {
    const data = await AuthRepository.verify(props);

    if (data.success) {
      Alert.alert("Success");
    } else {
      Alert.alert(data.data.message);
    };
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
