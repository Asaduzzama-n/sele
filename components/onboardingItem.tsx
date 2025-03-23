import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";

const OnboardingItem = ({
  item,
}: {
  item: { image: string; text: string; description: string };
}) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof item.image === "string" ? { uri: item.image } : item.image}
          style={[styles.image, { width: width * 0.9, height: height * 0.55 }]}
        />
        <Image
          style={[styles.backgroundImage, { width, height: height * 0.65 }]} // Extended height
          source={require("../assets/images/bg.png")}
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.text}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  imageContainer: {
    flex: 0.6, // 60% of the screen height
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  textContainer: {
    flex: 0.3, // 30% of the screen height
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: '#FFFF',
    zIndex: -10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});