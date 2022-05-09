import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { selectOrigin } from "../slices/navSlice";
import { useSelector } from "react-redux";
const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const data = [
    {
      id: 1,
      title: "Get a ride",
      image: "https://links.papareact.com/3pn",
      screen: "MapScreen"
    },
    {
      id: 2,
      title: "Order food",
      image: "https://links.papareact.com/28w",
      screen: "EatsScreen"
    }
  ];
  return (
    <FlatList
      data={data}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}
        >
          <View style={tw`${!origin && "opacity-30"}`}>
            <Image
              source={{ uri: item.image }}
              style={{ height: 120, width: 120, resizeMode: "contain" }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              name="arrowright"
              type="antdesign"
              color="white"
              style={[tw`p-2 bg-black rounded-full w-10 mt-4`]}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
