import { useState, useEffect } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import axios from "axios";
import Loader from "../../Components/Loader";
import { backend_link } from "../../utils/constants";
import AdminSportEventCard from "../../Components/AdminSportEventCard";

function UpdateSportScreen(props) {
  console.log(props);
  const [isEventUpdated, setIsEventUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/event/getAllLiveEvents"
        );
        console.log("hi");
        console.log(response.data.events[0]);
        const data = response.data.events;
        const newData = data.map((item) => {
          const gameName = item.eventId;
          const teams = item.subEvents;
          console.log("teams", item);
          const newSubEvents = teams.map((item1) => {
            console.log("item11", item1);
            const subEventId = item1.subEventId;
            const teamA = item1.data.points
              ? item1.data.points?.teamA
              : item1.data.pointsTable?.teamA;
            const teamB = item1.data.points
              ? item1.data.points?.teamB
              : item1.data.pointsTable?.teamB;

            return {
              subEventId: subEventId,
              details: item1.data.details,
              status: item1.data.status,
              gameName: gameName,
              id:
                item1.data.details.title.split(" ").join("") +
                "++" +
                item1.subEventId.split(" ").join(""),
              // teamA: item1.subEventId.split(" vs ")[0],
              // teamB: item1.subEventId.split(" vs ")[1],
              teamA: teamA?.name || item1.subEventId.split(" vs ")[0],
              teamB: teamB?.name || item1.subEventId.split(" vs ")[1],
              scoreA: teamA?.points,
              scoreB: teamB?.points,
            };
          });
          return newSubEvents;
        });
        //console.log("hi");
        console.log(newData.flat());
        setOngoingEvents(newData.flat());
      } catch (err) {
        console.log(err);
        Alert.alert("Error", "Something went wrong", [{ text: "Okay" }]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isEventUpdated]);

  return (
    <View style={styles.eventsContainer}>
      <View style={{ maxHeight: "90%" }}>
        <FlatList
          data={ongoingEvents}
          renderItem={(itemData, index) => {
            return (
              <AdminSportEventCard
                subEventId={itemData.item.subEventId}
                gameName={itemData.item.gameName}
                id={itemData.item.id}
                teamA={itemData.item.teamA}
                teamB={itemData.item.teamB}
                scoreA={itemData.item.scoreA}
                scoreB={itemData.item.scoreB}
                details={itemData.item.details}
                status={itemData.item.status}
                setIsEventUpdated={setIsEventUpdated}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id + index;
          }}
          alwaysBounceVertical={false}
        />
        <Loader
          visible={isLoading}
          top={50}
          bottom={0}
          setModalVisible={setIsLoading}
        />
      </View>
    </View>
  );
}

export default UpdateSportScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    backgroundColor: "black",
    flex: 5,
    maxHeight: "100%",
  },
});
