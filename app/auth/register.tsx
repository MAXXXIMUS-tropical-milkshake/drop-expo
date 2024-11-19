<<<<<<<< HEAD:app/auth/register.tsx
import React, {useState} from "react"
import {View, Image, Text, SafeAreaView, TouchableOpacity, Platform, StyleSheet} from "react-native"
import SignupForm from "@/components/SignupForm/SignupForm.tsx"
import SignupButton from "@/components/SignupButton/SignupButton.tsx"
import { useRouter } from "expo-router"

function SignupPage(): React.JSX.Element {
========
import React, {useState} from "react";
import {View, Image, Text, SafeAreaView, TouchableOpacity, Platform, StyleSheet} from "react-native";
import SignupForm from "@/components/SignupForm/SignupForm.tsx";
import SignupButton from "@/components/SignupButton/SignupButton.tsx";
import {PageProp} from "../../components/PageProps.tsx";
import {router} from "expo-router";


function Signup({navigation}: PageProp): React.JSX.Element {
>>>>>>>> petrukhin/routing:app/(auth)/signup.tsx
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        nickname: "",
        first_name: "",
        last_name: "",
    })
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/droplogo.png")}
                    style={styles.headerImage}
                    alt="Logo"
                />
                <Text style={styles.title}>
                    Sign up to <Text style={styles.titleDrop}>Drop</Text>
                </Text>
            </View>

            <View style={styles.form}>
                <SignupForm form={form} setForm={setForm}/>
                <SignupButton
                    username={form.username}
                    email={form.email}
                    password={form.password}
                    first_name={form.first_name}
                    last_name={form.last_name}
                    nickname={form.nickname}
                />
            </View>
            <TouchableOpacity
                style={styles.loginButton}
<<<<<<<< HEAD:app/auth/register.tsx
                onPress={() => router.push("/auth/login")}
========
                onPress={() => router.push("/login")}
>>>>>>>> petrukhin/routing:app/(auth)/signup.tsx
            >
                <Text style={styles.loginText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Signup;
const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: "#0a0a0a",
    },
<<<<<<<< HEAD:app/auth/register.tsx
========
    containerWeb: {
        padding: 24,
        flex: 1,
        backgroundColor: "#0a0a0a",
    },
>>>>>>>> petrukhin/routing:app/(auth)/signup.tsx
    header: {
        marginVertical: 15,
    },
    headerImage: {
        width: 50,
        height: 50,
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
    loginButton: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
    },
    loginText: {
        fontWeight: "400",
        fontSize: 15,
        color: "#fff",
    },
})

