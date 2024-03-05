import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import AdminDashboard from "./AdminDashboard";
import TopMostCard from "../Components/TopMostCard";
import OngoingUpcomingButton from "../Components/OngoingUpcomingButtons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Leaderboard from "./LeaderBoard";
import Events from "./Events";
import LoginScreen from "./LoginPage";
import Header from "../Components/Header";
import { getHeaderTitle } from "@react-navigation/elements";
import AdminOngoingScreen from "./AdminOngoingScreen";
import LiveEvents from "./LiveEvents";
import AddLiveEvents from "./AddLiveEvents";
import UpdateLiveEvents from "./UpdateLiveEvents";
import SpecificEvents from "./SpecificEvents";
import Homepage from './Homepage'
import TeamPoints from "./TeamPoints";

const Tab = createBottomTabNavigator();
const EventsStack = createStackNavigator();
const LeaderboardStack = createStackNavigator();
const AdminDashboardStack = createStackNavigator();

// Create a stack navigator for each tab to include the Header
function EventsStackNavigator() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventsStack"
        component={Events}
        options={({ route }) => ({
          
          headerTitle: () => <Header events={true} />,
          headerStyle: { backgroundColor: "#111319", height: 100 },
          field: route.params?.field || "Sports",
        })}
      />
      <EventsStack.Screen
        name="SpecificEvent"
        component={SpecificEvents}
        options={({ route }) => ({
          headerTitle: () => <Header />,
          headerStyle: { backgroundColor: "#111319", height:120 },
          headerTintColor: "white",
          data: route.params.data,
        })}
      />
    </EventsStack.Navigator>
  );
}

function LeaderboardStackNavigator() {
  return (
    <LeaderboardStack.Navigator>
      <LeaderboardStack.Screen
        name="LeaderboardStack"
        component={Leaderboard}
        options={{
          headerShown: false,
          // headerTitle: (props) => <Header />,
          headerStyle: { backgroundColor: "#111319", height: 100 },
        }}
      />
    </LeaderboardStack.Navigator>
  );
}

function AdminDashboardStackNavigator() {
  return (
    <AdminDashboardStack.Navigator>
      <AdminDashboardStack.Screen
        name="AdminDashboardStack"
        component={AdminDashboard}
        options={{
          headerShown: false,
          // headerTitle: () => <Header />,
          // headerStyle: { backgroundColor: "#111319", height: 100 },
        }}
      />
      <AdminDashboardStack.Screen
        name="AdminAddScoreStack"
        component={AdminOngoingScreen}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white",
          // headerLeft: null,
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="LiveEvents"
        component={LiveEvents}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="AddLiveEvent"
        component={LiveEvents}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="AddingLiveEvent"
        component={AddLiveEvents}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="UpdatingLiveEvent"
        component={UpdateLiveEvents}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
    </AdminDashboardStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          justifyContent: "space-between",
          alignItems: "center",
          height: 49, // Adjust height as needed
          paddingBottom: 10, // Adjust padding to ensure icons and text are aligned and not touching the screen's bottom edge
          paddingTop: 10,
          paddingHorizontal: 20, // Adds horizontal padding
          position: "absolute", // This along with the following lines create the hovering effect
          bottom: 40, // Distance from the bottom of the screen
          left: 20,
          right: 20,
          borderRadius: 25, // Rounds the corners of the tabBar
          shadowColor: "#000", // Shadow color for iOS
          shadowOffset: { width: 0, height: 10 }, // Shadow position for iOS
          shadowOpacity: 0.3, // Shadow opacity for iOS
          shadowRadius: 5, // Shadow blur radius for iOS
        },
        tabBarItemStyle: {
          alignContent: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "trophy" : "trophy-outline";
          }
          return (
            <Icon
              name={iconName}
              type="material-community"
              size={18}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: "#D41D77",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
    </Tab.Navigator>
  );
}
export default function AllTabs() {
  const [events, setEvents] = useState([]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          justifyContent: "space-between",
          alignItems: "center",
          height: 51, // Adjust height as needed
          paddingBottom: 10, // Adjust padding to ensure icons and text are aligned and not touching the screen's bottom edge
          paddingTop: 10,
          paddingHorizontal: 20, // Adds horizontal padding
          position: "absolute", // This along with the following lines create the hovering effect
          bottom: 40, // Distance from the bottom of the screen
          left: 20,
          right: 20,
          borderRadius: 25, // Rounds the corners of the tabBar
          shadowColor: "#000", // Shadow color for iOS
          shadowOffset: { width: 0, height: 10 }, // Shadow position for iOS
          shadowOpacity: 0.3, // Shadow opacity for iOS
          shadowRadius: 5, // Shadow blur radius for iOS
        },
        tabBarItemStyle: {
          alignContent: "center",
          justifyContent: "center",
          width: "100%",
          height: 30,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "AdminDashboard") {
            iconName = focused ? "cog" : "cog-outline";
            // Using React Native Elements for Icons
          } else if (route.name === 'Your Team') {
            iconName = focused ? "account-group" : "account-group-outline";
          }
          else if (route.name === 'Homepage') {
            iconName = focused ? "home" : "home-outline";
          }
          return (
            <Icon
              name={iconName}
              type="material-community"
              size={20}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#D41D77",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Events" component={EventsStackNavigator} />
      <Tab.Screen name="Leaderboard" component={LeaderboardStackNavigator} />
      <Tab.Screen name="Homepage" component={Homepage} />
      <Tab.Screen
        name="AdminDashboard"
        component={AdminDashboardStackNavigator}
      />
      <Tab.Screen name="Your Team" component={TeamPoints} />

    </Tab.Navigator>
  );
}
