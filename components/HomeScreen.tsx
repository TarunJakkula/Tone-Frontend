import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  deleteRefreshToken,
  deleteToken,
  deleteUser,
  getRefreshToken,
  getToken,
  getUser,
  refreshToken,
} from "../util/secureStore";
import { logoutHandler } from "../util/auth";
import { printSecureScore } from "../util/viewSecureSore";
import { useEffect, useState } from "react";
import { fetchData } from "../util/dataFetch";
import { backgroundColor, primaryColor, textColor } from "../ui/colors";
import { StatusBar } from "expo-status-bar";
import Pill from "./_homeScreen/Pill";
import Note from "./_homeScreen/Note";
// import TodoList from "./_homeScreen/TodoList";

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
};

type NoteType = {
  Heading: string;
  SubHeading?: string;
  Body: string;
  color: string;
};

type TodoListType = {
  Heading: string;
  List: ListItemType[];
  color: string;
};

type ListItemType = {
  Title: string;
  Completed: boolean;
};

const isNoteType = (item: NoteType | TodoListType): item is NoteType => {
  return (item as NoteType).Body !== undefined;
};

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [notes, setNotes] = useState<(NoteType | TodoListType)[] | null>(null);
  const [user, setUser] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [category, setCategory] = useState<number>(1);

  const listOfCategory = ["All", "Notes", "TodoList"];

  const handleLogout = async () => {
    try {
      const token = await getRefreshToken();
      await deleteToken();
      await deleteRefreshToken();
      await deleteUser();
      await logoutHandler(token);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: "InitialScreen" }],
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const accessToken = await getToken();
        const data = await fetchData(accessToken);
        const userData = JSON.parse(await getUser());
        setUser(userData);
        setNotes(data);
      } catch (e) {
        try {
          await refreshToken();
          const accessToken = await getToken();
          const data = await fetchData(accessToken);
          const userData = JSON.parse(await getUser());
          setUser(userData);
          setNotes(data);
        } catch (e) {
          await handleLogout();
        }
      }
    };
    loadData();
  }, []);

  if (!notes)
    return (
      <SafeAreaView
        style={{
          padding: 30,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "WorkSans" }}>Loading...</Text>
      </SafeAreaView>
    );

  return (
    <>
      <SafeAreaView style={{ backgroundColor, flex: 1 }}>
        <View style={styles.headingDiv}>
          <View>
            <Text style={[styles.headingText]}>{user.firstName}'s Tones</Text>
          </View>

          <View style={styles.logoutButton}>
            <TouchableOpacity onPress={handleLogout}>
              <Image
                style={{
                  resizeMode: "contain",
                  width: 20,
                  height: 20,
                  transform: [{ rotateZ: "180deg" }],
                }}
                source={require("../assets/icons/logout_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.pillContainerDiv}>
          {listOfCategory.map((ele, index) => {
            return (
              <Pill
                key={index}
                text={ele}
                index={index + 1}
                focus={category === index + 1}
                setCategory={setCategory}
              />
            );
          })}
        </View>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {notes.map((ele, index) => {
            if (isNoteType(ele)) {
              return (
                <Note
                  key={index}
                  Heading={ele.Heading}
                  SubHeading={ele.SubHeading}
                  color={ele.color}
                />
              );
            }
            // else {
            //   return (
            //     <TodoList
            //       key={index}
            //       Heading={ele.Heading}
            //       List={ele.List}
            //     />
            //   );
            // }
          })}
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" translucent />
    </>
  );
}

const styles = StyleSheet.create({
  headingDiv: {
    padding: 20,
    paddingBottom: 10,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headingText: {
    fontFamily: "RaleWay",
    fontSize: 65,
    color: textColor,
    letterSpacing: 1,
    lineHeight: 80,
  },
  logoutButton: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: textColor,
    justifyContent: "center",
  },
  pillContainerDiv: {
    flexDirection: "row",
    gap: 10,
    padding: 20,
    alignItems: "center",
  },
});
