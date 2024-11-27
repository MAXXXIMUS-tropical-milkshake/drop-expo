import React, { useState } from "react";
// import styles from "./EmailVerifyPageStyles"
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import EmailVerifyForm from "@/components/VerifyForm/VerifyForm.tsx";
import EmailVerifyButton from "@/components/VerifyButton/VerifyButton.tsx";
import { PageProp } from "@/components/PageProps.tsx";
import { TouchableOpacity } from "react-native";
import { AuthRepository } from "@/repositories/AuthRepository";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

function Verify({ navigation }: { navigation: PageProp }): React.JSX.Element {
  const [form, setForm] = useState({
    code: "",
  });

  const { email } = useLocalSearchParams();

  const [isValid, setIsValid] = useState(true);

  const onSendEmail = async () => {
    const data = await AuthRepository.sendEmail({
      is_verified: false,
      email: email as string,
    });

    if (data.success) {
      console.log("email was sent successfully");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push("/(auth)/signup");
        }}
        style={styles.back}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={require("../../assets/droplogo.png")}
          style={styles.headerImage}
          alt="Logo"
        />
        <Text style={styles.title}>Email verify</Text>
      </View>

      {isValid ? null : <Text style={styles.errorText}>Invalid code</Text>}

      <View style={styles.form}>
        <EmailVerifyForm form={form} setForm={setForm} />
        <EmailVerifyButton
          props={{ code: form.code }}
          setIsValid={setIsValid}
          isValid={isValid}
        />
      </View>

      <TouchableOpacity style={styles.resendButton} onPress={onSendEmail}>
        <Text style={styles.resendText}>Send again</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Verify;

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    marginVertical: 36,
  },
  headerImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 36,
  },
  title: {
    fontSize: 33,
    fontWeight: "900",
    color: "#e8ecf4",
    marginBottom: 6,
    textAlign: "center",
  },
  titleDrop: {
    fontSize: 33,
    fontWeight: "900",
    color: "#8518d3",
    marginBottom: 6,
    textAlign: "center",
  },
  form: {
    flex: 1,
    marginBottom: 24,
    width: "100%",
    maxWidth: 500,
    margin: "auto",
  },
  resendText: {
    fontWeight: "400",
    fontSize: 15,
    color: "#fff",
  },
  resendButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
  },
  signUpButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
  },
  signUpText: {
    fontWeight: "400",
    fontSize: 15,
    color: "#fff",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 15,
  },
});
