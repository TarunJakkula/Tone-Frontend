import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  accentColor,
  primaryColor,
  secondaryColor,
  textColor,
} from "../../ui/colors";

export default function Pill({
  text,
  index,
  focus,
  setCategory,
}: {
  text: string;
  index: number;
  focus: boolean;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setCategory(index);
      }}
    >
      <View
        style={[
          styles.pillContainer,
          {
            backgroundColor: "transparent",
            borderWidth: 2,
            opacity: focus ? 1 : 0.2,
            borderColor: focus ? primaryColor : textColor,
          },
        ]}
      >
        <Text style={styles.pillText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pillContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  pillText: {
    fontSize: 15,
    fontFamily: "WorkSans",
    color: textColor,
  },
});
