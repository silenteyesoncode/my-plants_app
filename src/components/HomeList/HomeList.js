import { useState, useEffect } from "react";
import {
    SafeAreaView,
    Image,
  View,
  FlatList,
  Text,
} from "react-native";
import styles from "../../styles";
const HomeList = (props) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const items = Array.apply(null, Array(11)).map((item, index) => {
      return {
        id: index,
        name: `kwiatek_${index}`,
      };
    });
    setDataSource(items);
  }, []);

  return (
    <SafeAreaView >
    <FlatList
      data={dataSource}
      style={{marginBottom: 60}}
      renderItem={({ item }) => (
        <View
          style={styles.listItemContainer}
        >
          <View style={styles.listItem}>
            <Image resizeMode='cover' style={styles.listItemImage} source={require('./flower.jpg')} />
            <Text style={{position: 'absolute'}}>
            {item.name}
             </Text>
          </View>
        </View>
      )}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
    />
    </SafeAreaView>
  );
};

export default HomeList;
