import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { API } from "../features/api";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

export default function PostsList({ navigation }) {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState([]);
  const isFocused = useIsFocused();

  function navigateToCreatePost() {
    navigation.navigate("CreatePost");
  }

  function navigateToVideo(video) {
    navigation.navigate("VideoScreen", { paramIndex: video });
  }

  function navigateToEditPost(id) {
    navigation.navigate("EditPost", { paramId: id });
  }

  function getCards() {
    fetch(API + "/posts")
      .then(async (response) => {
        const data = await response.json();
        setCards(data);
      })
      .catch(() => alert("Não foi possivel exibir os cards"));
  }

  function searchCards() {
    if (search != "") {
      fetch(API + "/posts?title=" + search)
        .then(async (response) => {
          const data = await response.json();
          setCards(data);
        })
        .catch(() => alert("Não foi possivel exibir os cards"));
    } else {
      getCards();
    }
  }

  function getCount() {
    fetch(API + "/posts").then(async (response) => {
      const data = await response.json();
      let frontEndCount = 0;
      let backEndCount = 0;
      let softSkillCount = 0;
      let fullStackCount = 0;
      data
        .forEach((res) => {
          switch (res.category) {
            case "FrontEnd":
              frontEndCount = frontEndCount + 1;
              break;
            case "BackEnd":
              backEndCount = backEndCount + 1;
              break;
            case "SoftSkill":
              softSkillCount = softSkillCount + 1;
              break;
            case "FullStack":
              fullStackCount = fullStackCount + 1;
              break;
          }
          setCount([
            data.length,
            frontEndCount,
            backEndCount,
            softSkillCount,
            fullStackCount,
          ]);
        })
        .catch(() => alert("Não foi possivel exibir as estatísticas"));
    });
  }

  useEffect(getCards, [isFocused]);
  useEffect(getCount, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>DevInKnowledge</Text>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Pesquise por um card..."
          style={styles.searchBox}
          onChangeText={setSearch}
        ></TextInput>
        <TouchableOpacity onPress={searchCards}>
          <Icon name="search" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCreatePost}>
          <Icon name="plus" size={30} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.statistics}>
          <Text style={styles.statisticsText}>Total: {count[0]}</Text>
          <Text style={styles.statisticsText}>FrontEnd: {count[1]}</Text>
          <Text style={styles.statisticsText}>BackEnd: {count[2]}</Text>
          <Text style={styles.statisticsText}>SoftSkill: {count[3]}</Text>
          <Text style={styles.statisticsText}>FullStack: {count[4]}</Text>
        </View>
        {cards.map((res) => (
          <View key={res.id} style={styles.card}>
            <Text style={styles.titulo}>{res.title}</Text>
            <Text style={styles.descricao}>{res.description}</Text>
            <View style={styles.cardBar}>
              <Text style={{ fontSize: 20 }}>{res.category}</Text>
              <View style={styles.cardOption}>
                {res.url != "" && (
                  <TouchableOpacity
                    onPress={() => {
                      navigateToVideo(res.url);
                    }}
                  >
                    <Icon name="camera" size={30} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    navigateToEditPost(res.id);
                  }}
                >
                  <Icon name="gear" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    marginVertical: 30,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    alignItems: "center",
    width: "90%",
    height: 200,
    padding: 5,
    marginVertical: 15,
    alignSelf: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  descricao: {
    fontSize: 15,
  },
  scroll: {
    width: "100%",
  },
  cardBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    padding: 20,
  },
  searchBar: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchBox: {
    borderWidth: 1,
    width: "80%",
  },
  statistics: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  statisticsText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  cardOption: {
    flexDirection: "row",
  },
});
