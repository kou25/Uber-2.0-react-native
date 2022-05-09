import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import NavFavourites from "./NavFavorites";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl font-bold`}>
        Good Morning Koustav
      </Text>
      <View
        style={tw`border-t border-gray-100 flex-shrink relative z-20 bg-white`}
      >
        <View style={tw`bg-white pb-2`}>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  loaction: details.geometry.location,
                  description: data.description
                })
              );
            }}
            minLength={2}
            fetchDetails={true}
            returnKeyType={"search"}
            onFail={(error) => console.error(error)}
            query={{
              key: GOOGLE_MAP_KEY,
              language: "en"
            }}
            styles={toInputBoxStyles}
            enablePoweredByContainer={false}
          />
        </View>
      </View>
      <View style={tw`px-3 bg-white relative z-10 justify-between flex-1`}>
        <NavFavourites />

        <View
          style={tw`mt-3 flex-row justify-evenly py-3 border-t border-gray-100`}
        >
          <TouchableOpacity
            style={tw`flex-row bg-black w-24 px-4 py-3 rounded-full border border-black`}
            onPress={() => navigation.push("RideOptionsCard")}
            disabled={!destination}
          >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center pl-3`}>Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row bg-white w-24 px-4 py-3 rounded-full border border-black`}
          >
            <Icon
              name="fast-food-outline"
              type="ionicon"
              color="black"
              size={16}
            />
            <Text style={tw`text-black text-center pl-3`}>Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  textInput: {
    fontSize: 15,
    backgroundColor: "#F4F4F4",
    borderRadius: 5,
    borderEndWidth: 1,
    borderColor: "#ddd"
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }
});

export default NavigateCard;
