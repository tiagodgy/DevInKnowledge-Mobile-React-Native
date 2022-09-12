import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { API } from "../features/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditPost({ navigation, route }) {
  const id = route.params.paramId;
  const [card, setCard] = useState([]);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [description, setDescription] = useState();
  const [url, setUrl] = useState();

  function getCard() {
    fetch(API + "/posts/" + id)
      .then(async (response) => {
        const data = await response.json();
        setCard(data);
        setTitle(data.title);
        setLanguage(data.language);
        setSelectedCategory(data.category);
        setDescription(data.description);
        setUrl(data.url);
      })
      .catch(() => alert("Não foi possivel exibir os cards"));
  }

  function updateData() {
    if (title.length < 8 || title.length > 64) {
      alert("O título deve ter entre 8 e 64 caracteres");
    } else if (language.length < 4 || language.length > 16) {
      alert("A Linguagem/Skill deve ter entre 4 e 16 caracteres");
    } else if (description.length < 32 || description.length > 512) {
      alert("A descrição deve ter entre 32 e 512 caracteres");
    } else {
      fetch(API + "/posts/" + id, {
        method: "PATCH",
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
          alert("Card atualizado com sucesso!");
          navigation.navigate("PostsList");
        })
        .catch(() => alert("Houve ao erro tentar atualizar o card"));
    }
  }

  function deleteData() {
    fetch(API + "/posts/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async () => {
        alert("Card deletado com sucesso!");
        navigation.navigate("PostsList");
      })
      .catch(() => alert("Houve ao erro tentar deletar o card"));
  }

  useEffect(getCard, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAwareScrollView style={styles.scroll}>
        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          value={title}
          onChangeText={setTitle}
        ></TextInput>
        <TextInput
          style={styles.input}
          value={language}
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
          value={description}
          onChangeText={setDescription}
        ></TextInput>
        <TextInput
          style={[styles.input, { alignSelf: "center" }]}
          value={url}
          placeholder={"URL"}
          onChangeText={setUrl}
        ></TextInput>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity style={styles.button} onPress={updateData}>
            <Text style={{ fontSize: 20, color: "#fff" }}>Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red", marginLeft: 20 }]}
            onPress={deleteData}
          >
            <Text style={{ fontSize: 20, color: "#fff" }}>Deletar</Text>
          </TouchableOpacity>
        </View>
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
