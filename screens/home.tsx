import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Plant from "../components/Plant/Plant";
import { RootStackParamList } from "../App";
import { ScreenContainer } from "../styles/shared";
import HomeSettings from "../components/HomeSettings/HomeSettings";
import { IPlant } from "../interfaces/IPlant";
import { plantsAction } from "../store/actions";
import plantsApi from "../config/api/plants";
import { IUserDetails } from "../interfaces/IUserDetails";
import { State } from "../store/reducers";
import PlantsTutorial from "../components/PlantsTutorial/PlantsTutorial";
import { numberOfColumns } from "../components/Plant/Plant.styles";

type HomeProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: HomeProps): JSX.Element => {
  const [dataSource, setDataSource] = useState<IPlant[]>();
  const [allowScrolling, setAllowScrolling] = useState(true)
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { userDetails }: { userDetails: IUserDetails } = useSelector(
    (state: State) => state.user
  );

  const getUserPlants = async () => {
    try {
      const { data } = await plantsApi.get<{ plants: IPlant[] }>("plants", {
        headers: {
          Authorization: `Bearer ${userDetails.jwt}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error("error");
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const { plants } = await getUserPlants();
        dispatch(plantsAction.setUserPlants(plants));
        setDataSource(plants);
      } catch (error) {
        console.error(error);
        navigation.navigate("login");
      }
    })();
  }, [isFocused]);

  return (
    <ScreenContainer>
      {dataSource ? (
        <>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <Plant
              id={item.id}
              name={item.name}
              imgSrc={require("../assets/plants/default_plant.webp")}
              navigation={navigation}
              onStartScroll={() => setAllowScrolling(false)}
              onFinishScroll={() => setAllowScrolling(true)}
            />
          )}
          numColumns={numberOfColumns}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          scrollEnabled={allowScrolling}
        />
        {!dataSource.length ? <PlantsTutorial/> : null }
        </>
      ) : null}
      <HomeSettings navigation={navigation} />
    </ScreenContainer>
  );
};

export default HomeScreen;
