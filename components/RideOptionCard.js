import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import {
  selectTravelTimeInfo,
  selectOrigin,
  selectDestination
} from "../slices/navSlice";
import { useSelector } from "react-redux";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: "Uber-LUX-123",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  }
];
const SEARCH_CHARGE_RATE = 14;

const RideOptionCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInfo);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  useEffect(() => {
    if (!origin || !destination) navigation.push("NavigateCard");
  }, [origin, destination]);

  const onChoose = () => {
    Alert.alert(
      "configurations!!!",
      `Car: ${selected.title} \nPrice: ${new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "INR"
      }).format(travelConst(selected))} \nDistence: ${
        travelTimeInformation?.distance?.text
      } \n${travelTimeInformation?.duration.text} Travel time`
    );
  };

  const travelConst = (item) => {
    return (
      (travelTimeInformation?.duration?.value *
        SEARCH_CHARGE_RATE *
        item?.multiplier) /
      100
    ).toFixed(2);
  };
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`items-center flex-row justify-center mb-3`}>
        <TouchableOpacity
          style={{ left: 10, position: "absolute", zIndex: 100 }}
          onPress={() => navigation.push("NavigateCard")}
        >
          <Icon
            type="antdesign"
            name="arrowleft"
            color="black"
            size={23}
            style={tw`p-3`}
          />
        </TouchableOpacity>
        <Text style={tw`text-center py-3 text-xl font-bold`}>
          Select a ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <View style={tw`flex-1`}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`flex-row items-center justify-between px-5 ${
                selected?.id === item.id && "bg-gray-100"
              }`}
              onPress={() => setSelected(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={tw`flex-row items-center justify-between flex-1`}>
                <View>
                  <Text style={tw`text-xl font-bold text-black`}>
                    {item.title}
                  </Text>
                  <Text style={tw`text-gray-600`}>
                    {travelTimeInformation?.duration?.text} Travel time
                  </Text>
                </View>
                <Text style={tw`text-gray-800 text-lg`}>
                  {new Intl.NumberFormat("en-us", {
                    style: "currency",
                    currency: "INR"
                  }).format(travelConst(item))}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 rounded-lg ${!selected && "bg-gray-300"}`}
          disabled={!selected}
          onPress={onChoose}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  }
});
