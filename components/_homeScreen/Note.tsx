import { Image, StyleSheet, Text, View } from "react-native";

type NoteType = {
  Heading: string;
  SubHeading: string;
  color: string;
};

export default function Note({ Heading, SubHeading, color }: NoteType) {
  return (
    <View
      style={[
        styles.notesContainer,
        {
          borderLeftWidth: 4,

          borderLeftColor: color,
          backgroundColor: "#212121",
          borderRadius: 20,
        },
      ]}
    >
      <View style={{ gap: 10 }}>
        <Text style={styles.notesSubHeading}>{SubHeading}</Text>
        <Text style={styles.notesHeading}>{Heading}</Text>
      </View>
      <View>
        <Image
          style={{ height: 40, width: 40, objectFit: "contain" }}
          source={require("../../assets/icons/bookmark_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notesContainer: {
    padding: 20,
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  notesHeading: {
    fontFamily: "RaleWayBold",
    fontSize: 25,
    color: "white",
  },
  notesSubHeading: {
    fontFamily: "RaleWayBold",
    fontSize: 14,
    color: "white",
  },
});
