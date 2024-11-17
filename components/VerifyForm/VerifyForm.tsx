import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from './VerifyFormStyles.tsx'

type EmailVerifyFormProps = {
  form: {
    code: string
  }
  setForm: React.Dispatch<
    React.SetStateAction<{
      code: string
    }>
  >
}

function VerifyForm(props: EmailVerifyFormProps): React.JSX.Element {
  return (
    <View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Code</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputControl}
          value={props.form.code}
          onChangeText={(code: string) =>
            props.setForm({ ...props.form, code })
          }
        />
      </View>
    </View>
  )
}

export default VerifyForm;

