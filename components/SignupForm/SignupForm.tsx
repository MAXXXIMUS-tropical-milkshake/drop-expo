import React from "react"
import styles from "./SignupFormStyles.tsx"
import { TextInput, View, Text } from "react-native"
import { useUserContext } from "@/app/context/UserContext.tsx"
import { ValidationDetails } from "@/repositories/Response.tsx"

type SignupFormProps = {
  form: {
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    pseudonym: string
  }
  setForm: React.Dispatch<
    React.SetStateAction<{
      username: string
      email: string
      password: string
      first_name: string
      last_name: string
      pseudonym: string
    }>
  >
}

function SignupForm(props: SignupFormProps): React.JSX.Element {
  const { validationDetails } = useUserContext();

  return (
    <View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="user123"
          placeholderTextColor="#6b7280"
          style={[styles.inputControl,
          (validationDetails !== null && validationDetails.violations.find((item) => item.subject === "username") !== undefined) ? {borderBottomColor: "red"} : null]}
          value={props.form.username}
          onChangeText={(username: string) =>
            props.setForm({ ...props.form, username })
          }
        />
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="qwerty@example.com"
          placeholderTextColor="#6b7280"
          style={[styles.inputControl,
          (validationDetails !== null && validationDetails.violations.find((item) => item.subject === "email") !== undefined) ? {borderBottomColor: "red"} : null]}
          value={props.form.email}
          onChangeText={(email: string) =>
            props.setForm({ ...props.form, email })
          }
        />
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>First name</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Maksim"
          placeholderTextColor="#6b7280"
          style={[styles.inputControl,
            (validationDetails !== null && validationDetails.violations.find((item) => item.subject === "first_name") !== undefined) ? {borderBottomColor: "red"} : null
          ]}
          value={props.form.first_name}
          onChangeText={(first_name: string) =>
            props.setForm({ ...props.form, first_name })
          }
        />
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Last name</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Ivanov"
          placeholderTextColor="#6b7280"
          style={[styles.inputControl, 
            (validationDetails !== null && validationDetails.violations.find((item) => item.subject === "last_name") !== undefined) ? {borderBottomColor: "red"} : null
          ]}
          value={props.form.last_name}
          onChangeText={(last_name: string) =>
            props.setForm({ ...props.form, last_name })
          }
        />
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Pseudonym</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Super_max228"
          placeholderTextColor="#6b7280"
          style={[styles.inputControl,
            (validationDetails !== null && validationDetails.violations.find((item) => item.subject === "pseudonym") !== undefined) ? {borderBottomColor: "red"} : null
          ]}
          value={props.form.pseudonym}
          onChangeText={(pseudonym: string) =>
            props.setForm({ ...props.form, pseudonym })
          }
        />
      </View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="*********"
          placeholderTextColor="#6b7280"
          style={[styles.inputControl, 
            (validationDetails !== null && validationDetails.violations.find((item) => item.subject === "password") !== undefined) ? {borderBottomColor: "red"} : null
          ]}
          value={props.form.password}
          onChangeText={(password: string) =>
            props.setForm({ ...props.form, password })
          }
        />
      </View>
    </View>
  )
}

export default SignupForm
