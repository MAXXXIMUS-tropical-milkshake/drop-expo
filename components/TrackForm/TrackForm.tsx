import React from "react"
import { TextInput, View, Text } from "react-native"

type TrackFormProps = {
  form: {
    id: string
  }
  setForm: React.Dispatch<
    React.SetStateAction<{
      id: string
    }>
  >
}

function TrackForm(props: TrackFormProps): React.JSX.Element {
  return (
    <View>
      <View style={styles.input}>
        <Text>Id</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputControl}
          value={props.form.id}
          onChangeText={(id: string) => props.setForm({ ...props.form, id })}
        />
      </View>
    </View>
  )
}

import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#30303d",
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  inputLabel: {
    color: "#ccc",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 8,
  },
})


export default TrackForm
