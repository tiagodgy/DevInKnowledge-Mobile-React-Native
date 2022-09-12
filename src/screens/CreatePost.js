import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { API } from "../features/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CreatePost({ navigation }) {
  const [title, setTitle] = useState();
  const [language, setLanguage] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [description, setDescription] = useState();
  const [url, setUrl] = useState();

  function saveData() {
    if (title.length < 8 || title.length > 64) {
      alert("O título deve ter entre 8 e 64 caracteres");
    } else if (language.length < 4 || language.length > 16) {
      alert("A Linguagem/Skill deve ter entre 4 e 16 caracteres");
    } else if (description.length < 32 || description.length > 512) {
      alert("A descrição deve ter entre 32 e 512 caracteres");
    } else {
      fetch(API + "/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          language: language,
          category: selectedCategory,
          description: description,
          url: url,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(async () => {
          alert("Card cadastrado com sucesso!");
          navigation.navigate("PostsList");
        })
        .catch(() => alert("Houve ao erro tentar cadastrar o card"));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAwareScrollView style={styles.scroll}>
        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          placeholder="Título"
          onChangeText={setTitle}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Linguagem / Skill"
          onChangeText={setLanguage}
        ></TextInput>
        <Picker
          style={styles.select}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          <Picker.Item label="FrontEnd" value="FrontEnd" />
          <Picker.Item label="BackEnd" value="BackEnd" />
          <Picker.Item label="FullStack" value="FullStack" />
          <Picker.Item label="SoftSkill" value="SoftSkill" />
        </Picker>

        <TextInput
          style={[styles.input, { alignSelf: "center" }]}
          placeholder="Descrição"
          onChangeText={setDescription}
        ></TextInput>
        <TextInput
          style={[styles.input, { alignSelf: "center" }]}
          placeholder="URL"
          onChangeText={setUrl}
        ></TextInput>

        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text style={{ fontSize: 20, color: "#fff" }}>Salvar</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    fontSize: 20,
    alignSelf: "center",
  },
  select: {
    width: "90%",
    alignSelf: "center",
  },
  scroll: {
    width: "100%",
  },
  button: {
    marginTop: 20,
    borderWidth: 1,
    backgroundColor: "#233E54",
    width: "30%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
