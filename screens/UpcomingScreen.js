import TopMostCard from "../Components/TopMostCard";
import OngoingEventCard from "../Components/OngoingEventCard";
import AdminOngoingEventCard from "../Components/adminOngoingEventCard";
import { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import axios from "axios";
import UpcomingEventCard from "../Components/UpcomingEventCard";
import Loader from "../Components/Loader";

const back_link = "https://cp29bd07-3002.inc1.devtunnels.ms/";
function UpcomingScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([
    // {
    //     gameName: 'Basketball',
    //     id: 'Basketball',
    //     teamA: 'ECE-META',
    //     teamB: 'CSE',
    //     scoreA: '4',
    //     scoreB: '6'
    // },
    // {
    //     gameName: 'Cricket',
    //     id: 'Cricket',
    //     teamA: 'ECE-META',
    //     teamB: 'CSE',
    //     scoreA: '4',
    //     scoreB: '6'
    // },
    // {
    //     gameName: 'Football',
    //     id: 'Football',
    //     teamA: 'ECE-META',
    //     teamB: 'CSE',
    //     scoreA: '4',
    //     scoreB: '6'
    // },
    // {
    //     gameName: 'Tennis',
    //     id: 'Tennis',
    //     teamA: 'ECE-META',
    //     teamB: 'CSE',
    //     scoreA: '4',
    //     scoreB: '6'
    // },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          back_link + "api/event/getCurrentlyLiveEvents"
        );

        console.log(response.data);

        const data = response.data.events;
        const events = data.map((item) => {
          const eventName = item.eventId;
          const matches = item.subEvents;
          const match = matches.map((match_item) => {
            const matchId = match_item.subEventId;
            const matchData = match_item.data;
            const teamA = match_item.data.points
              ? match_item.data.points?.teamA
              : match_item.data.pointsTable?.teamA;
            const teamB = match_item.data.points
              ? match_item.data.points?.teamB
              : match_item.data.pointsTable?.teamB;
            return {
              details: match_item.data.details,
              status: match_item.data.status,
              gameName: eventName,
              id:
                match_item.data.details.title.split(" ").join("") +
                match_item.subEventId.split(" ").join(""),
              teamA: teamA?.name || match_item.subEventId.split(" vs ")[0],
              teamB: teamB?.name || match_item.subEventId.split(" vs ")[1],
              scoreA: teamA?.points,
              scoreB: teamB?.points,
            };
          });
          return match;
        });
        console.log(events.flat());
        setUpcomingEvents(events.flat());
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        Alert.alert("Error", "Something went wrong");
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.eventsContainer}>
      <FlatList
        key={1}
        data={upcomingEvents}
        renderItem={(itemData) => {
          return (
            <UpcomingEventCard
              gameName={itemData.item.gameName}
              id={itemData.item.id}
              teamA={itemData.item.teamA}
              teamB={itemData.item.teamB}
              scoreA={itemData.item.scoreA}
              scoreB={itemData.item.scoreB}
            />
          );
        }}
        keyExtractor={(item, index) => {
          return item.id + index;
        }}
        alwaysBounceVertical={false}
      />
      <View style={{ height: 80 }}>
        <Loader visible={isLoading} />
      </View>
    </View>
  );
}

export default UpcomingScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "60%",
  },
});
