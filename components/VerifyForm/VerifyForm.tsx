import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import {styles} from './VerifyFormStyles.tsx'
import { useRef } from "react";

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
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    const newCodeArray = props.form.code.split("");
    newCodeArray[index] = text;
    const newCode = newCodeArray.join("");
    props.setForm({ code: newCode });

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !props.form.code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        {Array(6)
          .fill("")
          .map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={props.form.code[index] || ""}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
            />
          ))}
      </View>
    </View>
  );
}

export default VerifyForm;

