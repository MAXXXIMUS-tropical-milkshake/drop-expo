import React, {useState} from "react"
// import styles from "./EmailVerifyPageStyles"
import {View, SafeAreaView, Image, Text, StyleSheet} from "react-native"
import EmailVerifyForm from "@/components/EmailVerifyForm/EmailVerifyForm.tsx"
import EmailVerifyButton from "@/components/EmailVerifyButton/EmailVerifyButton.tsx"
import {PageProp} from "../../components/PageProps.tsx"

function EmailVerifyPage({navigation}: PageProp): React.JSX.Element {
    const [form, setForm] = useState({
        code: "",
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/droplogo.png")}
                    style={styles.headerImage}
                    alt="Logo"
                />
                <Text style={styles.title}>
                    Email verify
                </Text>
            </View>

            <View style={styles.form}>
                <EmailVerifyForm form={form} setForm={setForm}/>
                <EmailVerifyButton
                    code={form.code}
                />
            </View>
        </SafeAreaView>
    )
}

export default EmailVerifyPage;

const styles = StyleSheet.create({
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
})

