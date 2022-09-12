import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import PostsList from "./src/screens/PostsList";
import CreatePost from "./src/screens/CreatePost";
import VideoScreen from "./src/screens/VideoScreen";
import EditPost from "./src/screens/EditPost";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PostsList">
        <Stack.Screen
          name="PostsList"
          component={PostsList}
          options={{ headerShown: false, title: "Lista de cards" }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ title: "Adicione um card" }}
        />
        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{ title: "Video" }}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{ title: "Edite o card" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
