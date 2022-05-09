import { TouchableOpacity, View } from "react-native";
import React, { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAP_KEY } from "@env";
import { Icon } from "react-native-elements";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAP_KEY}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          dispatch(setTravelTimeInfo(data?.rows[0].elements[0]));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAP_KEY]);

  return (
    <View style={tw`flex-1 relative`}>
      <TouchableOpacity
        style={[
          tw`bg-gray-100 absolute top-16 left-8 z-50  p-3 rounded-full shadow-lg`
        ]}
        onPress={() => navigation.push("Home")}
      >
        <Icon type="antdesign" name="home" color="black" size={16} />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        style={tw`flex-1 relative z-10`}
        initialRegion={{
          latitude: origin?.loaction.lat,
          longitude: origin?.loaction.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        mapType="mutedStandard"
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            lineDashPattern={[0]}
            apikey={GOOGLE_MAP_KEY}
            strokeWidth={3}
            strokeColor="black"
            onError={(error) => console.log("Directions error: ", error)}
          />
        )}
        {origin?.loaction && (
          <Marker
            coordinate={{
              latitude: origin?.loaction.lat,
              longitude: origin?.loaction.lng
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}
        {destination?.loaction && (
          <Marker
            coordinate={{
              latitude: destination?.loaction.lat,
              longitude: destination?.loaction.lng
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
