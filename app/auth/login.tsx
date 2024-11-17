import React, {useState} from "react"
import {View, SafeAreaView, Image, Text, TouchableOpacity, StyleSheet} from "react-native"
import LoginForm from "@/components/LoginForm/LoginForm.tsx"
import LoginButton from "@/components/LoginButton/LoginButton.tsx"
import { useRouter } from "expo-router"

function LoginPage(): React.JSX.Element {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
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
                    Sign in to <Text style={styles.titleDrop}>Drop</Text>
                </Text>
            </View>

            <View style={styles.form}>
                <LoginForm form={form} setForm={setForm}/>
                <LoginButton
                    email={form.email}
                    password={form.password}
                />
            </View>
            <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => router.push('/auth/register')}
            >
                <Text style={styles.signUpText}>Don`t have an account? Sign up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default LoginPage

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
